// import { describe, it, expect, vi } from 'vitest';
// import { of, firstValueFrom } from 'rxjs';
// import { NotificationService, AppNotification } from './notification.service';

// // Pieni HttpClient-mock
// const createHttpClientMock = () => ({
//   get: vi.fn(),
// });

// describe('NotificationService', () => {
//   it('palauttaa kaikki ilmoitukset getNotifications()', async () => {
//     const mockIlmoitukset: AppNotification[] = [
//       {
//         ilmoitusID: 1,
//         title: 'Perunat',
//         maakunta: 'Keski-Suomi',
//         nimi: 'Matti',
//         kuva: null,
//         kuvaus: 'Tuoreita perunoita',
//         julkaisupaiva: '2025-01-01',
//         voimassaolo_paattyy: '2025-01-10',
//         tuottaja: {
//           etunimi: 'Matti',
//           sukunimi: 'Meikäläinen',
//         },
//         ilmoitus_has_Tuotteets: [],
//         reitis: [],
//       },
//       {
//         ilmoitusID: 2,
//         title: 'Omenamehu',
//         maakunta: 'Pohjois-Savo',
//         nimi: 'Omenatarha Oy',
//         kuva: null,
//         kuvaus: 'Luomuomenista puristettu mehu',
//         julkaisupaiva: '2025-02-01',
//         voimassaolo_paattyy: '2025-02-15',
//         tuottaja: {
//           etunimi: 'Olli',
//           sukunimi: 'Omena',
//         },
//         ilmoitus_has_Tuotteets: [],
//         reitis: [],
//       },
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
