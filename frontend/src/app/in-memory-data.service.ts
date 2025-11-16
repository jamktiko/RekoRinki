import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Product } from './types'; // tuotteen tyyppi
import { AppNotification } from './types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // products-taulukko on valetietokanta, jossa ovat tuotteet
    const products: Product[] = [
      // Nisulan tila (producerID: 1)
      {
        id: 1,
        notificationID: 1,
        producerID: 1,
        name: 'Mansikka',
        price: 8,
        amount: 500,
        inventory: 100,
        totalprice: 2000,
        description:
          'Tuoretta, täysmehuaista mansikkaa, joka on poimittu aamutuimaan. Tuoksuu kesältä, tiiviitä ja mehuaista.',
        unit: 'g',
        uniqueId: `${1}_${1}`,
      },
      {
        id: 2,
        notificationID: 1,
        producerID: 1,
        name: 'Vadelma',
        price: 6,
        amount: 500,
        inventory: 100,
        totalprice: 2000,
        description: 'Täysikypsää, tummaa ja raikkaita marjoja.',
        unit: 'g',
        uniqueId: `${2}_${1}`,
      },
      {
        id: 3,
        notificationID: 1,
        producerID: 1,
        name: 'Pensasmustikkka',
        price: 10,
        amount: 500,
        inventory: 100,
        totalprice: 5000,
        description:
          'Aitoa suomalaista pensasmustikkaa, täynnä antioksydantteja.',
        unit: 'g',
        uniqueId: `${3}_${1}`,
      },
      // Apilakosken tila (producerID: 3)
      {
        id: 4,
        notificationID: 3,
        producerID: 3,
        name: 'Mansikka',
        price: 8,
        amount: 500,
        inventory: 100,
        totalprice: 1500,
        description: 'Tuoreita perunoita suoraan tilalta.',
        unit: 'g',
        uniqueId: `${4}_${3}`,
      },
      {
        id: 5,
        notificationID: 3,
        producerID: 3,
        name: 'Peruna',
        price: 3,
        amount: 500,
        inventory: 100,
        totalprice: 1200,
        description: 'Makeita ja rapeita porkkanoita.',
        unit: 'g',
        uniqueId: `${5}_${3}`,
      },
      {
        id: 6,
        notificationID: 3,
        producerID: 3,
        name: 'Porkkana',
        price: 3,
        amount: 500,
        inventory: 100,
        totalprice: 1200,
        description: 'Makeita ja rapeita porkkanoita.',
        unit: 'g',
        uniqueId: `${6}_${3}`,
      },
      // Pekan tila (producerID: 5)
      {
        id: 7,
        notificationID: 5,
        producerID: 5,
        name: 'Mansikka',
        price: 8,
        amount: 500,
        inventory: 100,
        totalprice: 1200,
        description: 'Makeita ja rapeita porkkanoita.',
        unit: 'g',
        uniqueId: `${7}_${5}`,
      },
      {
        id: 8,
        notificationID: 5,
        producerID: 5,
        name: 'Porkkana',
        price: 3,
        amount: 500,
        inventory: 100,
        totalprice: 1200,
        description: 'Makeita ja rapeita porkkanoita.',
        unit: 'g',
        uniqueId: `${8}_${5}`,
      },
      {
        id: 9,
        notificationID: 5,
        producerID: 5,
        name: 'Peruna',
        price: 3,
        amount: 500,
        inventory: 100,
        totalprice: 1200,
        description: 'Makeita ja rapeita porkkanoita.',
        unit: 'g',
        uniqueId: `${9}_${5}`,
      },
      // Marjatila Tynrikka (producerID: 2, ilmoitus id:2)
      {
        id: 10,
        notificationID: 2,
        producerID: 2,
        name: 'Vadelma',
        price: 6,
        amount: 500,
        inventory: 100,
        totalprice: 2000,
        description:
          'Täysikypsää, tummaa ja raikkaita marjoja Marjatila Tynrikalta.',
        unit: 'g',
        uniqueId: `${10}_${2}`,
      },
      {
        id: 11,
        notificationID: 2,
        producerID: 2,
        name: 'Pensasmustikka',
        price: 10,
        amount: 500,
        inventory: 100,
        totalprice: 5000,
        description:
          'Aitoa suomalaista pensasmustikkaa, täynnä antioksydantteja.',
        unit: 'g',
        uniqueId: `${11}_${2}`,
      },
      {
        id: 12,
        notificationID: 2,
        producerID: 2,
        name: 'Peruna',
        price: 3,
        amount: 500,
        inventory: 100,
        totalprice: 1500,
        description: 'Tuoreita perunoita suoraan tilalta.',
        unit: 'g',
        uniqueId: `${12}_${2}`,
      },
      // Matias tila (producerID: 4, ilmoitus id:4)
      {
        id: 13,
        notificationID: 4,
        producerID: 4,
        name: 'Vadelma',
        price: 6,
        amount: 500,
        inventory: 100,
        totalprice: 2000,
        description: 'Täysikypsää, tummaa ja raikkaita marjoja Matias tilalta.',
        unit: 'g',
        uniqueId: `${13}_${4}`,
      },
      {
        id: 14,
        notificationID: 4,
        producerID: 4,
        name: 'Pensasmustikka',
        price: 10,
        amount: 500,
        inventory: 100,
        totalprice: 5000,
        description:
          'Aitoa suomalaista pensasmustikkaa, täynnä antioksydantteja.',
        unit: 'g',
        uniqueId: `${14}_${4}`,
      },
      {
        id: 15,
        notificationID: 4,
        producerID: 4,
        name: 'Porkkana',
        price: 3,
        amount: 500,
        inventory: 100,
        totalprice: 1200,
        description: 'Makeita ja rapeita porkkanoita.',
        unit: 'g',
        uniqueId: `${15}_${4}`,
      },
      // Annan tila (producerID: 6, ilmoitus id:6)
      {
        id: 16,
        notificationID: 6,
        producerID: 6,
        name: 'Porkkana',
        price: 3,
        amount: 500,
        inventory: 100,
        totalprice: 1200,
        description: 'Makeita ja rapeita porkkanoita Annan tilalta.',
        unit: 'g',
        uniqueId: `${16}_${6}`,
      },
      {
        id: 17,
        notificationID: 6,
        producerID: 6,
        name: 'Pensasmustikka',
        price: 10,
        amount: 500,
        inventory: 100,
        totalprice: 5000,
        description:
          'Aitoa suomalaista pensasmustikkaa, täynnä antioksydantteja.',
        unit: 'g',
        uniqueId: `${17}_${6}`,
      },
      {
        id: 18,
        notificationID: 6,
        producerID: 6,
        name: 'Vadelma',
        price: 6,
        amount: 500,
        inventory: 100,
        totalprice: 2000,
        description: 'Täysikypsää, tummaa ja raikkaita marjoja Annan tilalta.',
        unit: 'g',
        uniqueId: `${18}_${6}`,
      },
    ];

    // notifications-taulukko ilmoituksille
    const notifications: AppNotification[] = [
      {
        id: 1,
        title: 'Muurame Jyväskylä',
        AltText: 'maissipelto',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-alejandro-barron-21404-96715.jpg',
        description: [
          'Tila on toiminut yli 30 vuotta ja olemme erikoistuneet laadukkaisiin mansikoihin, vadelmiin ja pensasmustikoihin.',
          'Tervetuloa nauttimaan kesän makeimmista hedelmistä! Marjamme kasvavat puhtaassa Keski-Suomen luonnossa ja saavat auringonvaloa riittämiin.',
          'Mansikat ovat nyt huippukunnossa, täysin kypsiä ja makeita. Vadelmat ja pensasmustikat tuovat pöytään kesän värejä ja makuja.',
          'Takaamme tuoreuden ja laadun jokaisessa marjassa!',
        ],
        producerID: 1,
        producers: 'Nisulan tila', // kannassa oleva sarake nimi
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
        AltText: 'marjat',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-suju-1228530.jpg',
        description: [
          'Perheviljelys jo kolmannessa polvessa.',
          'Käytämme vain luomumenetelmiä ja kunnioitamme luonnon kiertokulkua.',
          'Tuotteemme ovat aina tuoreita ja laadukkaita.',
        ],
        producerID: 2,
        producers: 'Marjatila Tynrikka',
        producersImge: '/pexels-neslihan-ozdemir-590391077-17117954.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [10, 11, 12], // → Vadelma, Pensasmustikka, Peruna
        pickupTimes: [
          'Perjantaina 23.9, klo 12-14',
          'Lauantaina 24.9, klo 10-12',
        ],
        place: 'K-Citymarket Seppälä parkkipaikka',
      },
      {
        id: 3,
        title: 'Tori Jyväskylä',
        AltText: 'lammas',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-katlovessteve-678448.jpg',
        description: [
          'Pienviljelyä sydämessä Keski-Suomen.',
          'Tuotamme pientä mutta laadukasta sadetta koko perheen tarpeisiin.',
          'Tervetuloa tutustumaan tilallemme!',
        ],
        producerID: 3,
        producers: 'Apilakosken tila',
        producersImge: '/pexels-trinitykubassek-288621.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [4, 5, 6], // → Mansikka, Peruna, Porkkana
        pickupTimes: [
          'Lauantaina 24.9, klo 8-10',
          'Sunnuntaina 25.9, klo 12-14',
        ],
        place: 'Jyväskylän kauppatori',
      },
      {
        id: 4,
        title: 'Laukka Jyväskylä',
        AltText: 'vadelma',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-pixabay-59999.jpg',
        description: [
          'Perheviljelys jo kolmannessa polvessa.',
          'Käytämme vain luomumenetelmiä ja kunnioitamme luonnon kiertokulkua.',
          'Tuotteemme ovat aina tuoreita ja laadukkaita.',
        ],
        producerID: 4,
        producers: 'Matias tila',
        producersImge: '/pexels-pixabay-221100.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [13, 14, 15], // → Vadelma, Pensasmustikka, Porkkana
        pickupTimes: [
          'Lauantaina 24.9, klo 8-10',
          'Sunnuntaina 25.9, klo 12-14',
        ],
        place: 'K-Supermarket Laukka parkkipaikka',
      },
      {
        id: 5,
        title: 'Tourula Jyväskylä',
        AltText: 'mansikka',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-suzyhazelwood-1258264.jpg',
        description: [
          'Perheviljelys jo kolmannessa polvessa.',
          'Käytämme vain luomumenetelmiä ja kunnioitamme luonnon kiertokulkua.',
          'Tuotteemme ovat aina tuoreita ja laadukkaita.',
        ],
        producerID: 5,
        producers: 'Pekan tila',
        producersImge: '/pexels-carolin-wenske-762365559-26646961.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [7, 8, 9], // → Mansikka, Porkkana, Peruna
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
        AltText: 'mustikka',
        location: 'Keski-Suomi',
        notificationsImage: '/pexels-pixabay-45908.jpg',
        description: [
          'Tila on toiminut yli 30 vuotta ja olemme erikoistuneet laadukkaisiin mansikoihin, vadelmiin ja pensasmustikoihin.',
          'Tervetuloa nauttimaan kesän makeimmista hedelmistä! Marjamme kasvavat puhtaassa Keski-Suomen luonnossa ja saavat auringonvaloa riittämiin.',
          'Mansikat ovat nyt huippukunnossa, täysin kypsiä ja makeita. Vadelmat ja pensasmustikat tuovat pöytään kesän värejä ja makuja.',
          'Takaamme tuoreuden ja laadun jokaisessa marjassa!',
        ],
        producerID: 6,
        producers: 'Annan tila',
        producersImge: '/pexels-clement-proust-363898785-21906698.jpg',
        date: '22.9.2025 - 28.9.2025',
        productsID: [16, 17, 18], // → Porkkana, Pensasmustikka, Vadelma
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
