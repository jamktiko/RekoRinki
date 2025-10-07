/*
CARTSTORE

Ostoskori on laitettu omaan storeensa. Ostoskori on pelkästään 
muistissa, eikä sitä tallenneta pysyvästi mihinkään. Oikeassa 
kaupassa tallennus esim. localstoreen olisi suositeltavaa, siltä 
varalta, että käyttäjä onnistuisi hävittämään ostoskorin muistista 
kesken ostostapahtuman.

Cartstoren tietotyyppi on samanlainen kuin productstoren, mutta
storejen tilat ovat erilaiset. Koska tiedot ovat tyypiltään samat,
voi tietoja käsitellä samantapaisilla metodeilla molemmissa storeissa.
*/

import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Cart, Product } from './types';
import { computed } from '@angular/core';

// aluksi ostoskori on tyhjä
const initialState: Cart = {
  products: [],
};
/*
CartStore on funktionaalinen store, eli funktio,
jonka argumentteina on funktioita ja olioita
*/
export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  /*
  withComputed-funktio sisältää anonyymin funktion, joka sisältää computed-metodit, 
  eli metodit joilla voidaan tehdä esim. laskutoimituksia storen sisällöstä.
  */
  // Tee metodit
  // totalcount: lasketaan tuotteiden kokonaismäärä amount-avaimien arvoista
  // totalsum: lasketaan tuotteiden hintojen summa storessa totalprice-avaimien arvoista
  withComputed(({ products }) => ({
    totalCount: computed(() =>
      products().reduce((sum, p) => sum + p.amount, 0)
    ),
    totalsum: computed(() =>
      products().reduce((sum, p) => sum + p.price * p.amount, 0)
    ),
  })),
  /* withMethods-funktio sisältää anonyymin funktion, joka sisältää 
   storen varsinaiset tietoa käsittelevät metodit */
  // Tee metodit
  // addToCart
  // removeFromCart
  // removeItem
  // increment
  // decrement
  withMethods(({ products, ...store }) => ({
    addToCart(p: Product) {
      const exists = products().some((item) => item.id === p.id);
      if (!exists) {
        const updatedProduct = [...products(), p];
        patchState(store, { products: updatedProduct });
      }
      this.increment(p.id);
    },
    increment(id: number) {
      const updatedProduct = products().map((p) =>
        p.id === id ? { ...p, amount: p.amount + 1 } : p
      );
      patchState(store, { products: updatedProduct });
    },
    removeFromCart(p: Product) {
      this.decrement(p.id);
      this.removeItem(p);
    },
    removeItem(p: Product) {
      const updatedProduct = products().filter(
        (i) => i.id !== p.id || i.amount > 0
      );

      patchState(store, { products: updatedProduct });
    },

    decrement(id: number) {
      const updatedProduct = products().map((p) =>
        p.id === id ? { ...p, amount: p.amount - 1 } : p
      );
      patchState(store, { products: updatedProduct });
    },
  }))
);
