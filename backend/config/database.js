import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import dotenv from 'dotenv';
dotenv.config();

const isDev = process.env.NODE_ENV !== 'production';
const client = new SecretsManagerClient({ region: 'eu-north-1' });
async function getDbCredentials() {
  if (isDev) {
    return {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dbname: process.env.DB_NAME,
    };
  }

  const secretName = process.env.DB_SECRET_ARN;
  const data = await client.send(
    new GetSecretValueCommand({ SecretId: secretName })
  );
  const secret = JSON.parse(data.SecretString);
  console.log(secret);
  const host = process.env.DB_HOST;
  const port = Number(process.env.DB_PORT) || 5432;
  const dbname = process.env.DB_NAME;
  return {
    username: secret.username,
    password: secret.password,
    host: host,
    port: port,
    dbname: dbname,
  };
}

export default getDbCredentials;
