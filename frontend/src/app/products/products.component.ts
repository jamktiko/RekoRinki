import { Component, inject } from '@angular/core';
import { ProductStore } from '../productstore';
import { CartStore } from '../cartstore';
import { Product } from '../types';
import { RouterLink } from '@angular/router';
import { ProducersComponent } from '../producers/producers.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, ProducersComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  // injektoidaan eli liitetään storet komponenttiin
  // komponentilla ei ole omaa tilaa, vaan tila on storessa
  readonly pstore = inject(ProductStore);
  readonly cstore = inject(CartStore);

  constructor() {}

  addToCart(p: Product) {
    // vähennetään tuotteen määrää varastossa
    this.pstore.reduceAmount(p.id);
    // uusi tuote ostoskoriin. Määrä alustetaan nollaksi, joka lisääntyy
    // aina yhdellä kun uusi tuote saapuu koriin
    const prod = {
      id: p.id,
      name: p.name,
      price: p.price,
      amount: 0,
      totalprice: p.price,
    };
    // ostoskorin tila päivittyy cartstoreen
    this.cstore.addToCart(prod);
  }
}
