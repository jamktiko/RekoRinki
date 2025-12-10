// Tuodaan express
import express from 'express';
// Tuodaan ilmoituksen hakufunktio
import haeIlmoitus from '../controllers/ilmoitusController.js';
// Luodaan router
const router = express.Router();
// Luodaan get reitti joka vastaa osoitteesta /ilmoitus/ id. id parametriin tulee ilmoituksen id
router.get('/ilmoitus/:id', async (req, res) => {
  try {
    // Luodaan id muuttuja joka saa arvoksi reitin parametrin
    const id = req.params.id;
    // Haetaan ilmoitus id muuttujan arvon perusteella
    const ilmoitus = await haeIlmoitus(id);
    // Palautetaan ilmoitus
    res.json(ilmoitus);
    // Tehdään virheen käsittely ja palautetaan viesti virhe, jos haku epäonnistuu
  } catch (error) {
    res.status(500).json({ virhe: error });
  }
});
export default router;
// Exportataan reitti
