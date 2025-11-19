import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const secretsManager = new AWS.SecretsManager({ region: 'eu-north-1' });

async function getDbCredentials(secretArn) {
  const secretValue = await secretsManager.getSecretValue({ SecretId: secretArn }).promise();
  return JSON.parse(secretValue.SecretString);
}

async function createConnection() {
  try {
    const secretArn = process.env.DB_SECRET_ARN;
    const creds = await getDbCredentials(secretArn);
    
const con = new Sequelize({
  database: process.env.DB_NAME || 'rekorinki',
  user: creds.username,
  password: creds.password,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: MySqlDialect,
  logging: false,
  define: {
    timestamps: false,
  },
});
    
    await con.authenticate();
    console.log('Yhteys tietokantaan toimii!');
    return con;
  } catch (error) {
    console.error('MySQL yhteysvirhe:');
    console.error(error);
    throw error;
  }
}

const con = await createConnection();
export default con;
