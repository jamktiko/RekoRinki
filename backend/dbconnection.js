import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import dotenv from 'dotenv';
import getDbCredentials from './config/database.js';
dotenv.config();
const db = await getDbCredentials();
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
try {
  await con.authenticate();
  console.log('Yhteys tietokantaan toimii!');
} catch (error) {
  console.error('MySQL yhteysvirhe:');
  console.error(error);
}

export default con;
