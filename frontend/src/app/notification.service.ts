/** NotificationService hakea ilmoituksia palvelimelta tai tiedostosta(in-memory-data.service)
 *
 * Eli nyt notificationService haemme ne ilmoituksen notifications-taulukko InMemory-palvelimeltä
 *
 *   */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from './types';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private serverUrl = 'api/notifications'; // sama kuin in-memory-data.service palauttaa

  constructor(private http: HttpClient) {}

  // Hakee kaikki ilmoitukset (etusivu)
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.serverUrl);
  }

  // Hakee yhden ilmoituksen id:n perusteella (ilmoitustuotteet-sivu)
  getNotificationById(id: number): Observable<Notification> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Notification>(url);
  }
}
