import { Component, inject } from '@angular/core';
import {
  YhdenIlmoitusReitti,
  YhdenIlmoitusTiedot,
  YhdenIlmoitusTuotteet,
} from '../types';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../notification.service';
import { OstoskoriService } from '../ostoskori.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ilmoitus',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './ilmoitus.component.html',
  styleUrl: './ilmoitus.component.css',
})
export class IlmoitusComponent {
  // otamme käyttöön ostoskoriserivce
  readonly ostoskoriservice = inject(OstoskoriService);

  // muuttuija,joka sisältää kaikki ilmoitukset, jotka backend palauttaa
  notification!: YhdenIlmoitusTiedot;

  // muuttuija,joka sisältää yhden ilmoitus tiedot, jotka backend palauttaa
  relatedProducts: YhdenIlmoitusTuotteet[] = [];

  // muuttuija,joka sisältää yhden ilmoitu reitti, jotka backend palauttaa
  reitit: YhdenIlmoitusReitti[] = [];

  // jakopaikat ja ajat. jos on virhe heittää virhe ilmoitus
  loading = true;
  error: string | null = null;

  // tämä muuttuja avulla käyttäjä halua lisätä haluattun lukumäärä lisämään ostoskori
  // eli Jokaisella tuotteella on oma FormControl. avain: product.unique ja value on uusi formcontrol
  tuoteMaaraControl: { [uniqueId: string]: FormControl } = {};

