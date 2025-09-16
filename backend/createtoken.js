const jwt = require('jsonwebtoken');
require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua

createToken = (user) => {
  const payload = {
    username: user.username,
  };
  console.log(payload); // Voisi näyttää tältä: {'username':'tuito', 'isadmin': true}
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 4, // expiroituu 4 tunnissa
  });
  return token;
};

module.exports = createToken;
