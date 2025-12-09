// Tuodaan express
import express from 'express';
// Tuodaan reg funktio
import reg from '../controllers/regController.js';
// Luodaan router
const router = express.Router();
// Luodaan post reitti joka vastaa osoitteessa /register
router.post('/register', async (req, res) => {
  try {
    // Kutsutaan reg funktiota ja annetaan sille käyttäjän tiedot
    const token = await reg(req.body);
    // Palautetaan viesti rekisteröinti onnistui jos käyttäjä saadaan lisättyä tietokantaan sekä käyttäjän tokeni
    res.status(201).json({
      message: 'Rekisteröinti onnistui',
      token: token,
    });
    // Tehdään virheenkäsittely ja palautetaan viesti virhe jos rekisteröinti epäonnistuu
  } catch (error) {
    res.status(500).json({ virhe: error });
  }
});
export default router;
// Exportataan reitti
