import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../cartstore';

@Component({
  selector: 'app-navigaatio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigaatio.component.html',
  styleUrl: './navigaatio.component.css',
})
export class NavigaatioComponent {
  // komponentilla ei ole omaa tilaa, vaan tila on storessa
  readonly cstore = inject(CartStore);

  isMenuOpen = false;
}
