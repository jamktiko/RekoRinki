// Tuodaan tarvittavat modelit
import { Asiakas, Tuottaja } from '../models/model.js';
// Tuodaan bcrypt kirjasto salasanan salamiseen
import bcrypt from 'bcryptjs';
// Tuodaan tokenin luontifunktio
import createToken from '../createToken.js';
// Luodaan req funktio rekisteröitymistä varten jolla on parametri data joka sisältää käyttäjätiedot
const reg = async (data) => {
  try {
    // Dataan tulevat tiedot
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
    // Hashataan salasana
    const hashedPassword = bcrypt.hashSync(salasana, 8);
    // luodaan käyttäjä joka lisää käyttäjän tiedot tuottajan perusteella tietokantaan
    let kayttaja;
    // Luodaan tuottaja tauluun uusi käyttäjä jos tuottaja on true
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
      // Luodaan asiakas tauluun käyttäjä jos tuottaja on false
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
    // Luodaan tokeni käyttäjän arvojen, sekä tuottaja muuttujan perusteella ja palautetaan se
    const token = createToken(kayttaja, tuottaja);
    return token;
    // Luodaan virheen käsittely ja heitetään error
  } catch (error) {
    throw error;
  }
};
export default reg;
// Exportataan reg funktio
