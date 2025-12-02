// import { describe, it, expect, vi } from 'vitest';
// import { of, firstValueFrom } from 'rxjs';
// import { NotificationService, AppNotification } from './notification.service';
// import { YhdenIlmoitusReitti, YhdenIlmoitusTiedot, YhdenIlmoitusTuotteet, IlmoitusTiedot } from './types';

// // Pieni HttpClient-mock
// const createHttpClientMock = () => ({
//   get: vi.fn(),
// });

// describe('NotificationService', () => {
//   it('palauttaa kaikki ilmoitukset getNotifications()', async () => {
//     const mockIlmoitukset: YhdenIlmoitusTuotteet[] = [
//       {
//   "kuva": null,
//   "title": "Maidon jakopiste Lapualle",
//   "maakunta": "Etelä-Pohjanmaa",
//   "julkaisupaiva": "2025-11-20T20:31:08.000Z",
//   "voimassaolo_paattyy": "2025-11-27T20:31:08.000Z",
//   "ilmoitus_has_Tuotteets": [
//     {
//       "kuva": null,
//       "maara": 100,
//       "uniqueId": "1_1",
//       "tuotteet": {
//         "nimi": "Luomumaito 1L",
//         "kuvaus": "Tuoretta luomumaitoa",
//         "yksikkohinta": "1.50"
//       }
//     },
//     {
//       "kuva": null,
//       "maara": 80,
//       "uniqueId": "1_2",
//       "tuotteet": {
//         "nimi": "Kananmunat 10kpl",
//         "kuvaus": "Vapaan kanan munia",
//         "yksikkohinta": "3.80"
//       }
//     }
//   ],
//   "tuottaja": { "kuva": null, "etunimi": "Kalle", "sukunimi": "Karhunen" },
//   "reitits": [
//     {
//       "jakopaiva_aika": "2025-11-23T20:31:08.000Z",
//       "jakopaikka": "Lapuan tori",
//       "katuosoite": "Torikatu 1",
//       "postinumero": "62100",
//       "paikkakunta": "Lapua",
//       "lisatieto": "Jako klo 17–19"
//     }
//   ]
// }

//     ];

//     // 1) Luodaan HttpClient-mock ja kerrotaan mitä get palauttaa
//     const httpMock = createHttpClientMock();
//     httpMock.get.mockReturnValue(of(mockIlmoitukset));

//     // 2) Luodaan service mockatulla HttpClientillä
//     const service = new NotificationService(httpMock as any);

//     // 3) Ylikirjoitetaan serverUrl testissä, jotta environmentia ei tarvita
//     (service as any).serverUrl = 'http://fake-api/notifications';

//     // 4) Kutsutaan metodia
//     const result = await firstValueFrom(service.getNotifications());

//     // 5) Varmistetaan, että tulos on sama kuin mock-data
//     expect(result).toEqual(mockIlmoitukset);

//     // 6) Varmistetaan, että GET kutsuttiin oikein
//     expect(httpMock.get).toHaveBeenCalledTimes(1);
//     expect(httpMock.get).toHaveBeenCalledWith('http://fake-api/notifications');
//   });
// });
