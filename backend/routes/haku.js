import express from 'express';
import haku from '../controllers/hakuController.js';
const router = express.Router;
router.get('/haku', async (req, res) => {
  try {
    const hakuTulokset = await haku();
    res.json(hakuTulokset);
  } catch (error) {
    res.status(500).json({ virhe: error });
  }
});
