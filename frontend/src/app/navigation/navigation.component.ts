import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../cartstore';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  // komponentilla ei ole omaa tilaa, vaan tila on storessa
  readonly cstore = inject(CartStore);

  isMenuOpen = false;
}