  // Angualr komponentti constructor kohdassa tuoda kaikki palvelut käyttöön komponentien sisälle
  constructor(
    // pystyy lukemaan URLissa olevt parametia kuten ilmoitus/1
    private route: ActivatedRoute,

    // tämä suorittaa HTTP-kutsu backendille, eli pystyymme käyttää endpointia komponenttissa suoraan
    private notificationService: NotificationService,

    // otaan MatSnakBar kirjasto käyttöön, kun käyttäjä lisää tuote ostoskori tulee siitä pinei ilmoitus
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // hae ilmoituksen id reitista
    // Kun siirryt reitille /ilmoitus/1,2 jne, tämä hakee numeron 1 ja kutsuu loadNotification(1).
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadNotification(id);
    }
  }

  // funktio, joka haemme yhden ilmoitus tiedot notification servicesta API kutsuja getNotificationsById() funktion kautta ilmoitus komponenttin
  loadNotification(id: number) {
    this.notificationService.getNotificationById(id).subscribe({
      next: (data: YhdenIlmoitusTiedot) => {
        // Backendista tulevat data sisälttää:

        // tässä hae kaikki ilmoitusken tiedot
        this.notification = data;

        // hae tuotteita
        this.relatedProducts = data.ilmoitus_has_Tuotteets || [];

        // Luo FormControlit kaikille tuotteille nyt kun relatedProducts on asetettu
        this.relatedProducts.forEach((product) => {
          // varmista, että arvo on numero
          const initial = Number(this.getCartQuantity(product.uniqueId)) || 0;
          const control = new FormControl(initial);

          // Laitetaan input-kenttään alkuarvo ostoskorista
          // Kuuntele inputin muutosta — parsitaan aina numeroksi
          control.valueChanges.subscribe((rawValue) => {
            const value = Number(rawValue);
            // jos ei numero tai negatiivinen, normalisoi siitä 0:ksi
            if (!isFinite(value) || value < 0) {
              control.setValue(0, { emitEvent: false });
              // tallentaan siitä ostoskorissa
              this.updateCartQuantity(product, 0);
              return;
            }
            // päivitä koriin (setQuantity hoitaa localStorage tallennuksen)
            this.updateCartQuantity(product, Math.floor(value));
          });

          this.tuoteMaaraControl[product.uniqueId] = control;
        });

        // reitit taulukko suoraan backendistä tänne
        this.reitit = data.reitits || [];

        this.loading = false;
        console.log('IlmoitusData:', data);
        console.log('Reitit:', this.reitit);
        console.log('data.Reitit:', data.reitits);
        console.log('tässä on IlmoitusData', this.notification);
      },
      error: (err) => {
        console.error('Virhe ilmoituksen haussa:', err);
        this.error = 'Ilmoitusta ei voitu ladata.';
        this.loading = false;
      },
    });
  }

  // funktiolla normalisoidaan syöte (esim. negatiiviset arvot → 0) ja käsitellään ostoskori.
  updateCartQuantity(product: YhdenIlmoitusTuotteet, amount: number) {
    // kun käyttäjä tyhjentää input-kenttä funktio palauttaa null ja sitten ei tekee mitään päivityksiä.
    if (amount == null) return;

    // Jos inputissa laitetaan teksinta muttaa siitä NaN
    amount = Number(amount);

    // varmistetaan, että arvo on järkevä esim. jos arvo on negatiivinen muutetaan sen nollaksi
    if (!isFinite(amount) || amount < 0) amount = 0;

    // varmistetaan, että arvo on kokonaisluku
    amount = Math.floor(amount);

    // Kutsutaan ostoskoripalvelua ja tämä asettaa uuden määrän tälle tuotteelle. Jos määrä on 0 → tuote poistuu korista
    this.ostoskoriservice.setQuantity(product, amount);

    // Synkronoidaan määrä input-kentän kanssa
    const ctrl = this.tuoteMaaraControl[product.uniqueId];
    if (ctrl && Number(ctrl.value) !== amount) {
      // käytetään emitEvent: false Jottei input-kentän päivittäminen aiheuta loputonta silmukkaa
      // (koska onInput → päivitys → uusi onInput jne.)
      ctrl.setValue(amount, { emitEvent: false });
    }
    console.log('Kori päivitetty:', product.uniqueId, amount);
  }

  // Palauttaa, montako kappaletta tästä tuotteesta on korissa
  getCartQuantity(uniqueId: string): number {
    const productInCart = this.ostoskoriservice
      .getItems()
      .find((p) => p.uniqueId === uniqueId);
    if (productInCart) {
      // amount on grammoina, mutta 1 kpl = 500g, joten jaetaan ja pyöristetään ylöspäin
      return Math.ceil(productInCart.amount / 500);
    }
    return 0; // jos otoskorissa tyhenetään se määrä palauttaa 0.
  }

  // funktio toimii, kun lisätään yhden tuote ostoskori
  addOne(product: YhdenIlmoitusTuotteet): void {
    const uniqueId = product.uniqueId;

    // ctrl viittaa siihen <input>-kenttään, jossa näkyy tuotteen määrä
    const ctrl = this.tuoteMaaraControl[uniqueId];

    // current muuttuijalle haetaan tuotteen tämänhetkinen määrä
    // ctrl?.value → jos input-kentässä on arvo, käytetään sitä
    // Jos input ei ole olemassa (esim. renderöityy myöhemmin), käytetään:
    // this.getCartQuantity(uniqueId) → määrä ostoskorissa
    // Jos sekään ei ole olemassa, käytetään 0
    const current =
      Number(ctrl?.value ?? this.getCartQuantity(uniqueId) ?? 0) || 0;

    // lasketaan uusi määrä
    const newValue = current + 1;

    // Aseta ostoskoriin
    this.ostoskoriservice.setQuantity(product, newValue);

    // Päivitä input ilman että valueChanges-subscriber laukeaa
    if (ctrl) ctrl.setValue(newValue, { emitEvent: false });

    // Näytä onnistumisilmoitus
    this.snackBar.open(`${product.tuotteet.nimi} lisätty ostoskoriin!`, '', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
    });
  }

  // funktio toimii, kun vähennetään yhden tuote ostoskorissa
  removeOne(product: YhdenIlmoitusTuotteet & { uniqueId: string }): void {
    // Tarkista korin määrä: Älä vähennä jos 0
    const currentQuantity = this.getCartQuantity(product.uniqueId);

    // Jos määrä on 0 --> ei voi vähentää siitä
    if (currentQuantity <= 0) {
      this.snackBar.open('Ei tuotetta korissa – ei voi vähentää!', '', {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar'],
      });
      return;
    }

    // Haetaan uniqueId, input-kenttä ja nykyinen määrä
    const uniqueId = product.uniqueId;
    const ctrl = this.tuoteMaaraControl[uniqueId];
    const current =
      Number(ctrl?.value ?? this.getCartQuantity(uniqueId) ?? 0) || 0;

    // Lasketaan uusi arvo ja Math.max estää että arvo menee negatiiviseksi
    const newValue = Math.max(current - 1, 0);

    // Aseta ostoskoriin / poista jos 0
    this.ostoskoriservice.setQuantity(product, newValue);

    // Päivitä input ilman eventtia
    if (ctrl) ctrl.setValue(newValue, { emitEvent: false });

    // Näytä onnistumisilmoitus
    this.snackBar.open(
      `${product.tuotteet.nimi} vähennetty ostoskorista!`,
      '',
      {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      }
    );
  }
}
