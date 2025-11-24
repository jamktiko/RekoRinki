import { Component, inject } from '@angular/core';
import { Product } from '../types';
import { ActivatedRoute } from '@angular/router';
// import { AppNotification } from '../types';
import { CommonModule } from '@angular/common';
// import { NotificationService } from '../notification.service';
import { ProductService } from '../product.service';
import { CartStore } from '../cartstore';
import { ProductStore } from '../productstore';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService, AppNotification } from '../notification.service';

@Component({
  selector: 'app-ilmoitus',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './ilmoitus.component.html',
  styleUrl: './ilmoitus.component.css',
})
export class IlmoitusComponent {
  readonly cstore = inject(CartStore);
  readonly pstore = inject(ProductStore);

  // seriveissa oleva interface tyyppi
  NotificationService = inject(NotificationService);
  ilmoitukset: AppNotification[];
  loading = true;
  error: string | null = null;

  notification!: AppNotification | any;
  relatedProducts: Product[] | any = [];

  notifications: AppNotification[] | any = [];

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadNotification(id);
      // this.loadProducts();
      this.fetchIlmoitukset();
    }
  }

  // hae ilmoitusket data notification servicesta tiedosta
  fetchIlmoitukset(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.ilmoitukset = data;
        this.loading = false;
        console.log('Haetut ilmoitukset:', data);
      },
      error: (err) => {
        console.error('Virhe ilmoitusten hakemisessa:', err);
        this.error = 'Ilmoituksia ei voitu ladata.';
        this.loading = false;
      },
    });
  }

  loadNotification(id: number): void {
    this.notificationService.getNotificationById(id).subscribe({
      next: (data) => {
        console.log('BACKEND DATA:', data);
        this.notification = data;
        this.relatedProducts = Array.isArray(data.ilmoitus_has_Tuotteets)
          ? data.ilmoitus_has_Tuotteets.map((item: any) => ({
              kuva: item.kuva,
              nimi: item.tuotteet.nimi,
              description: item.tuotteet.kuvaus,
              price: item.tuotteet.yksikkohinta,
              amount: item.maara,
              uniqueId: item.uniqueId,
            }))
          : [];

        console.log('TARKISTA TAULUKKO:', data.ilmoitus_has_Tuotteets);
        console.log('MAPATUT TUOTTEET:', this.relatedProducts);
      },
      error: (err) => console.error('Virhe ilmoituksen haussa:', err),
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
    const productInCart = this.cstore
      .products()
      .find((p) => p.uniqueId === uniqueId);
    if (productInCart) {
      // amount on grammoina, mutta 1 kpl = 500g, joten jaetaan ja pyöristetään ylöspäin
      return Math.ceil(productInCart.amount / 500);
    }
    return 0; // jos otoskorissa tyhenetään se määrä palauttaa 0.
  }

  // addToCart metodi ei ole käytössä nyt ehkä myöhemmin tarvitaan.
  addToCart(p: Product): void {
    // Käytä komponentin 'notification' olion id:tä suoraan, koska käyttäjä on katsomassa tiettyä ilmoitusta
    const notificationID = this.notification?.id ?? null;
    const producerID = this.notification?.producerID ?? null;
    // Lisää ominaisuudet tuotteeseen
    const productWithNotification = {
      ...p,
      notificationID: notificationID,
      producerID: producerID,
      uniqueId: `${p.id}_${producerID}`, // uusi yhdistetty tunniste
    };
    console.log('Lisätty koriin:', p);

    // Lisää ostoskoriin tämä uusi objekti (tuote + ilmoitusID + producerID)
    this.cstore.addToCart(productWithNotification);

    // vähennetään tuotteen määrää varastossa
    this.pstore.reduceAmount(p.id);

    // Näytetään vahvistusilmoitus
    console.log('SnackBar avataan nyt');
    this.snackBar.open(`${p.name} lisätty ostoskoriin!`, '', {
      duration: 3000, // näkyy 3 sekuntia
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'], // voit muokata tyylillä
    });
  }

  //
  addOne(product: Product & { uniqueId: string }): void {
    // Tarkista varasto: Älä lisää jos tyhjä
    const stockProduct = this.pstore
      .products()
      .find((p) => p.id === product.id);
    if (!stockProduct || stockProduct.amount <= 0) {
      this.snackBar.open('Varasto tyhjä – ei voi lisätä!', '', {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar'],
      });
      return;
    }

    // Tarkista korin määrä: Jos 0, lisää uusi tuote; muuten kasvata
    if (this.getCartQuantity(product.uniqueId) === 0) {
      this.cstore.addToCart(product); // Lisää uusi tuote korin
    } else {
      this.cstore.increment(product.uniqueId); // Kasvata olemassa olevaa
    }

    // Vähennä varastoa
    this.pstore.reduceAmount(product.id);

    // Näytä onnistumisilmoitus
    this.snackBar.open(`${product.name} lisätty ostoskoriin!`, '', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
    });
  }

  removeOne(product: Product & { uniqueId: string }): void {
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
      this.cstore.decrement(product.uniqueId); // Vähennä määrää
    } else {
      this.cstore.removeFromCart(product); // Poista tuote kokonaan
    }

    // Lisää varastoon takaisin
    this.pstore.addAmount(product.id);

    // Näytä onnistumisilmoitus
    this.snackBar.open(`${product.name} vähennetty ostoskorista!`, '', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
    });
  }
}
