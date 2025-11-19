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

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private serverUrl = environment.apiUrl;
  private backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Lähettää HTTP GET -pyynnön this.serverUrl-osoitteeseen, eli esim.
  // kehityksessa: http://localhost:3000/api
  // tuotantossa: https://reko-rinki.eu-north-1.elasticbeanstalk.com/api
  // getNotifications(): Observable<AppNotification[]> {
  //   return this.http.get<AppNotification[]>(`${this.serverUrl}/notifications`);
  // }
  getNotifications(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}`);
  }
  // Lisää id:n osoitteen perään ja hakee yksittäisen ilmoituksen, kuten:
  // https://reko-rinki.eu-north-1.elasticbeanstalk.com/api/123
  getNotificationById(id: number): Observable<AppNotification> {
    const url = `${this.serverUrl}/notifications/${id}`;
    return this.http.get<AppNotification>(url);
  }
}
