/** NotificationService hakea ilmoituksia palvelimelta tai tiedostosta(in-memory-data.service)
 *
 * Eli nyt notificationService haemme ne ilmoituksen notifications-taulukko InMemory-palvelimeltä
 *
 *   */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppNotification } from './types';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private serverUrl = 'api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(this.serverUrl);
  }

  getNotificationById(id: number): Observable<AppNotification> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<AppNotification>(url);
  }
}
