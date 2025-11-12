import express from 'express';
import haku from '../controllers/hakuController.js';
const router = express.Router();
router.get('/haku/:maakunta', async (req, res) => {
  try {
    const maakunta = req.params.maakunta;
    const hakuTulokset = await haku(maakunta);

    res.json(hakuTulokset);
  } catch (error) {
    res.status(500).json({ virhe: error });
  }
});
export default router;
