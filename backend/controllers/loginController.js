import { Asiakas, Tuottaja } from '../models/model.js';
import bcrypt from 'bcryptjs';
import createToken from '../createToken.js';
const login = async (data) => {
  try {
    const { tuottaja, sahkoposti, salasana } = data;
    const hashedPassword = bcrypt.hashSync(salasana, 8);
    let kayttaja;
    if (tuottaja === true) {
      kayttaja = await Tuottaja.findOne({
        where: {
          tuottaja: tuottaja,
          sahkoposti: sahkoposti,
          salasana: hashedPassword,
        },
      });
    } else {
      kayttaja = await Asiakas.findOne({
        where: {
          tuottaja,
          sahkoposti,
          salasana: hashedPassword,
        },
      });
    }
    const token = createToken(kayttaja, tuottaja);
    return token;
  } catch (error) {
    throw error;
  }
};
export default login;
