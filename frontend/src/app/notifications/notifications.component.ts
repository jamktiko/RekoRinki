import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Notification } from '../types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Notification[]>('/api/notifications')
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.filteredNotifications = notifications; // Aluksi näytetään kaikki
      });
  }

  // Haku-funktio
  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterNotifications();
  }

  // Suodatus-funktio

  filterNotifications() {
    if (!this.searchTerm) {
      // Jos hakukenttä on tyhjä, näytetään KAIKKI ilmoitukset
      this.filteredNotifications = this.notifications;
    } else {
      // Suodatetaan VAIN ne ilmoitukset jotka vastaavat hakua
      this.filteredNotifications = this.notifications.filter(
        (notification) =>
          // Hae ilmoituksen nimen perusteella
          notification.title.toLowerCase().includes(this.searchTerm) ||
          // Hae tuottajan nimen perusteella (jos producer-kenttä on olemassa)
          (notification.producers &&
            notification.producers.toLowerCase().includes(this.searchTerm)) ||
          // Hae myös sijainnin perusteella
          notification.location.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  // clear-funktion tyhjennuksen varten
  clearSearch() {
    this.searchTerm = '';
    this.filteredNotifications = this.notifications;
  }
}
