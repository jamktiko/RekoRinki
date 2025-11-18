import { Ilmoitukset } from '../models/model.js';
const haeKaikki = async () => {
  try {
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
      include: [],
    });

    return ilmoitukset;
  } catch (error) {
    throw error;
  }
};
export default haeKaikki;
