import { Component, inject } from '@angular/core';
import { ProductStore } from '../productstore';
import { CartStore } from '../cartstore';
import { AppNotification, Product } from '../types';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ostoskori',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './ostoskori.component.html',
  styleUrl: './ostoskori.component.css',
})
export class OstoskoriComponent {
  readonly cstore = inject(CartStore);
  readonly pstore = inject(ProductStore);
  public nservice = inject(NotificationService);
  public router = inject(Router); // LISÄTTY: Router injektointi

  notifications: AppNotification[] = [];

  // pulledPickupOptions -muuttuja, joka päivittyy ilmoitusten latauksen yhteydessä, jotta template kutsuu datan kerran.
  pulledPickupOptions: { value: string; viewValue: string }[] = [];

  // Uusi tila: näytetäänkö tilausvahvistus
  showConfirmation = false;
  // Tila valitulle noutopaikalle (string, koska valinta on tekstiä)
  selectedPickup: string = '';

  ngOnInit(): void {
    this.loadNotifications(); // Lataa ilmoitukset komponentissa
  }

  // hakee noutotiedot dynaamisesti korin tuotteista
  // noitificationID löytämme oikein ilmoitukset tiedot
  getPickupOptions(): { value: string; viewValue: string }[] {
    if (!this.notifications || this.notifications.length === 0) {
      return []; // Palauta tyhjä lista jos data ei ole vielä ladattu
    }
    // Kerää uniikit ilmoitus-ID:t korin tuotteista
    const notificationIds = [
      ...new Set(
        this.getCartProductsWithDetails()
          .map((p) => p.notificationID)
          .filter((id) => id)
      ),
    ];

    // Hae noutotiedot näistä ilmoituksista
    const pickups: { value: string; viewValue: string }[] = [];
    notificationIds.forEach((id) => {
      const notif = this.notifications.find((n) => n.id === id);
      if (notif && notif.pickupTimes) {
        notif.pickupTimes.forEach((time) => {
          // Tämä yhdistää tiedot ilmoitus-komponentista ilman että ne kopioitetaan
          pickups.push({
            value: `${notif.place}, ${time}`, // Esim. "K-Supermarket Muurame, Torstaina 22.9, klo 10-12"
            viewValue: `${notif.place}, ${time}`, // Näytettävä teksti
          });
        });
      }
    });
    return pickups;
  }
  // Lisää tämä: Metodi valinnan käsittelyyn (valinnainen, mutta hyvä laajennukseen)
  onPickupChange(value: string): void {
    this.selectedPickup = value;
    console.log('Valittu noutopaikka:', value); // Voit tallentaa tämän myöhemmin tilaukseen
  }

  // Siirry tuotteen ilmoitussivulle
  goToProductNotification(product: any): void {
    if (product.notificationID) {
      this.router.navigate(['/ilmoitus/id', product.producerID]);
    } else {
      this.router.navigate(['/notifications']);
    }
  }

  // Vahvista tilaus ja tyhjennä ostoskori
  confirmOrder(): void {
    // 1. Näytä vahvistusikkuna
    this.showConfirmation = true;
    // 2. Tyhjennä ostoskori
    this.cstore.clearCart();
  }

  // LISÄTTY: Sulje tilausvahvistus
  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  // lataa ilmoituskia
  loadNotifications(): void {
    this.nservice.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data || [];
        // Käytä getPickupOptions()  //vain kerran, esim. sijoittamalla sen tulos komponentin muuttujaan
        this.pulledPickupOptions = this.computePickupOptions();
      },
      error: (err) => console.error('Virhe ilmoitusten haussa:', err),
    });
  }

  // computePickupOptions metodi kerätä ja yhdistää noutotiedot (pickup options) korin tuotteista
  // saatujen ilmoitus-ID:iden perusteella
  computePickupOptions(): { value: string; viewValue: string }[] {
    const notificationIds = [
      ...new Set(
        this.getCartProductsWithDetails()
          .map((p) => p.notificationID)
          .filter((id) => id)
      ),
    ];
    const pickups: { value: string; viewValue: string }[] = [];
    notificationIds.forEach((id) => {
      const notif = this.notifications.find((n) => n.id === id);
      if (notif && notif.pickupTimes) {
        notif.pickupTimes.forEach((time) => {
          pickups.push({
            value: `${notif.place}, ${time}`,
            viewValue: `${notif.place}, ${time}`,
          });
        });
      }
    });
    return pickups;
  }

  // Metodi yhdistämään tuotteet ilmoitustiedoilla
  getCartProductsWithDetails() {
    return this.cstore.products().map((p) => {
      // Koska notificationID ja producerID ovat tuotteessa valmiina, käytetään suoraan
      const notif = this.notifications.find(
        (n) => n.producerID === p.producerID
      );
      return {
        ...p,
        producerName: notif?.producers, // Näkyviin nimi, esim. "Nisulan tila"
        notificationID: p.notificationID,
        producerID: p.producerID,
        uniqueId: p.uniqueId, // Lisätty uniikki tunniste
      };
    });
  }

  // laske sen hinta
  getProductTotal(product: any): number {
    return (product.amount / 500) * (product.price ?? 0);
  }

  // trackByProduct metodi kun kilkamaan yksi tuote kortti ostokorissa tunnistetaan id perusteella ja vain yhden tuoten voidaan
  // kilkaila
  trackByProduct(index: number, product: any): any {
    return product.uniqueId; // Käytä tuoteID ja tuottajaID tunnistamiseen
  }
}
