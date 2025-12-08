// Tuodaan SecretsManagerClient sekä GetSecretValueCommand aws muuttujat tietokantayhteyttä varten
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
// tuodaan env tiedosto
import dotenv from 'dotenv';
// Ladataan ympäristömuuttujat .env tiedostosta
dotenv.config();
// luodaan client muuttuja jolla onaws tietokannan tunnukset
const client = new SecretsManagerClient({ region: 'eu-north-1' });
// Luodaan funktio, joka palauttaa aws tietokannan tiedot, ja jos kantaan ei saada yhteyttä käytetään paikallista tietokantaa
async function getDbCredentials() {
  // luodaan muuttuja joka saa .env tiedoston arvot
  const isDev = process.env.NODE_ENV == 'development';
  // käytetään .env tiedoston muuttujien tietoja jos ei saada yhteyttä aws kantaan
  if (isDev) {
    return {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dbname: process.env.DB_NAME,
    };
  }
  // haetaan tietokannan tunnukset secretmanagerista silloin kun käytetään tuotantokantaa
  const secretName = JSON.parse(process.env.DB_SECRET_ARN);
  // palautetaan tietokannan tunnukset
  return {
    username: secretName.username,
    password: secretName.password,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dbname: process.env.DB_NAME,
  };
}

export default getDbCredentials;
// exportataan tunnustenhaku funktio
