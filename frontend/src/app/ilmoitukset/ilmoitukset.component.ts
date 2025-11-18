import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppNotification } from '../types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-ilmoitukset',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ilmoitukset.component.html',
  styleUrl: './ilmoitukset.component.css',
})
export class IlmoituksetComponent {
  notifications: AppNotification[] = [];
  filteredNotifications: AppNotification[] = [];
  searchTerm: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.filteredNotifications = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Virhe ilmoitusten haussa:', err);
      },
    });
  }

  // Hakukenttä-funktio / minulla vielä puuttuu tuottajaien nimi
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.trim().toLowerCase();

    this.filteredNotifications = this.notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(this.searchTerm) ||
        n.location.toLowerCase().includes(this.searchTerm)
    );
  }

  // clear-funktion tyhjennuksen varten
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredNotifications = this.notifications;
  }
}
