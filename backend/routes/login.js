import express from 'express';
import login from '../controllers/loginController.js';
const router = express.Router();
router.post('/login', async (req, res) => {
  try {
    const token = await login(req.body);
    res.status(201).json({
      message: 'Kirjautuminen onnistui',
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Kirjautuminen epäonnistui!',
      error: error,
    });
    throw error;
  }
});
export default router;
