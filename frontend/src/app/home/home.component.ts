import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppNotification } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  notifications: Notification[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Notification[]>('/api/notifications')
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }
}
