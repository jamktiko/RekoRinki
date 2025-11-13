import { Op, Sequelize } from '@sequelize/core';
import { Ilmoitukset } from '../models/model.js';

const haku = async (searchTerm = '') => {
  searchTerm = String(searchTerm || '')
    .trim()
    .toLowerCase();

  try {
    const ilmoitukset = await Ilmoitukset.findAll({
      attributes: ['title', 'maakunta', 'kuva', 'kuvaus'],
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
