// Tuodaan express reititystä varten
import express from 'express';
// Tuodaan hakufunktio ilmoituksen hakemiseen
import haku from '../controllers/hakuController.js';
// luodaan router funktio jonka arvo on expressin router funktio
const router = express.Router();
// Luodaaan reitti joka vastaa osoitteesta /haku/hakusana. Hakusana on url parametri, ja se on haettava title ja tai maakunta
router.get('/haku/:hakuSana', async (req, res) => {
  try {
    // Luodaan hakuSana, joka saa parametrinä annetun hakusana
    const hakuSana = req.params.hakuSana;
    // Hakutulokset palauttaaa ilmoitukset, jotka vastaavat hakusanaa
    const hakuTulokset = await haku(hakuSana);
    // Palautetaan ilmoitukset
    res.json(hakuTulokset);
    // Palautetaan virhe jos haku epäonnistuu
  } catch (error) {
    res.status(500).json({ virhe: error });
  }
});
export default router;
// Exportataan reitti
