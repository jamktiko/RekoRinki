import express from 'express';
import tilaus from '../controllers/uusiTilauscontroller.js';
const router = express.Router();
router.post('/uusitilaus', async (req, res) => {
  try {
    const uusi = await tilaus(req.body);
    res.status(200).json({
      message: 'Tilaus onnistui',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Tilaus epäonnistui',
      error: error,
    });
    throw error;
  }
});
export default router;
