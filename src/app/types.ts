// Tuotteen tietotyyppi
export interface Product {
  id: number; // tuotteen tunnus
  name: string; // tuotteen nimi
  price: number; // tuotteen hinta
  amount: number; // tuotteen lukumäärä
  totalprice: number; // tuotteen hinta*lkm
  description?: string; // Tuotteen kuvaus
  image?: string; // Tuotteen kuva
  isExpanded?: boolean; // tämä lisää "Näytä lisää" -logiikan tuen
}

/* Ostoskorin ja tuotekokoelman tietotyypit on tehty tarkoituksella samanlaisiksi, jotta
   niiden käsittely storeissa olisi samanlaista. Ne ovat kuitenkin eri tietotyyppejä, ja
   niistä voidaan tarvittaessa myöhemmin tehdä erilaisia. Ostoskori ja Tuotekokoelma 
   sisältävät samat tiedot, mutta niiden tilat ovat erilaiset. Totalprice on olemassa
   lähinnä sen vuoksi, että price-avaimessa säilyisi yhden tuotteen hinta, jota voidaan
   tarvita tilaa käyttävissä komponenteissa. Kun se on valmiina, sitä ei tarvitse laskea.
*/

// Tuotekokoelman tietotyyppi
export interface Products {
  products: Product[];
}

// Ostoskorin tietotyyppi
export interface Cart {
  products: Product[];
}

export interface Notification {
  id: number;
  title: string;
  location: string;
  notificationsImage?: string;
  description?: string[];
  producers?: string;
  producersImge?: string;
  date?: string;
  productsID: number[];
  pickupTimes?: string[]; // ← LISÄTTY NOUTO-AJAT
  place?: string;
}
