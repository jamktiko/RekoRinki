import { Ilmoitukset } from '../models/model.js';
const haeKaikki = async () => {
  try {
    const ilmoitukset = await Ilmoitukset.findAll({
      attributes: ['title', 'maakunta', 'kuva', 'kuvaus'],
    });

    return ilmoitukset;
  } catch (error) {
    throw error;
  }
};
export default haeKaikki;
// testi
