// tuodaan sequelizen op metodi jota käytetään haukuehdoissa
import { Op, Sequelize } from '@sequelize/core';
// Tuodaan tuottaja ja ilmoitukset modelit
import { Ilmoitukset, Tuottaja } from '../models/model.js';
// Luodaan hakufunktio
const haku = async (searchTerm = '') => {
  // Tarkistetaan, että hakutermi on merkkijono, ja trimmataan se ja muutetaan pieniksi kirjaimiksi
  searchTerm = String(searchTerm || '')
    .trim()
    .toLowerCase();
  try {
    // Luodaan ilmoitusten haku metodi, jonka palauttamat sarakkeet ovat: ilmoitusID, title, maakunta, nimi, kuva, kuvaus, julkaisupaiva, voimassaolo_paattyy, sekä tuottajan etu ja sukunimi. Haun where ehto palauttaa ilmoitukset, jonka title, tai maakunta ovat samat kuin haussa
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
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('maakunta')), {
            [Op.like]: `%${searchTerm}%`,
          }),
        ],
      },
    });
    // Palautetaan löytyneet ilmoitukset
    return ilmoitukset;
    // virrheen käsittely, joka heitttää error jos haku epäonnistuu
  } catch (error) {
    throw error;
  }
};

export default haku;
// Exportataan hakufunktio
