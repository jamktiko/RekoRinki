import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigaatioComponent } from './navigaatio/navigaatio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigaatioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
