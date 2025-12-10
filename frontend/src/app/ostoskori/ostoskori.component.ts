import { Component, inject } from '@angular/core';
import { IlmoitusTiedot, Product, YhdenIlmoitusTiedot } from '../types';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OstoskoriService } from '../ostoskori.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ostoskori',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ostoskori.component.html',
  styleUrl: './ostoskori.component.css',
})
export class OstoskoriComponent {
  // otamme ostoskoriservice käyttön:
  readonly ostoskoriService = inject(OstoskoriService);

  // hakee ilmoitukset ja reitit
  public nservice = inject(NotificationService);

  // siirtyminen tuotesivulle
  public router = inject(Router);

  // haemme kaikki ilmoitukset backendistä
  notifications: IlmoitusTiedot[] = [];

  // haemme jokaisen ilmoituksen tarkat tiedot (sisältää reitit)
  YhdenIlmoitusTiedot: YhdenIlmoitusTiedot[] | any = [];

  // pulledPickupOptions -muuttuja, joka päivittyy ilmoitusten latauksen yhteydessä, jotta template kutsuu datan kerran.
  // reitit valintalistaa varten
  pulledPickupOptions: {
    value: string;
    viewValue: string;
  }[] = [];

  // Uusi tila: näytetäänkö tilausvahvistus
  showConfirmation = false;

  // Tila valitulle noutopaikalle (string, koska valinta on tekstiä)
  selectedPickup: string = '';

  // FormControlit jokaiselle tuotteelle
  maaraControl: { [uniqueId: string]: FormControl } = {};

  // muuttaja, joka tarkistetaan, onko noutotiedot valittu tai ei
  // Mat-select KUUNTELEE vain tätä controlia → tämä on avain.
  pickupControl = new FormControl<string | null>(null, Validators.required);

  ngOnInit(): void {
    this.loadNotifications(); // Lataa ilmoitukset komponentissa
    this.initFormControls(); // luodaan lomakekontrollit jokaiselle tuotteelle
  }

  // tämä funktio tekee siitä noututiedot palkollinen, kun painetaan tilaus vahvitus nappi suorittaa NoutoTiedotPakollinen()
  // Jos noututiedot ei ole valittu tulee virheilmoitus
  NoutoTiedotPakollinen() {
    console.log('Submit painettu, kontrolin arvo:', this.pickupControl.value);

    // tarkistaa onko kenttä virhellinen
    if (this.pickupControl.invalid) {
      // Merkitään kenttä "touchatuksi", jotta virheet tulevat näkyviin
      this.pickupControl.markAllAsTouched();
      // päivitetään kentän validointi
      this.pickupControl.updateValueAndValidity();
      return;
    }

    // Tallennetaan käyttäjän valitsema noutopaikka
    this.selectedPickup = this.pickupControl.value;
    console.log('Tilaus tehty');

    // Jatka tilausta: esimerkkinä vahvistus ja tyhjennä kori
    console.log('Tilaus lähetetty noutopaikalla:', this.selectedPickup);
    this.ostoskoriService.clearCart();
    this.showConfirmation = true;
  }

  // lataa ilmoituskia
  loadNotifications(): void {
    console.log('Loading notifications in cart component...');

    this.nservice.getNotifications().subscribe({
      next: (data) => {
        console.log('Notifications loaded in cart:', data);

        // Jos data on taulukko → talletetaan se.
        // Jos notifikaatioita ei ole → asetetaan tyhjä taulukko.
        this.notifications = Array.isArray(data) ? data : [];
        console.log('Notifications set to:', this.notifications);

        // Hae vain yhden ilmoitus tiedot ilmoitusID perusteella
        const ids = this.notifications.map((n) => n.ilmoitusID);

        // Tämä kertoo, montako täyttä ilmoitusta on jo ladattu.
        // Kun loaded === ids.length, tiedämme että kaikki on haettu.
        let loaded = 0;

        // Hae jokainen ilmoitus erikseen
        ids.forEach((id) => {
          this.nservice.getNotificationById(id).subscribe({
            next: (full) => {
              // Kun yksittäinen ilmoitus latautuu
              // Tallennetaan tiedot YhdenIlmoitusTiedot-listaan
              this.YhdenIlmoitusTiedot.push(full);
              console.log('Full notification loaded:', full);
              loaded++;

              // Kun kaikki ID:t on ladattu → nyt vasta luodaan pickupOptions
              if (loaded === ids.length) {
                this.pulledPickupOptions = this.getPickupOptions();
                console.log('Noutopaikat ladattu:', this.pulledPickupOptions);
              }
            },
            error: (err) =>
              console.error('Error loading full notification id', id, err),
          });

          console.log('kaikki notification', this.pulledPickupOptions);
          console.log('all notification', this.getPickupOptions());
          console.log('kaikki ilmoitukset', data);
        });
      },

      error: (err) => {
        console.error('Virhe ilmoitusten haussa:', err);
        this.notifications = [];
      },
    });
  }

