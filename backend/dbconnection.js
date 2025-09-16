const mongoose = require('mongoose');
require('dotenv').config(); //dotenv-moduuli tarvitaan jos aiotaan käyttää .env-filua
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log(process.env.MONGODB_URL);
    console.error('Database connection error: ' + err);
  });
module.exports = mongoose;
