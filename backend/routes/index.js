// Tuodaan express
import express from 'express';
// Tuodaan haeKaikki funktio indexControllerista
import haeKaikki from '../controllers/indexController.js';
// Luodaan router muuttuja jonka arvo on express.Router() funktio
const router = express.Router();
// haetaan ilmoitukset reitistä/
router.get('/', async (req, res) => {
  try {
    // Luodaan ilmoitukset muuttuja joka haeKaikki funktion arvon
    const ilmoitukset = await haeKaikki();
    // Palautetaan ilmoitukset json muodossa
    res.json(ilmoitukset);
    // Tulostetaan virhe jos haku epäonnistuu
  } catch (error) {
    res.status(500).json({ virhe: error });
  }
});
export default router;
