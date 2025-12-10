// Tuodaan tarvittavat modelit
import { Asiakas, Tuottaja } from '../models/model.js';
// Tuodaan bcrypt kirjasto salasanan salaukseen ja vertailuun
import bcrypt from 'bcryptjs';
// Tuodaan tokenin luontifunktio
import createToken from '../createToken.js';
// Luodaan loginfunktio kirjautumista varten joka saa parametriksi datan
const login = async (data) => {
  try {
    // Datan arvot
    const { tuottaja, sahkoposti, salasana } = data;
    // hashataan salasana
    const hashedPassword = bcrypt.hashSync(salasana, 8);
    // Luodaan käyttäjä muuttuja
    let kayttaja;
    // haetaan kannasta tuottaja sähköpostin perusteella jos tuottaja muutttuja on true
    if (tuottaja === true) {
      kayttaja = await Tuottaja.findOne({
        where: {
          sahkoposti: sahkoposti,
        },
      });
      // haetaan kannasta asiakkaan tiedot sähköpostin silloin kun tuottaja muuttuja on false
    } else {
      kayttaja = await Asiakas.findOne({
        where: {
          sahkoposti: sahkoposti,
        },
      });
    }
    // Tarkistetaan onko salasana oikein ja jos ei ole annetaan viesti väärä salasana
    if (!bcrypt.compareSync(salasana, kayttaja.salasana)) {
      throw new Error('Väärä salasana');
      // Luodaan tokeni ja palautetaan se
    } else {
      const token = createToken(kayttaja, tuottaja);
      return token;
    }
  } catch (error) {
    throw error;
  }
};
export default login;
// Exportataan login funktio
