import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import dotenv from 'dotenv';
dotenv.config();
const con = new Sequelize({
  database: process.env.DB_DATABASE || 'rekorinki',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
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
}

export default con;
