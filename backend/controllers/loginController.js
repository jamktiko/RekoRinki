import { Asiakas, Tuottaja } from '../models/model.js';
import bcrypt from 'bcryptjs';
import createToken from '../createToken.js';
const login = async (data) => {
  try {
    const { tuottaja, sahkoposti, salasana } = data;
    const hashedPassword = bcrypt.hashSync(salasana, 8);
    console.log(data);
    console.log(hashedPassword);
    let kayttaja;
    if (tuottaja === true) {
      kayttaja = await Tuottaja.findOne({
        where: {
          sahkoposti: sahkoposti,
        },
      });
    } else {
      kayttaja = await Asiakas.findOne({
        where: {
          sahkoposti: sahkoposti,
        },
      });
    }
    console.log(kayttaja);
    if (!bcrypt.compareSync(salasana, kayttaja.salasana)) {
      throw 'Väärä salasana';
    } else {
      const token = createToken(kayttaja, tuottaja);
      return token;
    }
  } catch (error) {
    throw error;
  }
};
export default login;
