import express from 'express';
import haeKaikki from '../controllers/indexController.js';
const router = express.Router();
router.get('/ilmoitukset', async (req, res) => {
  try {
    const ilmoitukset = await haeKaikki();
    res.json(ilmoitukset);
  } catch (error) {
    res.status(500).json({ virhe: error });
  }
});
export default router;
