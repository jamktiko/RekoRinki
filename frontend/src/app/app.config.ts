/*
app.config.ts on standalone-sovelluksen konfiguraatiotiedosto, jossa otetaan käyttöön, eli
tarjotaan koko sovellukselle (provide) esim. reititys ja in-memory-web-api. Standalone-sovelluksessa 
ei ole moduulia, joten moduulissa normaalisti olevat määritykset voivat olla app.config.ts:ssä.
*/
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { InMemoryDataService } from './in-memory-data.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  // providers-taulukko sisältää sovellukselle tarjottavat palvelut
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),

    // Tämä rivi poistetaan, kun siirrytään oikeaan backend-API:in.
    // importProvidersFrom(
    //   HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //     delay: 500,
    //   })
    // ),

    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
