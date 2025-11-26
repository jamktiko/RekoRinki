// Tuotteen tietotyyppi
export interface Product {
  id: number; // tuotteen tunnus
  name: string; // tuotteen nimi
  price: number; // tuotteen hinta
  amount: number; // tuotteen määrä gramma eli 500 g
  totalprice: number; // tuotteen hinta*lkm
  producerID?: number;
  uniqueId: string; // yhdistetty tunniste (tuoteID ja TuottajaID)
  // -------
  description?: string; // Tuotteen kuvaus
  image?: string; // Tuotteen kuva
  isExpanded?: boolean; // tämä lisää "Näytä lisää" -logiikan tuen
  unit?: string; // Yksikkö (esim. 'g')
  notificationID?: number; // ilmoitusID
  inventory?: number; //  varatossa oleva tuotteen määrä/kpl
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

export interface AppNotification {
  id: number;
  title: string;
  location: string;
  notificationsImage?: string;
  description?: string[];
  producers?: string;
  producerID: number;
  producersImge?: string;
  date?: string;
  productsID: number[];
  pickupTimes?: string[]; // ← LISÄTTY NOUTO-AJAT
  place?: string;
  AltText?: string;
  // nimi?: string;
}

//  Perustiedot jokaiselle ilmoitukselle
export interface KaikkiIlmoitusTiedot {
  kuva: string | null; // ilmoituksen pääkuva
  title: string; // ilmoituksen otsikko
  maakunta: string; // esim. "Etelä-Pohjanmaa"
  julkaisupaiva: string; // ISO string: "2025-01-21"
  voimassaolo_paattyy: string; // ISO string
}

// ilmoituksen sisältö oleva tieto ja tuottaja tiedot
export interface IlmoitusTiedot extends KaikkiIlmoitusTiedot {
  ilmoitusID: number;
  nimi: string; // ilmoituksen nimi
  kuvaus: string;
  tuottaja: {
    etunimi: string;
    sukunimi: string;
  };
}

//  yhedn ilmoituksen tuote tiedot
export interface YhdenIlmoitusTuotteet {
  // tuoteID: number;
  // nimi: string; // esim. "Peruna 5kg"
  // hinta: number; // €/kpl
  kuva: string | null;
  uniqueId: string;
  maara: number; // saatavilla oleva määrä

  tuotteet: {
    // ← NESTED-RAKENNE datan mukaisesti
    nimi: string; // esim. "Peruna 5kg"
    kuvaus: string;
    yksikkohinta: string; // esim. "1.50" (string datassa, ei number)
  };
}

// yhden ilmoituksen reitti tiedot
export interface YhdenIlmoitusReitti {
  reittiID: number;
  paikkakunta: string;
  katuosoite: string;
  postinumero: string;
  lisatieto?: string | null;
  jakopaiva_aika: string; // "2025-01-21"
  jakopaikka: string;
}

// yhden ilmoitus tiedot
export interface YhdenIlmoitusTiedot extends KaikkiIlmoitusTiedot {
  ilmoitusID: number;
  kuvaus: string;
  tuottaja: {
    etunimi: string;
    sukunimi: string;
    kuva: string | null; // tuottajan profiilikuva
  };

  // tuotteet jotka liittyvät ilmoitukseen
  ilmoitus_has_Tuotteets: YhdenIlmoitusTuotteet[];

  // ilmoituksen noutoreitit / toimituspaikat
  reitits: YhdenIlmoitusReitti[];
}
