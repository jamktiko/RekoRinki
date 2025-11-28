import { Asiakas, Tuottaja } from '../models/model.js';
import bcrypt from 'bcryptjs';
import createToken from '../createToken.js';
const reg = async (data) => {
  try {
    const {
      tuottaja,
      kayttajatunnus,
      salasana,
      etunimi,
      sukunimi,
      puhelinnro,
      sahkoposti,
      katuosoite,
      postinumero,
      postitoimipaikka,
      paikkakunta,
      lisatiedot,
    } = data;
    const hashedPassword = bcrypt.hashSync(salasana, 8);
    let kayttaja;
    if (tuottaja === true) {
      kayttaja = await Tuottaja.create({
        kayttajatunnus: kayttajatunnus,
        salasana: hashedPassword,
        etunimi: etunimi,
        sukunimi: sukunimi,
        puhelinnro: puhelinnro,
        sahkoposti: sahkoposti,
        katuosoite: katuosoite,
        postinumero: postinumero,
        postitoimipaikka,
        paikkakunta: paikkakunta,
        lisatiedot: lisatiedot,
      });
    } else {
      kayttaja = await Asiakas.create({
        kayttajatunnus: kayttajatunnus,
        salasana: hashedPassword,
        etunimi: etunimi,
        sukunimi: sukunimi,
        puhelinnro: puhelinnro,
        sahkoposti: sahkoposti,
        katuosoite: katuosoite,
        postinumero: postinumero,
        postitoimipaikka: postitoimipaikka,
        paikkakunta: paikkakunta,
      });
    }
    const token = createToken(kayttaja, tuottaja);
    return token;
  } catch (error) {
    throw error;
  }
};
export default reg;
