// Tuodaan sequelize kirjasto
import { Sequelize } from '@sequelize/core';
// Tuodaan mysql2 kirjasto
import { MySqlDialect } from '@sequelize/mysql';
// Tuodaan .env tiedosto
import dotenv from 'dotenv';
// Tuodaan funktio tietokannan tunnusten hakemiseen
import getDbCredentials from './config/database.js';
dotenv.config();
// Haetaan tietokannan kirjautumistiedot
const db = await getDbCredentials();
// Luodaan tietokantayhteys
const con = new Sequelize({
  database: db.dbname || 'rekorinki',
  user: db.username,
  password: db.password,
  host: db.host || 'localhost',
  port: db.port || 3306,
  dialect: MySqlDialect,
  logging: false,
  define: {
    timestamps: false,
  },
});
// Tulostetaan teksti Yhteys tietokantaan toimii! toimii jos kantaan saadaan yhteys
try {
  await con.authenticate();
  console.log('Yhteys tietokantaan toimii!');
} catch (error) {
  console.error('MySQL yhteysvirhe:');
  console.error(error);
  throw error;
}

export default con;
// Exportataan tietokantayhteys
