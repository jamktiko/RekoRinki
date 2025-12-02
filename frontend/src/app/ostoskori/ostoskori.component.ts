import { Component, inject } from '@angular/core';
import { ProductStore } from '../productstore';
import { CartStore } from '../cartstore';
import { AppNotification, IlmoitusTiedot, Product } from '../types';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OstoskoriService } from '../ostoskori.service';
import { FormControl } from '@angular/forms';

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
  readonly ostoskoriService = inject(OstoskoriService);
  public nservice = inject(NotificationService);
  public router = inject(Router); // LISÄTTY: Router injektointi

  notifications: IlmoitusTiedot[] = [];

  // pulledPickupOptions -muuttuja, joka päivittyy ilmoitusten latauksen yhteydessä, jotta template kutsuu datan kerran.
  pulledPickupOptions: { value: string; viewValue: string }[] = [];

  // Uusi tila: näytetäänkö tilausvahvistus
  showConfirmation = false;
  // Tila valitulle noutopaikalle (string, koska valinta on tekstiä)
  selectedPickup: string = '';

  // FormControlit jokaiselle tuotteelle
  maaraControl: { [uniqueId: string]: FormControl } = {};

  ngOnInit(): void {
    this.loadNotifications(); // Lataa ilmoitukset komponentissa
    // this.initFormControls();
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
      const notif = this.notifications.find((n) => n.ilmoitusID === id);
      if (notif) {
        pickups.push({
          value: `${notif.maakunta} - ${notif.julkaisupaiva}`,
          viewValue: `${notif.maakunta} - ${notif.julkaisupaiva}`,
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
  goToProductNotification(
    product: Product & { notificationID?: number }
  ): void {
    if (product.notificationID) {
      this.router.navigate(['/ilmoitus', product.notificationID]);
    } else {
      this.router.navigate(['/ilmoitukset']);
    }
  }

  // Vahvista tilaus ja tyhjennä ostoskori
  confirmOrder(): void {
    // 1. Näytä vahvistusikkuna
    this.showConfirmation = true;
    // 2. Tyhjennä ostoskori
    this.ostoskoriService.clearCart();
  }

  // LISÄTTY: Sulje tilausvahvistus
  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  // lataa ilmoituskia
  loadNotifications(): void {
    console.log('Loading notifications in cart component...');
    this.nservice.getNotifications().subscribe({
      next: (data) => {
        console.log('Notifications loaded in cart:', data);
        // this.notifications = data || [];
        this.notifications = Array.isArray(data) ? data : [];
        console.log('Notifications set to:', this.notifications);
        this.pulledPickupOptions = this.getPickupOptions();
        console.log(data);
      },
      error: (err) => {
        console.error('Virhe ilmoitusten haussa:', err);
        this.notifications = [];
      },
    });
  }

  updateCartQuantity(uniqueId: string, value: any): void {
    const amountNumber = Number(value);

    // Jos arvo ei ole validi
    if (isNaN(amountNumber) || amountNumber <= 0) return;

    // muunnetaan takaisin grammoiksi
    const grams = amountNumber * 500;
    this.ostoskoriService.updateItemAmount(uniqueId, grams);
  }

  // computePickupOptions metodi kerätä ja yhdistää noutotiedot (pickup options) korin tuotteista
  // saatujen ilmoitus-ID:iden perusteella
  // computePickupOptions(): { value: string; viewValue: string }[] {
  //   const notificationIds = [
  //     ...new Set(
  //       this.getCartProductsWithDetails()
  //         .map((p) => p.notificationID)
  //         .filter((id) => id)
  //     ),
  //   ];
  //   const pickups: { value: string; viewValue: string }[] = [];
  //   notificationIds.forEach((id) => {
  //     const notif = this.notifications.find((n) => n.id === id);
  //     if (notif && notif.pickupTimes) {
  //       notif.pickupTimes.forEach((time) => {
  //         pickups.push({
  //           value: `${notif.place}, ${time}`,
  //           viewValue: `${notif.place}, ${time}`,
  //         });
  //       });
  //     }
  //   });
  //   return pickups;
  // }

  // Metodi yhdistämään tuotteet ilmoitustiedoilla
  getCartProductsWithDetails() {
    console.log('Notifications in cart component:', this.notifications);
    console.log(
      'Notification IDs:',
      this.notifications.map((n) => n.ilmoitusID)
    );
    return this.ostoskoriService.getItems().map((p) => {
      // Parse producerID from uniqueId (e.g., "1_2" → producerID: 2)
      const producerID = parseInt(p.uniqueId.split('_')[1]);
      const notificationID = parseInt(p.uniqueId.split('_')[0]); // Oletetaan, että tämä on notificationID (jos ei, muuta tarvittaessa)

      console.log(
        'Processing product:',
        p.uniqueId,
        'notificationID:',
        notificationID,
        'producerID:',
        producerID
      );

      const notif = this.notifications.find(
        (n) => n.ilmoitusID === notificationID
      );
      console.log('Found notification:', notif);

      const producerName =
        notif?.tuottaja?.etunimi && notif?.tuottaja?.sukunimi
          ? `${notif.tuottaja.etunimi} ${notif.tuottaja.sukunimi}`
          : `Tuottaja ${producerID}`; // ← Fallback: Näytä ID, jos nimi ei löydy
      // const producerName =
      //   notif?.tuottaja?.etunimi + ' ' + notif?.tuottaja?.sukunimi;
      return {
        ...p,
        producerName: producerName,
        notificationID: notificationID,
        producerID: producerID,
        uniqueId: p.uniqueId,
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
