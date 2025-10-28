import { Component, inject } from '@angular/core';
import { Product } from '../types';
import { ActivatedRoute } from '@angular/router';
import { AppNotification } from '../types';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { ProductService } from '../product.service';
import { CartStore } from '../cartstore';
import { ProductStore } from '../productstore';

@Component({
  selector: 'app-ilmoitus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ilmoitus.component.html',
  styleUrl: './ilmoitus.component.css',
})
export class IlmoitusComponent {
  // notificationId!: number;
  // notification!: Notification | undefined;
  // products: Product[] = [];
  // relatedProducts: Product[] = [];

  // constructor(
  //   private route: ActivatedRoute,
  //   private dbService: InMemoryDataService
  // ) {}

  // ngOnInit(): void {
  //   // Haetaan id reitiltä
  //   this.notificationId = Number(this.route.snapshot.paramMap.get('id'));

  //   // Haetaan kaikki ilmoitukset ja tuotteet
  //   const db = this.dbService.createDb();
  //   this.products = db.products;
  //   this.notification = db.notifications.find(
  //     (n) => n.id === this.notificationId
  //   );

  //   // Suodatetaan vain kyseisen ilmoituksen tuotteet
  //   if (this.notification) {
  //     this.relatedProducts = this.products.filter((product) =>
  //       this.notification!.productsID.includes(product.id)
  //     );
  //   }
  // }

  // addToCart(product: any) {
  //   console.log('Lisätty koriin:', product);
  //   // Ostoskorin logiikka tähän
  // }

  // // isExpanded-event käytetään siellä tuotelisatalla kun painetaan lisää-linkki
  // toggleDescription(product: any, event: Event) {
  //   event.preventDefault();
  //   product.isExpanded = !product.isExpanded;
  // }

  readonly cstore = inject(CartStore);
  readonly pstore = inject(ProductStore);

  notification!: AppNotification;
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private productService: ProductService
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

  // isExpanded-event käytetään siellä tuotelisatalla kun painetaan lisää-linkki
  toggleDescription(product: Product, event: Event): void {
    event.preventDefault();
    product.isExpanded = !product.isExpanded;
  }

  addToCart(p: Product): void {
    console.log('Lisätty koriin:', p);
    this.cstore.addToCart(p);
    this.pstore.reduceAmount(p.id);
  }
}
