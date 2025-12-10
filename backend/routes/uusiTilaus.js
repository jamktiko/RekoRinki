// Tuodaan express
import express from 'express';
// Tuodaan tilaus funktio
import tilaus from '../controllers/uusiTilauscontroller.js';
// Luodaan router
const router = express.Router();
// Luodaan postreitti tilauksen lisäämiseen osoitteeseen /uusitilaus
router.post('/uusitilaus', async (req, res) => {
  try {
    // Kutsutaan tilausfunktiota
    const uusi = await tilaus(req.body);
    // Palautetaan viesti tilaus onnistui jos tilaus on onnistunut
    res.status(200).json({
      message: 'Tilaus onnistui',
    });
    // Tehdään virheenkäsittely jossa palautetaan viesti tilaus epäonnistui jos tapahtuu virhe
  } catch (error) {
    res.status(500).json({
      message: 'Tilaus epäonnistui',
      error: error,
    });
    throw error;
  }
});
export default router;
// Exportataan reitti
