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

@Component({
  selector: 'app-ilmoitus',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
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
        // koko ilmoitus sellaisenaan
        this.notification = data;

        // tuotteet suoraan backendistä
        this.relatedProducts = data.ilmoitus_has_Tuotteets;

        // reitit suoraan backendistä
        this.reitit = data.reitits;

        // debug
        console.log('Ilmoitus:', data);
      },
      error: (err) => {
        console.error('Virhe ilmoituksen haussa:', err);
        this.error = 'Ilmoitusta ei voitu ladata.';
        this.loading = false;
      },
    });
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
    // Tarkista varasto: Älä lisää jos tyhjä
    // const stockProduct = this.pstore
    //   .products()
    //   .find((p) => p.id === product.tuoteID);
    // if (!stockProduct || stockProduct.amount <= 0) {
    //   this.snackBar.open('Varasto tyhjä – ei voi lisätä!', '', {
    //     duration: 3000,
    //     horizontalPosition: 'start',
    //     verticalPosition: 'bottom',
    //     panelClass: ['error-snackbar'],
    //   });
    //   return;
    // }

    // Tarkista korin määrä: Jos 0, lisää uusi tuote; muuten kasvata
    if (this.getCartQuantity(product.uniqueId) === 0) {
      this.ostoskoriservice.addToCart(product); // Lisää uusi tuote korin eli Käyttää palvelua (mapaa itse)
    } else {
      this.ostoskoriservice.addToCart(product); // Kasvata olemassa olevaa ja Sama metodi hoitaa lisäyksen (palvelu tarkistaa olemassaolon)
    }

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

    // Jos määrä > 1, vähennä; jos == 1, poista kokonaan
    if (currentQuantity > 1) {
      this.ostoskoriservice.decrement(product.uniqueId); // Vähennä määrää
    } else {
      this.ostoskoriservice.removeFromCart(product.uniqueId); // Poista tuote kokonaan
    }

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
