/** NotificationService hakea ilmoituksia palvelimelta tai tiedostosta(in-memory-data.service)
 *
 * Eli nyt notificationService haemme ne ilmoituksen notifications-taulukko InMemory-palvelimeltä
 *
 *   */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppNotification } from './types';
import { environment } from 'src/environments/environment';

// Määrittele ilmoituksen tyyppi
// export interface AppNotification {
//   ilmoitusID: number;
//   title: string;
//   maakunta: string;
//   nimi: string;
//   kuva: string | null;
//   kuvaus: string;
//   julkaisupaiva: string;
//   voimassaolo_paattyy: string;
//   tuottaja: {
//     etunimi: string;
//     sukunimi: string;
//     kuva?: string | null;
//   };
//   // Lisää muut tarvittavat kentät kuten ilmoitus_has_Tuotteets ja reitit tms.
//   ilmoitus_has_Tuotteets?: any[];
//   reitis?: any[];
// }

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private serverUrl = environment.apiUrl;
  // private serverUrl = '';

  constructor(private http: HttpClient) {}

  // Lähettää HTTP GET -pyynnön this.serverUrl-osoitteeseen, eli esim.
  // kehityksessa: http://localhost:3000/api
  // tuotantossa: https://reko-rinki.eu-north-1.elasticbeanstalk.com/api
  getNotifications(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.serverUrl}/notifications`);
  }

  // Lisää id:n osoitteen perään ja hakee yksittäisen ilmoituksen, kuten:
  // https://reko-rinki.eu-north-1.elasticbeanstalk.com/api/123
  getNotificationById(id: number): Observable<AppNotification> {
    const url = `${this.serverUrl}/notifications/${id}`;
    return this.http.get<any>(url);
  }
}
