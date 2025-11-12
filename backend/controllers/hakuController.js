import { Ilmoitukset } from '../models/model.js';
import { op } from 'sequelize';
const haku = async (searchTerm = '') => {
  searchTerm = searchTerm.trim().toLowerCase();
  return Ilmoitukset({
    where: {
      [OP.or]: [
        { title: { [Op.iLike]: `%${searchTerm}%` } },
        { maakunta: { [Op.iLike]: `%${searchTerm}%` } },
      ],
    },
  });
};
export default haku;
