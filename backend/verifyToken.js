import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;
const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'Kirjautuminen epäonnistui',
    });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Virhe',
      });
    }
    req.decoded = decoded;
    next();
  });
};
export default verifyToken;