  // hakee noutotiedot dynaamisesti korin tuotteista
  // noitificationID löytämme oikein ilmoitukset tiedot
  getPickupOptions(): { value: string; viewValue: string }[] {
    console.log('YhdenIlmoitusTiedot palauttaa', this.YhdenIlmoitusTiedot); // tämä palauttaa kaikki ilmoitukset

    // jos data ei ole vielä ladattu paluttaa tyhjä taulukko
    if (!this.YhdenIlmoitusTiedot || this.YhdenIlmoitusTiedot.length === 0) {
      console.log('Yhden Ilmoitus Tiedot: ', this.YhdenIlmoitusTiedot);
      return [];
    }

    // Jos ostoskorissa on tuotteita, kerää niiden ilmoitus-IDt
    const notificationIds = [
      ...new Set(
        this.getCartProductsWithDetails()
          .map((p) => p.notificationID)
          .filter((id) => id !== undefined && id !== null)
      ),
    ];
    console.log('notificationIds:', notificationIds); // tämäkin palauttaa ilmoitukset id

    // tässä muuttuijassa tallentaan palutettu reitit
    const pickups: { value: string; viewValue: string }[] = [];
    console.log('pickups palauttaa: ', pickups);

    // Hae noutotiedot näistä ilmoituksista IlmoitusID perusteella
    notificationIds.forEach((id) => {
      // notif muuttuija etsin ilmoituksia (ilmoitusID perusteella)
      const notif = this.YhdenIlmoitusTiedot.find((n) => n.ilmoitusID === id);

      console.log(
        'this.YhdenIlmoitusTiedot.map((n) => n.ilmoitusID) ',
        this.YhdenIlmoitusTiedot.map((n) => n.ilmoitusID)
      );
      console.log('Notif YhenIlmoitusTiedot: ', notif);
      console.log('YhdenIlmoitustieodt:', this.YhdenIlmoitusTiedot);

      // jos reitit löytyy paluttaa niitä pickups muuttujaksi
      if (notif?.reitits) {
        notif.reitits.forEach((r) => {
          const label = `${r.jakopaiva_aika} - ${r.lisatieto ?? ''}`.trim();
          pickups.push({ value: label, viewValue: label });
        });
      }
    });
    console.log('pickup:', pickups);
    return pickups;
  }

  // käyttäjä vaihtaa noutopaikka
  onPickupChange(value: string): void {
    console.log('Valittu noutopaikka:', value); // Voit tallentaa tämän myöhemmin tilaukseen
    this.selectedPickup = value;
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

  // LISÄTTY: Sulje tilausvahvistus
  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  // tämä funktio kasvata grammoina määrä kertamalla 500
  updateCartQuantity(uniqueId: string, value: any): void {
    const amountNumber = Number(value);

    // Jos arvo ei ole validi
    if (isNaN(amountNumber) || amountNumber <= 0) return;

    // muunnetaan takaisin grammoiksi
    const grams = amountNumber * 500;

    // päivittämme ostoskoriservicessa oleva määrä
    this.ostoskoriService.updateItemAmount(uniqueId, grams);
    console.log('grams', grams);
  }

  // Metodi yhdistämään tuotteet ilmoitustiedoilla
  getCartProductsWithDetails() {
    console.log('Notifications in cart component:', this.notifications); // tämä paluttaa kaikki ilmoitukset
    console.log(
      'Notification IDs:',
      this.notifications.map((n) => n.ilmoitusID) // tämä palauttaa kaikki ilmoituksenID
    );
    return this.ostoskoriService.getItems().map((p) => {
      // Purkaa tuotteen uniqueId;n (esim., "1_2" → tuottajaID: 2)
      const producerID = parseInt(p.uniqueId.split('_')[1]);
      const notificationID = parseInt(p.uniqueId.split('_')[0]); // Oletetaan, että tämä on notificationID (jos ei, muuta tarvittaessa)

      console.log(
        'Processing product:',
        p.uniqueId, // tämä palauttaa ilmoitusid ja tuottajaid
        'notificationID:',
        notificationID,
        'producerID:',
        producerID
      );

      // notif muuttuija Löytää oikean ilmoituksen notificationID:n perusteella.
      const notif = this.notifications.find(
        (n) => n.ilmoitusID === notificationID
      );
      console.log('Found notification:', notif); // tämä palauttaa kaikki ilmoituksen

      // paluttaa stringina tuottaja etu- ja sukunimet
      const producerName =
        notif?.tuottaja?.etunimi && notif?.tuottaja?.sukunimi
          ? `${notif.tuottaja.etunimi} ${notif.tuottaja.sukunimi}`
          : `Tuottaja ${producerID}`; // ← Fallback: Näytä ID, jos nimi ei löydy

      console.log('producerNmae:', producerName); // tämä palauttaa tuottaja etu- ja sukunimi

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

  // funktion tarkoitus on luoda dynaamisesti Angularin lomakekentät jokaiselle ostoskorin tuotteelle,
  // jotta käyttäjä voi muuttaa määrää (quantity).
  initFormControls(): void {
    this.getCartProductsWithDetails().forEach((product) => {
      // Luodaan uusi FormControl, jonka alkuarvo on tuotteen tämänhetkinen määrä ostoskorissa.
      const control = new FormControl(this.getCartQuantity(product.uniqueId));

      // Kuuntele muutoksia kentässä
      control.valueChanges.subscribe((value) => {
        // muunna arvo ihan numeroksi ja tarkista sama aikaa virheet
        const num = Number(value);
        if (!isNaN(num)) this.updateCartQuantity(product.uniqueId, num);
      });
      // Tallenna FormControl tuotteen ID:llä eli jokainen kenttä tallennetaan olioon maaraControl.
      this.maaraControl[product.uniqueId] = control;
    });
  }

  // täsäs funktiossa päivittää oikean määrä ostoskori palvelussa
  getCartQuantity(uniqueId: string): number {
    const item = this.ostoskoriService
      .getItems()
      .find((p) => p.uniqueId === uniqueId);
    return item ? Math.ceil(item.amount / 500) : 0;
  }

  // tämä funktio lisää yksi 500g paketti
  increment(uniqueId: string): void {
    const current = this.getCartQuantity(uniqueId);
    this.updateCartQuantity(uniqueId, current + 1);
  }

  // tämä funkito vähentää 500g paketin
  decrement(uniqueId: string): void {
    const current = this.getCartQuantity(uniqueId);
    if (current > 1) this.updateCartQuantity(uniqueId, current - 1);
  }
}
