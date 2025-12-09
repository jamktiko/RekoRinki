import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../notification.service';
import { IlmoitusTiedot } from '../types';

@Component({
  selector: 'app-ilmoitukset',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ilmoitukset.component.html',
  styleUrl: './ilmoitukset.component.css',
})
export class IlmoituksetComponent {
  // muuttuija,joka sisältää kaikki ilmoitukset, jotka backend palauttaa
  notifications: IlmoitusTiedot[] = [];

  // ilmoitukset muuttuija, jotka näkyvät näytöllä. esim. kun syötämme hakukentässä
  filteredNotifications: IlmoitusTiedot[] = [];

  // muuttuija, joka tallennetaan hakukentän arvo kuten jyväskylä
  searchTerm: string = '';

  // Tällä saamme NotificationService-palvelun käyttöön
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // ladataan ilmoituksia komponenttissa.
    this.getNotifications();
  }

  // funktio, joka hae notification servicesta API kutsuja getNotifications() funktion kautta ilmoituksia komponenttin
  getNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        // kopioi saman listan filteredNotifications-muuttujaan
        this.filteredNotifications = data;
        console.log('Kaikki ilmoitukset:', data);
      },
      error: (err) => console.error('Virhe ilmoitusten haussa:', err),
    });
  }

  // Hakukenttä-funktio, joka haetaan etusivulla ne ilmoitukset (ilmoituksen otsikkoon ja maakunnan perustteella)
  onSearch(event: Event): void {
    // otetaan käyttäjän kirjoittama hakusana
    const target = event.target as HTMLInputElement;

    // tallennetaan se searchTerm-muuttujaan
    this.searchTerm = target.value.trim().toLowerCase();

    // haemme ilmoituksia (ilmoituksen otsikkon ja maakunnan perusteella)
    this.filteredNotifications = this.notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(this.searchTerm) ||
        n.maakunta.toLowerCase().includes(this.searchTerm)
    );
  }

  // Hakukentä tyhjennys ja sama aikaa näyttää kaikki ilmoitukset näkyviin
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredNotifications = this.notifications;
  }

  // käyttää tätä funktioita nopeuttamaan listan löydäminen.
  trackById(index: number, item: IlmoitusTiedot) {
    return item.ilmoitusID;
  }
}
