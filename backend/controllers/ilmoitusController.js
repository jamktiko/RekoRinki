// Tuodaan tarvittavat modelit ilmoitusten hakemiseen
import {
  Ilmoitukset,
  Tuotteet,
  Reitit,
  Ilmoitus_has_Tuotteet,
  Tuottaja,
} from '../models/model.js';
import { Op, Sequelize } from '@sequelize/core';
// Tuodaan sequelizen op metodi jota käytetään ilmoituksen hakemiseen
// Luodaan ilmoituksen hakumetodi, joka hakee yhden ilmoituksen sen id.n perusteella
const haeIlmoitus = async (ilmoitusID) => {
  try {
    // Haetaan ilmoitus id:n perusteella, ja palautetaan alempana määriteltyjen kenttien arvot
    const ilmoitus = await Ilmoitukset.findOne({
      where: { ilmoitusID: ilmoitusID },
      attributes: [
        'ilmoitusID',
        'kuva',
        'title',
        'maakunta',
        'kuvaus',
        'julkaisupaiva',
        'voimassaolo_paattyy',
      ],
      // liitetään yhteen ilmoitukseen kuuluvat modelit
      include: [
        {
          model: Ilmoitus_has_Tuotteet,
          attributes: [
            'ilmoitusID',
            'kuva',
            'maara',
            [
              // Luodaan uniikki id ilmoitusid tuoteid yhdistelmästä
              Sequelize.literal(`
    CONCAT(\`ilmoitus_has_Tuotteets\`.\`ilmoitusID\`, '_', \`ilmoitus_has_Tuotteets\`.\`tuoteID\`)
  `),
              'uniqueId',
            ],
          ],
          // liitetään ilmoituksen tuotteet
          include: [
            {
              model: Tuotteet,
              attributes: ['nimi', 'kuvaus', 'yksikkohinta'],
            },
          ],
        },
        // ilmoituksen tuottajan tiedot
        {
          model: Tuottaja,
          attributes: ['kuva', 'etunimi', 'sukunimi', 'lisatiedot'],
        },
        // Ilmoituksen reitit
        {
          model: Reitit,
          attributes: [
            'jakopaiva_aika',
            'jakopaikka',
            'katuosoite',
            'postinumero',
            'paikkakunta',
            'lisatieto',
          ],
          // Piilotetaan liitostaulun kentät
          through: {
            attributes: [],
          },
        },
      ],
    });
    // Palautetaan ilmoitus
    return ilmoitus;
    // Tehdään virheen käsittely
  } catch (error) {
    throw error;
  }
};
export default haeIlmoitus;
// Exportataan ilmoituksen hakufunktio
