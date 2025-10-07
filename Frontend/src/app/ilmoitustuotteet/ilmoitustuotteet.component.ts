import { Component } from '@angular/core';
import { Product } from '../types';
import { ActivatedRoute } from '@angular/router';
import { InMemoryDataService } from '../in-memory-data.service';
import { Notification } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ilmoitustuotteet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ilmoitustuotteet.component.html',
  styleUrl: './ilmoitustuotteet.component.css',
})
export class IlmoitustuotteetComponent {
  notificationId!: number;
  notification!: Notification | undefined;
  products: Product[] = [];
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private dbService: InMemoryDataService
  ) {}

  ngOnInit(): void {
    // Haetaan id reitiltä
    this.notificationId = Number(this.route.snapshot.paramMap.get('id'));

    // Haetaan kaikki ilmoitukset ja tuotteet
    const db = this.dbService.createDb();
    this.products = db.products;
    this.notification = db.notifications.find(
      (n) => n.id === this.notificationId
    );

    // Suodatetaan vain kyseisen ilmoituksen tuotteet
    if (this.notification) {
      this.relatedProducts = this.products.filter((product) =>
        this.notification!.productsID.includes(product.id)
      );
    }
  }

  addToCart(product: any) {
    console.log('Lisätty koriin:', product);
    // Ostoskorin logiikka tähän
  }

  // isExpanded-event käytetään siellä tuotelisatalla kun painetaan lisää-linkki
  toggleDescription(product: any, event: Event) {
    event.preventDefault();
    product.isExpanded = !product.isExpanded;
  }
}
