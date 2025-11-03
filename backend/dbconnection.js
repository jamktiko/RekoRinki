const { Sequelize } = require('sequelize');
require('dotenv').config();
const conn = new Sequelize(
  process.env.DB_DATABASE || 'rekorinki',
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    define: {
      timestamps: false,
    },
  }
);
conn
  .authenticate()
  .then(() => {
    console.log('Yhteys tietokantaan toimii!');
  })
  .catch((err) => {
    console.error('MySQL yhteysvirhe');
  });
