import { Component, inject } from '@angular/core';
import { Product } from '../types';
import { ActivatedRoute } from '@angular/router';
import { AppNotification } from '../types';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { ProductService } from '../product.service';
import { CartStore } from '../cartstore';
import { ProductStore } from '../productstore';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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

  notification!: AppNotification;
  relatedProducts: Product[] = [];

  // tuotteet ostoskorissa (laajennettu tieto)
  // cartProducts: (Product & {
  //   notificationID?: number;
  //   producerID?: number;
  //   producerName?: string;
  //   totalprice?: number;
  // })[] = [];

  notifications: AppNotification[] = [];

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
      this.loadProducts();
    }
  }

  loadNotification(id: number): void {
    this.notificationService.getNotificationById(id).subscribe({
      next: (data) => {
        this.notification = data;
        this.loadProducts(); // 💡 kutsutaan vasta kun notification on valmis
      },
      error: (err) => console.error('Virhe ilmoituksen haussa:', err),
    });
  }

  // loadProducts()-metodia suodattaa vain ne tuotteet, joiden ID on ilmoituksen producstID-listassa.
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        if (this.notification && this.notification.productsID) {
          this.relatedProducts = data.filter((product) =>
            this.notification.productsID.includes(product.id)
          );
        } else {
          this.relatedProducts = [];
        }
      },
      error: (err) => console.error('Virhe tuotteiden haussa:', err),
    });
  }

  // Palauttaa, montako kappaletta tästä tuotteesta on korissa
  getCartQuantity(productId: number): number {
    const productInCart = this.cstore
      .products()
      .find((p) => p.id === productId);
    if (productInCart) {
      // amount on grammoina, mutta 1 kpl = 500g, joten jaetaan ja pyöristetään ylöspäin
      return Math.ceil(productInCart.amount / 500);
    }
    return 0; // jos otoskorissa tyhenetään se määrä palauttaa 0.
  }

  // addToCart metodi ei ole käytössä nyt ehkä myöhemmin tarvitaan.
  addToCart(p: Product): void {
    console.log('Lisätty koriin:', p);
    this.cstore.addToCart(p);

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
  addOne(product: Product): void {
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
    if (this.getCartQuantity(product.id) === 0) {
      this.cstore.addToCart(product); // Lisää uusi tuote korin
    } else {
      this.cstore.increment(product.id); // Kasvata olemassa olevaa
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

  // removeOne(product: Product): void {
  //   // Tarkista korin määrä: Älä vähennä jos 0
  //   if (this.getCartQuantity(product.id) <= 0) {
  //     this.snackBar.open('Ei tuotetta korissa – ei voi vähentää!', '', {
  //       duration: 3000,
  //       horizontalPosition: 'start',
  //       verticalPosition: 'bottom',
  //       panelClass: ['error-snackbar'],
  //     });
  //     return;
  //   }
  //   // Vähennä korista ja lisää varastoon
  //   this.cstore.decrement(product.id);
  //   this.pstore.addAmount(product.id);
  // }

  // removeFromCart(product: Product): void {
  //   this.cstore.removeFromCart(product);
  //   // Voit lisätä varaston palautuksen täällä jos tarpeen, mutta nyt jätetään yksinkertaiseksi
  // }

  removeOne(product: Product): void {
    // Tarkista korin määrä: Älä vähennä jos 0
    const currentQuantity = this.getCartQuantity(product.id);
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
      this.cstore.decrement(product.id); // Vähennä määrää
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
