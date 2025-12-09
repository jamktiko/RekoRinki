import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OstoskoriService } from '../ostoskori.service';

@Component({
  selector: 'app-navigaatio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigaatio.component.html',
  styleUrl: './navigaatio.component.css',
})
export class NavigaatioComponent {
  // hakee ostoskoriService-instanssin käyttöön
  readonly ostoskoriService = inject(OstoskoriService);

  // muuttuija, joka kertoo, onko mobiili-valikko auki vai kiinni
  isMenuOpen = false;

  // muuttuja, joka näyttää pienen punaisen ilmoituspisteen, kun ostoskoriin lisätään tuotteita
  showCartAlert = false;

  // Tämä funktio pyörii taustalla aina kun Angular päivittää näkymää.
  ngDoCheck() {
    // jos ostoskoriin lisätään jotain
    if (this.ostoskoriService.getTotalCount() > 0 && !this.isMenuOpen) {
      // Jos molemmat ehdot pitävät paikkansa näytetään punainen ilmoituspiste (showCartAlert = true
      this.showCartAlert = true;
    }
  }

  // kun panetaan toggleMenu kuvake piilotetaan tuotemäärä kuvaken päälle.
  // taas kun suljetaan se menu kuvake näkyy tuotemäärä sinne menu kuvakken päälle
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
