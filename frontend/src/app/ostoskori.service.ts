import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, YhdenIlmoitusTuotteet } from './types'; // ← Lisätty YhdenIlmoitusTuotteet

const LOCAL_KEY = 'ostoskori';

@Injectable({
  providedIn: 'root',
})
export class OstoskoriService {
  private _products = new BehaviorSubject<Product[]>([]);
  public products$ = this._products.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  /** Lataa localStoragesta (jos on) */
  private loadFromLocalStorage() {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      this._products.next(JSON.parse(saved));
    }
  }

  /** Tallentaa aina jokaisen muutoksen jälkeen */
  private saveToLocalStorage() {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this._products.value));
  }

  /** Mapaa backend-data Productiksi (integroitu mapTuote) */
  private mapTuote(raw: YhdenIlmoitusTuotteet): Product {
    return {
      id: parseInt(raw.uniqueId.split('_')[0]), // esim. "1_2" → 1
      producerID: parseInt(raw.uniqueId.split('_')[1]), // esim. "1_2" → 2
      uniqueId: raw.uniqueId,
      // ------ perus data ------
      name: raw.tuotteet.nimi,
      description: raw.tuotteet.kuvaus || '',
      price: parseFloat(raw.tuotteet.yksikkohinta),
      // ------ UI & logiikka ------
      amount: 0, // Ostoskori lisää oman määrän
      totalprice: 0,
      image: raw.kuva ?? undefined,
      inventory: raw.maara,
      unit: 'kpl', // backendissa ei ole muuta tietoa
    };
  }

  // Tämä päivittää jo ostoskorissa olevan määrän
  updateItemAmount(uniqueId: string, newAmount: number): void {
    const items = this.getItems();
    const item = items.find((p) => p.uniqueId === uniqueId);

    if (!item) return;

    item.amount = newAmount;
    localStorage.setItem('cart', JSON.stringify(items));
  }

  /** Aseta suoraan haluttu määrä (kpl) */
  setQuantity(rawProduct: YhdenIlmoitusTuotteet, count: number) {
    // Jos käyttäjä tyhjentää kentän / kirjoittaa negatiivisen → 0
    if (!count || count <= 0) {
      this.removeFromCart(rawProduct.uniqueId);
      return;
    }

    const current = this._products.value;
    const existing = current.find((p) => p.uniqueId === rawProduct.uniqueId);

    // Muunnetaan kpl → grammoiksi (teillä 1kpl = 500g)
    const amountInGrams = count * 500;

    // Jos tuotetta EI ole korissa → luodaan uusi
    if (!existing) {
      const mapped = this.mapTuote(rawProduct);

      const newItem: Product = {
        ...mapped,
        amount: amountInGrams,
        totalprice: count * mapped.price,
      };

      this._products.next([...current, newItem]);
      this.saveToLocalStorage();
      return;
    }

    // Jos tuote löytyy → päivitetään suoraan
    const updated = current.map((p) =>
      p.uniqueId === rawProduct.uniqueId
        ? {
            ...p,
            amount: amountInGrams,
            totalprice: count * p.price,
          }
        : p
    );

    this._products.next(updated);
    this.saveToLocalStorage();
  }

  /** Lisää tuotteen (ottaa nyt raakadatan ja mapaa) */
  addToCart(rawProduct: YhdenIlmoitusTuotteet) {
    // ← Muutettu parametri
    const p = this.mapTuote(rawProduct); // ← Mapataan ensin
    const current = this._products.value;

    const existing = current.find((x) => x.uniqueId === p.uniqueId);

    if (existing) {
      const updated = current.map((x) =>
        x.uniqueId === p.uniqueId
          ? {
              ...x,
              amount: x.amount + 500,
              totalprice: ((x.amount + 500) / 500) * x.price,
            }
          : x
      );

      this._products.next(updated);
    } else {
      const newItem: Product = {
        ...p,
        amount: 500,
        totalprice: p.price,
      };

      this._products.next([...current, newItem]);
    }

    this.saveToLocalStorage();
  }

  /** Kasvata tuotteen määrää 500:lla (uusi metodi) */
  increment(uniqueId: string) {
    const updated = this._products.value.map((p) =>
      p.uniqueId === uniqueId
        ? {
            ...p,
            amount: p.amount + 500,
            totalprice: ((p.amount + 500) / 500) * p.price,
          }
        : p
    );
    this._products.next(updated);
    this.saveToLocalStorage();
  }

  /** Vähennä 500g */
  decrement(uniqueId: string) {
    const updated = this._products.value.map((p) =>
      p.uniqueId === uniqueId && p.amount > 500
        ? {
            ...p,
            amount: p.amount - 500,
            totalprice: ((p.amount - 500) / 500) * p.price,
          }
        : p
    );
    this._products.next(updated);
    this.saveToLocalStorage();
  }

  /** Poista yksittäinen tuote kokonaan */
  removeFromCart(uniqueId: string) {
    const filtered = this._products.value.filter(
      (p) => p.uniqueId !== uniqueId
    );
    this._products.next(filtered);
    this.saveToLocalStorage();
  }

  /** Tyhjennä koko kori */
  clearCart() {
    this._products.next([]);
    localStorage.removeItem(LOCAL_KEY);
  }

  /** Kokonaistuotteiden määrä (paketteina) */
  getTotalCount(): number {
    return this._products.value.reduce((sum, p) => sum + p.amount / 500, 0);
  }

  /** Korin loppusumma */
  getTotalSum(): number {
    return this._products.value.reduce((sum, p) => sum + p.totalprice, 0);
  }

  /** Palauttaa nykyisen tilan */
  getItems(): Product[] {
    return this._products.value;
  }
}
