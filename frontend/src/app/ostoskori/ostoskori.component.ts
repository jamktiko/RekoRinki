import { Component, inject } from '@angular/core';
import { ProductStore } from '../productstore';
import { CartStore } from '../cartstore';
import { AppNotification, Product } from '../types';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ostoskori',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ostoskori.component.html',
  styleUrl: './ostoskori.component.css',
})
export class OstoskoriComponent {
  private cstore = inject(CartStore);
  private pstore = inject(ProductStore);
  private nservice = inject(NotificationService);
  private router = inject(Router); // LISÄTTY: Router injektointi
  showConfirmationDialog = false; // LISÄTTY: Näytetäänkö vahvistusdialogi
  pendingProduct: Product | null = null; // LISÄTTY: Odottava tuote

  // tuotteet ostoskorissa (laajennettu tieto)
  cartProducts: (Product & {
    notificationID?: number;
    producerID?: number;
    producerName?: string;
    totalprice?: number;
  })[] = [];

  notifications: AppNotification[] = [];

  // Uusi tila: näytetäänkö tilausvahvistus
  showConfirmation = false;

  ngOnInit(): void {
    this.loadNotifications();
    this.updateCartFromStore();
  }

  // LISÄTTY: Siirry tuotteen ilmoitussivulle
  goToProductNotification(product: any): void {
    if (product.notificationID) {
      // Siirry ilmoitustuotteet komponenttiin ilmoituksen ID:llä
      this.router.navigate(['/ilmoitustuotteet/id', product.notificationID]);
    } else {
      console.warn('Tuotteella ei ole ilmoitusID:tä:', product);
      // Varmuuden vuoksi siirry notifications-sivulle
      this.router.navigate(['/notifications']);
    }
  }

  // LISÄTTY: Vahvista tilaus ja tyhjennä ostoskori
  confirmOrder(): void {
    // 1. Näytä vahvistusikkuna
    this.showConfirmation = true;

    // 2. Tyhjennä ostoskori
    this.clearCart();
  }

  // LISÄTTY: Tyhjennä ostoskori
  clearCart(): void {
    // Poista kaikki tuotteet ostoskorista
    this.cartProducts.forEach((product) => {
      this.removeFromCart(product);
    });

    // Päivitä näkymä
    this.updateCartFromStore();
  }

  // LISÄTTY: Sulje tilausvahvistus
  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  // LISÄTTY: Generoi tilausnumero
  generateOrderNumber(): string {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // ... muut metodit pysyvät samoina
  private loadNotifications(): void {
    this.nservice.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data || [];
        this.updateCartFromStore();
      },
      error: (err) => {
        console.error('Virhe ilmoitusten haussa:', err);
        this.updateCartFromStore();
      },
    });
  }

  updateCartFromStore(): void {
    const storeProducts: any[] =
      typeof (this.cstore as any).products === 'function'
        ? (this.cstore as any).products()
        : [];

    this.cartProducts = storeProducts.map((p: any) => {
      const amount = typeof p.amount === 'number' ? p.amount : 0;
      const totalprice = (amount / 500) * (p.price ?? 0);

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
      };
    });
  }

  addOne(product: Product): void {
    (this.cstore as any).increment(product.id);
    if (typeof (this.pstore as any).reduceAmount === 'function') {
      (this.pstore as any).reduceAmount(product.id);
    }
    this.updateCartFromStore();
  }

  removeOne(product: any): void {
    const currentAmount = product.amount ?? 0;
    if (currentAmount > 500) {
      (this.cstore as any).decrement(product.id);
      if (typeof (this.pstore as any).addAmount === 'function') {
        (this.pstore as any).addAmount(product.id);
      }
      this.updateCartFromStore();
    }
  }

  removeFromCart(product: any): void {
    if (typeof (this.cstore as any).removeItem === 'function') {
      (this.cstore as any).removeItem(product);
    }
    this.updateCartFromStore();
  }

  getProductTotal(product: any): number {
    return (product.amount / 500) * (product.price ?? 0);
  }

  getTotalPrice(): number {
    return this.cartProducts.reduce(
      (sum, p) => sum + this.getProductTotal(p),
      0
    );
  }

  getTotalItems(): number {
    return this.cartProducts.reduce((sum, p) => sum + p.amount / 500, 0);
  }

  trackById(_: number, item: any) {
    return item.id;
  }
}
