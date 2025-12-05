import { Component, inject } from '@angular/core';
import {
  YhdenIlmoitusReitti,
  YhdenIlmoitusTiedot,
  YhdenIlmoitusTuotteet,
  IlmoitusTiedot,
  KaikkiIlmoitusTiedot,
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
  readonly ostoskoriservice = inject(OstoskoriService);

  // seriveissa oleva interface tyyppi
  // NotificationService = inject(NotificationService);
  // ilmoitukset: AppNotification[] = [];

  notification!: YhdenIlmoitusTiedot;
  relatedProducts: YhdenIlmoitusTuotteet[] = [];
  reitit: YhdenIlmoitusReitti[] = [];
  loading = true;
  error: string | null = null;
  // IlmoitusData!: IlmoitusTiedot;

  // tämä muuttuja avulla käyttäjä halua lisätä haluattun lukumäärä lisämään ostoskori
  tuoteMaaraControl: { [uniqueId: string]: FormControl } = {};

  // notifications: AppNotification[] | any = [];

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadNotification(id);
      // this.loadProducts();
      // this.fetchIlmoitukset();
    }

    // this.relatedProducts.forEach((product) => {
    //   this.tuoteMaaraControl[product.uniqueId] = new FormControl(0);
    // });
    // this.notification.ilmoitus_has_Tuotteets.forEach((product) => {
    //   this.tuoteMaaraControl[product.uniqueId] = new FormControl(
    //     this.getCartQuantity(product.uniqueId)
    //   );
    // });
  }

  // hae ilmoitusket data notification servicesta tiedosta
  // fetchIlmoitukset(): void {
  //   this.notificationService.getNotifications().subscribe({
  //     next: (data) => {
  //       this.ilmoitukset = data;
  //       this.loading = false;
  //       console.log('Haetut ilmoitukset:', data);
  //     },
  //     error: (err) => {
  //       console.error('Virhe ilmoitusten hakemisessa:', err);
  //       this.error = 'Ilmoituksia ei voitu ladata.';
  //       this.loading = false;
  //     },
  //   });
  // }

  loadNotification(id: number) {
    this.notificationService.getNotificationById(id).subscribe({
      next: (data: YhdenIlmoitusTiedot) => {
        this.notification = data;

        // Aseta tuotteet ensin
        this.relatedProducts = data.ilmoitus_has_Tuotteets || [];

        // Luo FormControlit kaikille tuotteille NYT kun relatedProducts on asetettu
        this.relatedProducts.forEach((product) => {
          // varmista, että arvo on numero
          const initial = Number(this.getCartQuantity(product.uniqueId)) || 0;
          const control = new FormControl(initial);

          // Kuuntele inputin muutosta — parsitaan aina numeroksi
          control.valueChanges.subscribe((rawValue) => {
            const value = Number(rawValue);
            // jos ei numero tai negatiivinen, normalisoi 0:ksi
            if (!isFinite(value) || value < 0) {
              control.setValue(0, { emitEvent: false });
              this.updateCartQuantity(product, 0);
              return;
            }
            // päivitä koriin (setQuantity hoitaa localStorage tallennuksen)
            this.updateCartQuantity(product, Math.floor(value));
          });

          this.tuoteMaaraControl[product.uniqueId] = control;
        });

        // reitit suoraan backendistä
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
    if (amount == null) return;
    amount = Number(amount);
    if (!isFinite(amount) || amount < 0) amount = 0;
    amount = Math.floor(amount); // varmista integer

    // suora asetus ostoskoriin
    this.ostoskoriservice.setQuantity(product, amount);
    // päivitämme kontrollin arvo ohjelmallisesti ilman eventin laukaisua (jos se tarvitaan)
    const ctrl = this.tuoteMaaraControl[product.uniqueId];
    if (ctrl && Number(ctrl.value) !== amount) {
      ctrl.setValue(amount, { emitEvent: false });
    }
    console.log('Kori päivitetty:', product.uniqueId, amount);
  }

  // loadProducts()-metodia suodattaa vain ne tuotteet, joiden ID on ilmoituksen producstID-listassa.
  // loadProducts(): void {
  //   this.productService.getProducts().subscribe({
  //     next: (data) => {
  //       if (this.notification && this.notification.productsID) {
  //         // Suodata tuotteet ilmoituksen productsID:n perusteella
  //         const filtered = data.filter((product) =>
  //           this.notification.productsID.includes(product.id)
  //         );
  //         // Luo uudet objektit oikealla producerID:llä ja uniqueId:llä
  //         this.relatedProducts = filtered.map((p) => ({
  //           ...p,
  //           producerID: this.notification.producerID, // Aseta oikea producerID
  //           uniqueId: `${p.id}_${this.notification.producerID}`, // Päivitä uniqueId
  //         }));
  //       } else {
  //         this.relatedProducts = [];
  //       }
  //     },
  //     error: (err) => console.error('Virhe tuotteiden haussa:', err),
  //   });
  // }

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

  // addToCart metodi ei ole käytössä nyt ehkä myöhemmin tarvitaan.
  // addToCart(p: Product): void {
  //   // Käytä komponentin 'notification' olion id:tä suoraan, koska käyttäjä on katsomassa tiettyä ilmoitusta
  //   const notificationID = this.notification?.id ?? null;
  //   const producerID = this.notification?.producerID ?? null;
  //   // Lisää ominaisuudet tuotteeseen
  //   const productWithNotification = {
  //     ...p,
  //     notificationID: notificationID,
  //     producerID: producerID,
  //     uniqueId: `${p.id}_${producerID}`, // uusi yhdistetty tunniste
  //   };
  //   console.log('Lisätty koriin:', p);

  //   // Lisää ostoskoriin tämä uusi objekti (tuote + ilmoitusID + producerID)
  //   this.cstore.addToCart(productWithNotification);

  //   // vähennetään tuotteen määrää varastossa
  //   this.pstore.reduceAmount(p.id);

  //   // Näytetään vahvistusilmoitus
  //   console.log('SnackBar avataan nyt');
  //   this.snackBar.open(`${p.name} lisätty ostoskoriin!`, '', {
  //     duration: 3000, // näkyy 3 sekuntia
  //     horizontalPosition: 'start',
  //     verticalPosition: 'bottom',
  //     panelClass: ['success-snackbar'], // voit muokata tyylillä
  //   });
  // }

  // addToCart(p: YhdenIlmoitusTiedot): void {
  //   const productWithNotification = {
  //     ...p,
  //     uniqueId: p.uniqueId,
  //   };
  //   this.cstore.addToCart(productWithNotification);

  //   this.snackBar.open(`${p.name} lisätty ostoskoriin!`, '', {
  //     duration: 3000,
  //     horizontalPosition: 'start',
  //     verticalPosition: 'bottom',
  //     panelClass: ['success-snackbar'],
  //   });
  // }
  //
  addOne(product: YhdenIlmoitusTuotteet): void {
    // Tarkista korin määrä: Jos 0, lisää uusi tuote; muuten kasvata
    // if (this.getCartQuantity(product.uniqueId) === 0) {
    //   this.ostoskoriservice.addToCart(product); // Lisää uusi tuote korin eli Käyttää palvelua (mapaa itse)
    // } else {
    //   this.ostoskoriservice.addToCart(product); // Kasvata olemassa olevaa ja Sama metodi hoitaa lisäyksen (palvelu tarkistaa olemassaolon)
    // }

    // // Päivitä FormControlin arvo
    // if (!this.tuoteMaaraControl[product.uniqueId]) {
    //   // Luo FormControl jos ei vielä ole
    //   this.tuoteMaaraControl[product.uniqueId] = new FormControl(1);
    // } else {
    //   // Kasvata arvoa yhdellä
    //   const current = this.tuoteMaaraControl[product.uniqueId].value || 0;
    //   this.tuoteMaaraControl[product.uniqueId].setValue(current + 1);
    // }

    const uniqueId = product.uniqueId;
    const ctrl = this.tuoteMaaraControl[uniqueId];
    const current =
      Number(ctrl?.value ?? this.getCartQuantity(uniqueId) ?? 0) || 0;
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

  removeOne(product: YhdenIlmoitusTuotteet & { uniqueId: string }): void {
    // Tarkista korin määrä: Älä vähennä jos 0
    const currentQuantity = this.getCartQuantity(product.uniqueId);
    if (currentQuantity <= 0) {
      this.snackBar.open('Ei tuotetta korissa – ei voi vähentää!', '', {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar'],
      });
      return;
    }

    // // Jos määrä > 1, vähennä; jos == 1, poista kokonaan
    // if (currentQuantity > 1) {
    //   this.ostoskoriservice.decrement(product.uniqueId); // Vähennä määrää
    // } else {
    //   this.ostoskoriservice.removeFromCart(product.uniqueId); // Poista tuote kokonaan
    // }

    // // Päivitä FormControl
    // if (this.tuoteMaaraControl[product.uniqueId]) {
    //   const control = this.tuoteMaaraControl[product.uniqueId];
    //   const newValue = Math.max((control.value || 0) - 1, 0);
    //   control.setValue(newValue);
    // }

    const uniqueId = product.uniqueId;
    const ctrl = this.tuoteMaaraControl[uniqueId];
    const current =
      Number(ctrl?.value ?? this.getCartQuantity(uniqueId) ?? 0) || 0;
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
