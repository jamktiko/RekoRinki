/**
 * Tämä tiedosto:
 *    kertoo Tailwindille, mistä etsiä CSS-luokkia (.html ja .ts tiedostot)
 *    määrittelee Tailwindin perusasetukset
 *    antaa mahdollisuuden lisätä omia värejä tai plugineja
 *    ei sisällä mitään extraa → perus Tailwind käytössä
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
