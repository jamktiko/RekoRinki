import express from 'express';
import reg from '../controllers/regController.js';
const router = express.Router();
router.post('/register', async (req, res) => {
  try {
    const uusiKayttaja = await reg(req.body);
    res.status(201).json({
      message: 'Rekisteröinti onnistui',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ virhe: error });
  }
});
export default router;
