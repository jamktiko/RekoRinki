import {
  Ilmoitukset,
  Tuotteet,
  Reitit,
  Ilmoitus_has_Tuotteet,
  Tuottaja,
} from '../models/model.js';
import { Op, Sequelize } from '@sequelize/core';

const haeIlmoitus = async (ilmoitusID) => {
  try {
    const ilmoitus = await Ilmoitukset.findOne({
      where: { ilmoitusID: ilmoitusID },
      attributes: [
        'kuva',
        'title',
        'maakunta',
        'julkaisupaiva',
        'voimassaolo_paattyy',
      ],
      include: [
        {
          model: Ilmoitus_has_Tuotteet,
          attributes: [
            'kuva',
            'maara',
            [
              Sequelize.literal(`
    CONCAT(\`ilmoitus_has_Tuotteets\`.\`ilmoitusID\`, '_', \`ilmoitus_has_Tuotteets\`.\`tuoteID\`)
  `),
              'uniqueId',
            ],
          ],
          include: [
            {
              model: Tuotteet,
              attributes: ['nimi', 'kuvaus', 'yksikkohinta'],
            },
          ],
        },
        {
          model: Tuottaja,
          attributes: ['kuva', 'etunimi', 'sukunimi'],
        },
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
          through: {
            attributes: [],
          },
        },
      ],
    });

    return ilmoitus;
  } catch (error) {
    throw error;
  }
};

export default haeIlmoitus;
