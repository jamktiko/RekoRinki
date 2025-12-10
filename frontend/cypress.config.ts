/**
 * Tämä tiedosto:
 *    kertoo Cypressille, että testataan Angular-sovellusta
 *    määrittelee että sovellus löytyy osoitteesta http://localhost:4200
 *    antaa paikan, johon voi lisätä lisäasetuksia myöhemmin
 *    käynnistää Cypressin testit näillä asetuksilla
 */

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
