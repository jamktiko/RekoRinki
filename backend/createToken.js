// Tuodaan jsonwebtoken tokenien luomiseen
import jwt from 'jsonwebtoken';
// tuodaan .env tiedosto ja ladataan sen ympäristömuuttujat
import dotenv from 'dotenv';
dotenv.config;
// Luodaan tokeni joka saa arvoksi userin sekä tuottajan
const createToken = (user, tuottaja) => {
  // tokenin sisältämä data joka on käyttäjän sähköposti, sekä tieto siitä onko käyttäjä tuottaja
  const payload = {
    email: user.sahkoposti,
    tuottaja: tuottaja,
  };
  // salataan tokeni ja tokenille voimassaoloaika
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 4, // expiroituu 4 tunnissa
  });
  // palautetaan token
  return token;
};
// exportataan tokeninluontifunktio
export default createToken;
