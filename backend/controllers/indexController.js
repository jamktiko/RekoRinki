// Tuodaan ilmoitukset sekä tuottaja modeli
import { Ilmoitukset, Tuottaja } from '../models/model.js';
// Luodaan asyncroninen funktio joka hakee kaikki ilmoitukset
const haeKaikki = async () => {
  try {
    // Haetaan ilmoituksen ilmoitusID, title, maakunta, nimi, kuva, kuvaus, julkaisupaiva, voimassaolo_paattyy, sekä tuottajan etunimi ja sukunimi
    const ilmoitukset = await Ilmoitukset.findAll({
      attributes: [
        'ilmoitusID',
        'title',
        'maakunta',
        'nimi',
        'kuva',
        'kuvaus',
        'julkaisupaiva',
        'voimassaolo_paattyy',
      ],
      include: [
        {
          model: Tuottaja,
          attributes: ['etunimi', 'sukunimi'],
        },
      ],
    });
    // Palautetaan ilmoitukset
    return ilmoitukset;
    // Heitetään virhe jos ilmoitusten hakeminen ei onnistu
  } catch (error) {
    throw error;
  }
};
export default haeKaikki;
// Exportataan hakufunktio
