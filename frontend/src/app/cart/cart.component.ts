import { Component, inject } from '@angular/core';
import { ProductStore } from '../productstore';
import { CartStore } from '../cartstore';
import { Product } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  // komponentilla ei ole omaa tilaa, vaan tila on storessa
  readonly cstore = inject(CartStore);
  readonly pstore = inject(ProductStore);
  // Lisää ostoskoriin ja vähentää tuotteen määrää varastosta
  addToCart(p: Product) {
    this.cstore.addToCart(p);
    this.pstore.reduceAmount(p.id);
  }

  // Poistaa ostoskorista ja lisää tuotteen määrän takaisin varastoon
  removeFromCart(p: Product) {
    this.cstore.removeFromCart(p);
    this.pstore.addAmount(p.id);
  }

  // Increment ja decrement nappeihin, jos halutaan muokata määrää suoraan ostoskorissa
  increment(p: Product) {
    this.cstore.increment(p.id);
    this.pstore.reduceAmount(p.id);
  }

  decrement(p: Product) {
    this.cstore.decrement(p.id);
    this.pstore.addAmount(p.id);
  }
}
