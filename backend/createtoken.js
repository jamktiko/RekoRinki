import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config;
const createToken = (user, tuottaja) => {
  const payload = {
    email: user.sahkoposti,
    tuottaja: tuottaja,
  };
  console.log(payload); // Voisi näyttää tältä: {'username':'tuito', 'isadmin': true}
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 4, // expiroituu 4 tunnissa
  });
  return token;
};
export default createToken;
