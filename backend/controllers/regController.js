import { Asiakas, Tuottaja } from '../models/model.js';
import bcrypt from 'bcryptjs';
const reg = async (data) => {
  try {
    const { tuottaja, sahkoposti, salasana } = data;

    const hash = await bcrypt.hash(salasana, 8);
    let kayttaja;
    if (tuottaja === true) {
      kayttaja = await Tuottaja.create({
        kayttajatunnus: kayttajatunnus,
        salasana: salasana,
        etunimi: etunimi,
        sukunimi: sukunimi,
        puhelinnro: puhelinro,
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
        salasana: salasana,
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
    return kayttaja;
  } catch (error) {
    throw error;
  }
};
export default reg;
