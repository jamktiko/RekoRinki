import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../cartstore';
import { OstoskoriService } from '../ostoskori.service';

@Component({
  selector: 'app-navigaatio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigaatio.component.html',
  styleUrl: './navigaatio.component.css',
})
export class NavigaatioComponent {
  // komponentilla ei ole omaa tilaa, vaan tila on storessa
  readonly ostoskoriService = inject(OstoskoriService);

  isMenuOpen = false;
  showCartAlert = false; // tuotemäärä näkyminen menu kuvakeella

  // Kun cstore.totalCount() kasvaa (eli tuote lisätään ostoskoriin),
  // ngDoCheck() huomaa sen ja asettaa showCartAlert = true
  ngDoCheck() {
    // jos ostoskoriin lisätään jotain
    if (this.ostoskoriService.getTotalCount() > 0 && !this.isMenuOpen) {
      this.showCartAlert = true;
    }
  }

  // kun panetaan toggleMenu kuvake piilotetaan tuotemäärä kuvaken päälle.
  // taas kun suljetaan se menu kuvake näkyy tuotemäärä sinne menu kuvakken päälle
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.showCartAlert = false; // piilotetaan ilmoitus kun menu avataan
    }
  }
}
