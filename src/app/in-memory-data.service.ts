import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Product } from './types'; // tuotteen tyyppi
import { Notification } from './types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // products-taulukko on valetietokanta, jossa ovat tuotteet
    const products: Product[] = [
      {
        id: 1,
        name: 'Mansikka',
        price: 8,
        amount: 500,
        totalprice: 2000,
        description:
          'Tuoretta, täysmehuaista mansikkaa, joka on poimittu aamutuimaan. Tuoksuu kesältä, tiiviitä ja mehuaista.',
      },
      {
        id: 2,
        name: 'Vadelma',
        price: 6,
        amount: 500,
        totalprice: 2000,
        description: 'Täysikypsää, tummaa ja raikkaita marjoja.',
      },
      {
        id: 3,
        name: 'Pensasmustikkka',
        price: 10,
        amount: 500,
        totalprice: 5000,
        description:
          'Aitoa suomalaista pensasmustikkaa, täynnä antioksydantteja.',
      },
      {
        id: 4,
        name: 'Peruna',
        price: 3,
        amount: 500,
        totalprice: 1500,
        description: 'Tuoreita perunoita suoraan tilalta.',
      },
      {
        id: 5,
        name: 'Porkkana',
        price: 3,
        amount: 500,
        totalprice: 1200,
        description: 'Makeita ja rapeita porkkanoita.',
      },
    ];

    // notifications-taulukko ilmoituksille
    const notifications: Notification[] = [
      {
        id: 1,
        title: 'Muurame Jyväskylä',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-alejandro-barron-21404-96715.jpg',
        description: [
          'Tila on toiminut yli 30 vuotta ja olemme erikoistuneet laadukkaisiin mansikoihin, vadelmiin ja pensasmustikoihin.',
          'Tervetuloa nauttimaan kesän makeimmista hedelmistä! Marjamme kasvavat puhtaassa Keski-Suomen luonnossa ja saavat auringonvaloa riittämiin.',
          'Mansikat ovat nyt huippukunnossa, täysin kypsiä ja makeita. Vadelmat ja pensasmustikat tuovat pöytään kesän värejä ja makuja.',
          'Takaamme tuoreuden ja laadun jokaisessa marjassa!',
        ],
        producers: 'Nisulan tila',
        producersImge: '/pexels-jk04-2933243.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [1, 2, 3], // → Mansikka, Vadelma, Pensasmustikka
        pickupTimes: [
          'Torstaina 22.9, klo 10-12',
          'Perjantaina 23.9, klo 14-16',
          'Lauantaina 24.9, klo 9-11',
        ],
        place: 'K-Supermarket Muurame',
      },
      {
        id: 2,
        title: 'Seppälä Jyväskylä',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-suju-1228530.jpg',
        description: [
          'Perheviljelys jo kolmannessa polvessa.',
          'Käytämme vain luomumenetelmiä ja kunnioitamme luonnon kiertokulkua.',
          'Tuotteemme ovat aina tuoreita ja laadukkaita.',
        ],
        producers: 'Marjatila Tynrikka',
        producersImge: '/pexels-neslihan-ozdemir-590391077-17117954.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [2, 3, 4], // → Vadelma, Pensasmustikka, Peruna
        pickupTimes: [
          'Perjantaina 23.9, klo 12-14',
          'Lauantaina 24.9, klo 10-12',
        ],
        place: 'K-Citymarket Seppälä parkkipaikka',
      },
      {
        id: 3,
        title: 'Tori Jyväskylä',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-katlovessteve-678448.jpg',
        description: [
          'Pienviljelyä sydämessä Keski-Suomen.',
          'Tuotamme pientä mutta laadukasta sadetta koko perheen tarpeisiin.',
          'Tervetuloa tutustumaan tilallemme!',
        ],
        producers: 'Apilakosken tila',
        producersImge: '/pexels-trinitykubassek-288621.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [1, 4, 5], // → Mansikka, Peruna, Porkkana
        pickupTimes: [
          'Lauantaina 24.9, klo 8-10',
          'Sunnuntaina 25.9, klo 12-14',
        ],
        place: 'Jyväskylän kauppatori',
      },
      {
        id: 4,
        title: 'Laukka Jyväskylä',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-pixabay-59999.jpg',
        description: [
          'Perheviljelys jo kolmannessa polvessa.',
          'Käytämme vain luomumenetelmiä ja kunnioitamme luonnon kiertokulkua.',
          'Tuotteemme ovat aina tuoreita ja laadukkaita.',
        ],
        producers: 'Matias tila',
        producersImge: '/pexels-pixabay-221100.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [2, 3, 5], // → Vadelma, Pensasmustikka, Porkkana
        pickupTimes: [
          'Lauantaina 24.9, klo 8-10',
          'Sunnuntaina 25.9, klo 12-14',
        ],
        place: 'K-Supermarket Laukka parkkipaikka',
      },
      {
        id: 5,
        title: 'Tourula Jyväskylä',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-suzyhazelwood-1258264.jpg',
        description: [
          'Perheviljelys jo kolmannessa polvessa.',
          'Käytämme vain luomumenetelmiä ja kunnioitamme luonnon kiertokulkua.',
          'Tuotteemme ovat aina tuoreita ja laadukkaita.',
        ],
        producers: 'Pekan tila',
        producersImge: '/pexels-carolin-wenske-762365559-26646961.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [1, 5, 4], // → Mansikka, Porkkana, Peruna
        pickupTimes: [
          'Torstaina 22.9, klo 10-12',
          'Perjantaina 23.9, klo 14-16',
          'Lauantaina 24.9, klo 9-11',
        ],
        place: 'S-market Tourula parkkipaikka',
      },
      {
        id: 6,
        title: 'Huhtasuo Jyväskylä',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-pixabay-45908.jpg',
        description: [
          'Tila on toiminut yli 30 vuotta ja olemme erikoistuneet laadukkaisiin mansikoihin, vadelmiin ja pensasmustikoihin.',
          'Tervetuloa nauttimaan kesän makeimmista hedelmistä! Marjamme kasvavat puhtaassa Keski-Suomen luonnossa ja saavat auringonvaloa riittämiin.',
          'Mansikat ovat nyt huippukunnossa, täysin kypsiä ja makeita. Vadelmat ja pensasmustikat tuovat pöytään kesän värejä ja makuja.',
          'Takaamme tuoreuden ja laadun jokaisessa marjassa!',
        ],
        producers: 'Annan tila',
        producersImge: '/pexels-clement-proust-363898785-21906698.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [5, 3, 2], // → Porkkana, Pensasmustikka, Vadelma
        pickupTimes: [
          'Lauantaina 24.9, klo 8-10',
          'Sunnuntaina 25.9, klo 12-14',
        ],
        place: 'Huhtakeskus',
      },
    ];
    return { products, notifications };
  }

  // Jos luodaan uusi tuote, niin genId-metodi generoi uudelle tuotteelle id:n
  genId(products: Product[]): number {
    return products.length > 0
      ? Math.max(...products.map((prod) => prod.id)) + 1
      : 1;
  }
}
