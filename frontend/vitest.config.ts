/**
 * tämä tiedosto tekee testauksesta Angular-projektissa helpompaa ja luo aliasit, jotta koodin importit ovat siistejä.
 */

import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true, // Voit käyttää describe, it, expect ilman importteja.
    environment: 'jsdom', // Vitest osaa ajaa Angularin templateja, DOM:ia ja HttpClientiä
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
