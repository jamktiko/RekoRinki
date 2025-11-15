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

CartStore: pitää yllä ostoskorin sisältöä (products). 
Siihen lisätään tuotteita addToCart, poistetaan removeFromCart jne.


*/

import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Cart, Product } from './types';
import { computed, inject } from '@angular/core';
import { NotificationService } from './notification.service';

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

  withComputed(({ products }, nservice = inject(NotificationService)) => ({
    // Olemassa olevat
    totalCount: computed(() =>
      products().reduce((sum, p) => sum + Math.ceil(p.amount / 500), 0)
    ),
    totalsum: computed(() =>
      products().reduce((sum, p) => sum + (p.amount / 500) * p.price, 0)
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

  // withMethods(({ products, ...store }) => ({
  //   addToCart(p: Product) {
  //     const exists = products().some((item) => item.id === p.id);
  //     if (!exists) {
  //       const updatedProduct = [...products(), p];
  //       patchState(store, { products: updatedProduct });
  //     }
  //     this.increment(p.id);
  //   },
  //   increment(id: number) {
  //     const updatedProduct = products().map((p) =>
  //       p.id === id ? { ...p, amount: p.amount + 1 } : p
  //     );
  //     patchState(store, { products: updatedProduct });
  //   },
  //   removeFromCart(p: Product) {
  //     this.decrement(p.id);
  //     this.removeItem(p);
  //   },
  //   removeItem(p: Product) {
  //     const updatedProduct = products().filter(
  //       (i) => i.id !== p.id || i.amount > 0
  //     );

  //     patchState(store, { products: updatedProduct });
  //   },

  //   decrement(id: number) {
  //     const updatedProduct = products().map((p) =>
  //       p.id === id ? { ...p, amount: p.amount - 1 } : p
  //     );
  //     patchState(store, { products: updatedProduct });
  //   },
  // }))

  withMethods(({ products, ...store }) => ({
    addToCart(p: Product) {
      const existingProduct = products().find((item) => item.id === p.id);

      if (existingProduct) {
        // Tuote on jo korissa, lisätään määrää
        const updatedProduct = products().map((item) =>
          item.id === p.id
            ? {
                ...item,
                amount: item.amount + 500, // Lisää 500g (1 "paketti")
                totalprice: ((item.amount + 500) / 500) * item.price,
              }
            : item
        );
        patchState(store, { products: updatedProduct });
      } else {
        // Uusi tuote koriin - aloitetaan 500g:lla (1 "paketti")
        const newProduct = {
          ...p,
          amount: 500, // 500g = 1 "kpl"
          totalprice: p.price, // Hinta 1 paketista
        };
        const updatedProducts = [...products(), newProduct];
        patchState(store, { products: updatedProducts });
      }
    },

    increment(id: number) {
      const updatedProduct = products().map((p) =>
        p.id === id
          ? {
              ...p,
              amount: p.amount + 500, // Lisää 500g
              totalprice: ((p.amount + 500) / 500) * p.price,
            }
          : p
      );
      patchState(store, { products: updatedProduct });
    },

    decrement(id: number) {
      const updatedProduct = products().map((p) =>
        p.id === id && p.amount > 500 // Estä negatiivinen määrä
          ? {
              ...p,
              amount: p.amount - 500, // Vähennä 500g
              totalprice: ((p.amount - 500) / 500) * p.price,
            }
          : p
      );
      patchState(store, { products: updatedProduct });
    },

    removeFromCart(p: Product) {
      const updatedProduct = products().filter((item) => item.id !== p.id);
      patchState(store, { products: updatedProduct });
    },

    removeItem(p: Product) {
      this.removeFromCart(p);
    },

    clearCart() {
      patchState(store, { products: [] });
    },
  }))
);
