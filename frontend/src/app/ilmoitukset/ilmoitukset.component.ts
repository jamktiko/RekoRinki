import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppNotification } from '../types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../notification.service';
import { IlmoitusTiedot, KaikkiIlmoitusTiedot } from '../types';

@Component({
  selector: 'app-ilmoitukset',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ilmoitukset.component.html',
  styleUrl: './ilmoitukset.component.css',
})
export class IlmoituksetComponent {
  notifications: IlmoitusTiedot[] = [];
  filteredNotifications: IlmoitusTiedot[] = [];
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
        console.log('Kaikki ilmoitukset:', data);
      },
      error: (err) => console.error('Virhe ilmoitusten haussa:', err),
    });
  }

  // Hakukenttä-funktio
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.trim().toLowerCase();

    this.filteredNotifications = this.notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(this.searchTerm) ||
        n.maakunta.toLowerCase().includes(this.searchTerm)
    );
  }

  // clear-funktion tyhjennuksen varten
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredNotifications = this.notifications;
  }

  trackById(index: number, item: IlmoitusTiedot) {
    return item.ilmoitusID;
  }
}
