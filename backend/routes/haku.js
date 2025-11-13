import express from 'express';
import haku from '../controllers/hakuController.js';
const router = express.Router();
router.get('/haku/:hakuSana', async (req, res) => {
  try {
    const hakuSana = req.params.hakuSana;
    const hakuTulokset = await haku(hakuSana);
    res.json(hakuTulokset);
  } catch (error) {
    res.status(500).json({ virhe: error });
  }
});
export default router;
