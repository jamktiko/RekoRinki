/* 
PRODUCTSTORE

NgRx Signalstore-kirjaston avulla luotu funktionaalinen store, joka 
säilyttää sovelluksen tuotteiden tilaa. Tuotteet haetaan valetietokannasta
storeen, kun sovellus käynnistyy.

Store on siis eräänlainen tiedon välivarasto, jonka ansiosta ei tarvitse jatkuvasti 
päivittää tietokantaa. Saman tiedon välittäminen useisiin komponentteihin on 
helpompaa, koska ei tarvitse siirtää tietoa komponenttien välillä. Tieto
kulkee aina pelkästään storesta komponentteihin tai komponenteista storeen.
*/

import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Products } from './types';
import { ProductService } from './product.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const initialState: Products = { products: [] };
/*
ProductStore on funktionaalinen store, eli funktio,
jonka argumentteina on funktioita ja olioita
*/
export const ProductStore = signalStore(
  { providedIn: 'root' },
  // storen alkutila, jonka päälle tulee heti uusi tila kannasta
  withState(initialState), 
  // storen elinkaarimetodit eli hookit
  withHooks({
    /* onInit-hookissa voidaan suorittaa tapahtumat jotka tapahtuvat
       kun store ladataan muistiin. */
    onInit(store, pservice = inject(ProductService)) {
      // haetaan tuotteet kannasta storeen reaktiivisesti
      pservice
        .getProducts()
        .pipe(
          takeUntilDestroyed(),
          // patchState päivittää storen tilaa
          tap((prods) => patchState(store, {products: prods}))
        )
        .subscribe();
    },
    /* onDestroy-hookissa voidaan suorittaa tapahtumat jotka tapahtuvat
       kun store poistuu muistista. Esim. tuotteiden tilan tallennus
       kantaan kun sovelluksen käyttö lopetetaan.
    */
    onDestroy(store) {
      // tuotteiden tilan tallennus kantaan voisi olla tässä
      console.log('ShopStore poistettu muistista', store);
    },
  }),
  /* Storen varsinaiset tietoa käsittelevät metodit ovat
     withMethods-funktiossa. withMethods-funktio sisältää anonyymin funktion, joka sisältää 
     storen tietoa käsittelevät metodit. products ja store tulevat argumentteina
     sisään. 
  */
  withMethods(({ products, ...store }) => ({  
    // Vähennetään ostoskoriin siirretyn tuotteen määrää productstoressa yhdellä
    reduceAmount(id:number) {
    // products() on signaalin kutsu, joka myös "avaa" signaalin
      const updated = products().map((p) =>
        p.id === id ? { ...p, amount: p.amount - 1 } : p
      );
      // päivitetään store
      patchState(store, { products: updated });
    },
    // Lisätään ostoskorista poistetun tuotteen määrää productstoressa yhdellä
    addAmount(id: number) {
      const updated = products().map((p) =>
        p.id === id ? { ...p, amount: p.amount + 1 } : p
      );
      patchState(store, { products: updated });
    },
  }))
);
