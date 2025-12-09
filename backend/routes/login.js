// Tuodaan express
import express from 'express';
// Tuodaan login funktio
import login from '../controllers/loginController.js';
// Luodaan router
const router = express.Router();
// Luodaan post reitti kirjautumiseen joka vastaa osoitteesta /login
router.post('/login', async (req, res) => {
  try {
    // kutsutaan login funktiota
    const token = await login(req.body);
    // Palautetaan viesti kirjautuminen onnistui sekä tokeni jos kirjautuminen on onnistunut
    res.status(201).json({
      message: 'Kirjautuminen onnistui',
      token: token,
    });
    // Tehdään virheen käsittely ja viesti kirjautuminen epäonnistui virheen sattuessa
  } catch (error) {
    res.status(500).json({
      message: 'Kirjautuminen epäonnistui!',
      error: error,
    });
    throw error;
  }
});
export default router;
// Exportataan reitti
