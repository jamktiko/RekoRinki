import express from 'express';
import haeIlmoitus from '../controllers/ilmoitusController.js';
const router = express.Router();
router.get('/ilmoitus/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ilmoitus = await haeIlmoitus(id);
    res.json(ilmoitus);
  } catch (error) {
    console.log(error);
    res.status(500).json({ virhe: error });
  }
});
export default router;
