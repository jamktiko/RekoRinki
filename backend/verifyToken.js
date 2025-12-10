// Tuodaan JSON Web Token -kirjasto tokenin tokenin tarkistamiseen
import jwt from 'jsonwebtoken';
// secret muuttuja, joka hakee salatun tokenin
const secret = process.env.SECRET;
// funktio, joka purkaa tokenin
const verifyToken = (req, res, next) => {
  // token muuttuja joka saa arvoksi luodun tokenin
  const token = req.body.token || req.headers['x-access-token'];
  // tarkistetaan, että onko tokenia, ja jos ei ole annetaan viesti Kirjautuminen epäonnistui
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'Kirjautuminen epäonnistui',
    });
  }
  // Tarkistetaan tokeni JSON Web Tokenilla
  jwt.verify(token, secret, (err, decoded) => {
    // tehdään virheenkäsittely
    if (err) {
      return res.json({
        success: false,
        message: 'Virhe',
      });
    }
    // puretaan tokeni ja mennään eteenpäin
    req.decoded = decoded;
    next();
  });
};
export default verifyToken;
// exportataan verifyToken funktio
