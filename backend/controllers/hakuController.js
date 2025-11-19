import { Op, Sequelize } from '@sequelize/core';
import { Ilmoitukset, Tuottaja } from '../models/model.js';
const haku = async (searchTerm = '') => {
  searchTerm = String(searchTerm || '')
    .trim()
    .toLowerCase();
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

    return ilmoitukset;
  } catch (error) {
    console.error('Haku error:', error);
    throw error;
  }
};

export default haku;
