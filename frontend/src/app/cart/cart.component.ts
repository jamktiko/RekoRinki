import { Component, inject } from '@angular/core';
import { ProductStore } from '../productstore';
import { CartStore } from '../cartstore';
import { AppNotification, Product } from '../types';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  // komponentilla ei ole omaa tilaa, vaan tila on storessa
  // readonly cstore = inject(CartStore);
  // readonly pstore = inject(ProductStore);
  // readonly nservice = inject(NotificationService);

  // private notificationService = inject(NotificationService);

  // cartProducts: (Product & {
  //   producerID?: number;
  //   notificationID?: number;
  //   producerName?: string;
  //   notificationTitle?: string;
  // })[] = [];

  // notifications: AppNotification[] = [];

  // ngOnInit(): void {
  //   this.loadNotifications();
  // }

  // loadNotifications(): void {
  //   this.notificationService.getNotifications().subscribe({
  //     next: (data) => {
  //       this.notifications = data;
  //       this.enrichCartProducts();
  //     },
  //     error: (err) => console.error('Virhe ilmoitusten haussa:', err),
  //   });
  // }

  // enrichCartProducts(): void {
  //   // Lisätään tuotteille tuottaja- ja ilmoitustiedot
  //   this.cartProducts = this.cstore.products().map((product) => {
  //     // Etsitään ilmoitus, jossa tämä tuote on mukana
  //     const notification = this.notifications.find((notif) =>
  //       notif.productsID.includes(product.id)
  //     );

  //     return {
  //       ...product,
  //       producerID: notification?.producerID,
  //       notificationID: notification?.id,
  //       producerName: notification?.producers,
  //       notificationTitle: notification?.title,
  //     };
  //   });
  // }

  // ngOnInit() {
  //   this.nservice.getNotifications().subscribe((data) => {
  //     this.notifications = data;
  //   });
  // }

  // Hakee tuottajan nimen notification-taulukosta producerID:n avulla
  // getProducerName(producerID: number): string {
  //   const notif = this.notifications.find((n) => n.producerID === producerID);
  //   return notif ? notif.producers : 'Tuntematon tuottaja';
  // }

  // Hakee ilmoitusID:n sen perusteella, mihin ilmoitukseen tuote kuuluu
  // getNotificationIdByProductId(productId: number): number | null {
  //   const notif = this.notifications.find((n) =>
  //     n.productsID.includes(productId)
  //   );
  //   return notif ? notif.id : null;
  // }

  // Lisää ostoskoriin ja vähentää tuotteen määrää varastosta
  // addToCart(p: Product) {
  //   this.cstore.addToCart(p);
  //   this.pstore.reduceAmount(p.id);
  // }

  // Poistaa ostoskorista ja lisää tuotteen määrän takaisin varastoon
  // removeFromCart(p: Product) {
  //   this.cstore.removeFromCart(p);
  //   this.pstore.addAmount(p.id);
  // }

  // removeFromCart(product: Product): void {
  //   // Palautetaan koko määrä productstoreen
  //   const amountToRestore = product.amount / 100; // Muunnetaan kappaleiksi
  //   for (let i = 0; i < amountToRestore; i++) {
  //     this.pstore.addAmount(product.id);
  //   }
  //   this.cstore.removeItem(product);
  //   this.enrichCartProducts();
  // }

  // Increment ja decrement nappeihin, jos halutaan muokata määrää suoraan ostoskorissa
  // increment(product: Product): void {
  //   // Lisää 100g (0.1kg) kerrallaan
  //   const updatedProduct = { ...product, amount: product.amount + 100 };
  //   this.cstore.addToCart(updatedProduct);
  //   this.pstore.reduceAmount(product.id);
  //   this.enrichCartProducts();
  // }

  // decrement(product: Product): void {
  //   // Vähennä 100g (0.1kg) kerrallaan, minimi on 500g
  //   if (product.amount > 500) {
  //     const updatedProduct = { ...product, amount: product.amount - 100 };
  //     this.cstore.addToCart(updatedProduct);
  //     this.pstore.addAmount(product.id);
  //     this.enrichCartProducts();
  //   }
  // }

  // clearCart(): void {
  //   // Palautetaan kaikkien tuotteiden määrät productstoreen
  //   this.cstore.products().forEach((product) => {
  //     for (let i = 0; i < product.amount; i++) {
  //       this.pstore.addAmount(product.id);
  //     }
  //   });

  //   // Tyhjennetään ostoskori
  //   this.cstore.products().forEach((product) => {
  //     this.cstore.removeItem(product);
  //   });

  //   this.cartProducts = [];
  // }

  // getTotalPrice(): number {
  //   return this.cartProducts.reduce(
  //     (total, product) => total + (product.price * product.amount) / 500,
  //     0
  //   );
  // }

  // getTotalItems(): number {
  //   return this.cartProducts.reduce(
  //     (total, product) => total + product.amount,
  //     0
  //   );
  // }

  private cstore = inject(CartStore);
  private pstore = inject(ProductStore);
  private nservice = inject(NotificationService);

  // tuotteet ostoskorissa (laajennettu tieto)
  cartProducts: (Product & {
    notificationID?: number;
    producerID?: number;
    producerName?: string;
    totalprice?: number;
  })[] = [];

  notifications: AppNotification[] = [];

  ngOnInit(): void {
    this.loadNotifications();
    // myös alustetaan ostoskori näky (jos notificationit tulevat myöhemmin, updateCartFromStore kutsutaan subscriptionista)
    this.updateCartFromStore();
  }

  // hakee kaikki ilmoitukset ja päivittää korin tuotteet niihin liittyvillä tiedoilla
  private loadNotifications(): void {
    this.nservice.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data || [];
        this.updateCartFromStore();
      },
      error: (err) => {
        console.error('Virhe ilmoitusten haussa:', err);
        // Päivitä silti korin näkymä, jos notificationit eivät ole saatavilla
        this.updateCartFromStore();
      },
    });
  }

  // hakee tuotteet storesta, laskee totalprice ja liittää notification/producer-tiedot
  updateCartFromStore(): void {
    const storeProducts: any[] =
      typeof (this.cstore as any).products === 'function'
        ? (this.cstore as any).products()
        : [];

    this.cartProducts = storeProducts.map((p: any) => {
      const amount = typeof p.amount === 'number' ? p.amount : 0;
      // jos storessa on totalprice käytetään sitä, muuten lasketaan price * amount
      const totalprice =
        typeof p.totalprice === 'number'
          ? p.totalprice
          : (p.price ?? 0) * amount;

      // etsitään ilmoitus, johon tuotteen id kuuluu
      const notif = this.notifications.find(
        (n) => Array.isArray(n.productsID) && n.productsID.includes(p.id)
      );

      return {
        ...p,
        amount,
        totalprice,
        notificationID: notif?.id,
        producerID: notif?.producerID,
        producerName: notif?.producers,
      } as Product & {
        notificationID?: number;
        producerID?: number;
        producerName?: string;
        totalprice?: number;
      };
    });
  }

  // LISÄÄ YHDEN "PAKETIN" (500g)
  addOne(product: Product): void {
    (this.cstore as any).increment(product.id);
    if (typeof (this.pstore as any).reduceAmount === 'function') {
      (this.pstore as any).reduceAmount(product.id);
    }
    this.updateCartFromStore();
  }

  // VÄHENTÄÄ YHDEN "PAKETIN" (500g)
  removeOne(product: any): void {
    const currentAmount = product.amount ?? 0;
    if (currentAmount > 500) {
      (this.cstore as any).decrement(product.id); // KÄYTÄ DECREMENT METODIA
      if (typeof (this.pstore as any).addAmount === 'function') {
        (this.pstore as any).addAmount(product.id);
      }
      this.updateCartFromStore();
    }
  }

  // poistaa koko tuotteen korista
  removeFromCart(product: any): void {
    // yritetään kutsua yleisimpiä remove-metodeja (fallback turvallisesti)
    if (typeof (this.cstore as any).removeItem === 'function') {
      (this.cstore as any).removeItem(product);
    } else if (typeof (this.cstore as any).removeFromCart === 'function') {
      (this.cstore as any).removeFromCart(product.id);
    } else if (typeof (this.cstore as any).remove === 'function') {
      (this.cstore as any).remove(product.id);
    } else {
      // fallback: jos store ei tarjoa poistoa, suodata tuotteet ja (jos mahdollista) aseta store.products = ...
      console.warn(
        'CartStore: ei löydy remove-metodia (removeItem/removeFromCart/remove)'
      );
    }
    this.updateCartFromStore();
  }

  // tyhjennä ostoskori
  clearCart(): void {
    if (typeof (this.cstore as any).clearCart === 'function') {
      (this.cstore as any).clearCart();
    } else {
      // fallback: poista tuotteet yksi kerrallaan
      (this.cartProducts || []).forEach((p) => this.removeFromCart(p));
    }
    this.updateCartFromStore();
  }

  // tuotekohtainen hinta (jos store pitää totalprice, käytetään sitä)
  getProductTotal(product: any): number {
    return typeof product.totalprice === 'number'
      ? product.totalprice
      : (product.price ?? 0) * (product.amount ?? 0);
  }

  // laskettu kokonaishinta
  getTotalPrice(): number {
    return this.cartProducts.reduce(
      (sum, p) => sum + this.getProductTotal(p),
      0
    );
  }

  // kokonaistuotemäärä (lkm)
  getTotalItems(): number {
    return this.cartProducts.reduce((sum, p) => sum + (p.amount ?? 0), 0);
  }

  trackById(_: number, item: any) {
    return item.id;
  }
}
