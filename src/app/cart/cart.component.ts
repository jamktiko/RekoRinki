import { Component, inject } from '@angular/core';
import { ProductStore } from '../productstore';
import { CartStore } from '../cartstore';
import { Product } from '../types';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  // komponentilla ei ole omaa tilaa, vaan tila on storessa
  readonly cstore = inject(CartStore);
  readonly pstore = inject(ProductStore);
  addToCart(p: Product) {
    this.cstore.addToCart(p);
    this.pstore.reduceAmount(p.id);
  }

  removeFromCart(p: Product) {
    this.cstore.removeFromCart(p);
    this.pstore.addAmount(p.id);
  }
}
