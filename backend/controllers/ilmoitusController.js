import {
  Ilmoitukset,
  Tuotteet,
  Reitit,
  Ilmoitus_has_Tuotteet,
  Tuottaja,
} from '../models/model.js';

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
          attributes: ['kuva', 'maara'],
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
