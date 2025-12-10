// Importoidaan reitit, tietokantayhteys, sekä tarvittavvat moduulit
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import './dbconnection.js';
import indexRouter from './routes/index.js';
import hakuRouter from './routes/haku.js';
import ilmoitusRouter from './routes/ilmoitus.js';
import regRouter from './routes/reg.js';
import loginRouter from './routes/login.js';
import uusitilausRouter from './routes/uusiTilaus.js';
// Ladataan ympäristömuuttujat .env tiedostosta
dotenv.config();
// Luodaan app muuttuja, jonka arvo on express
const app = express();
// Selvitetään nykyisen tiedoston nimi ja sijainti
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Määritellään corsoption metodit. Määritelyssä kehitysympäristön portiksi määritellään 4200 ja määritellään myös tuotantoympäristön osoite. Määritellään myös metodit joita käytettävät metodit jotka get, put, post ja delete
const corsOptions = {
  origin: ['http://localhost:4200', 'https://d63upw3bx0q64.cloudfront.net'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
};
// määritellään, että app käyttää cors metodia
app.use(cors(corsOptions));
// Määritellään, että käytettään loggeria http pyyntöihin
app.use(logger('dev'));
// Mahdollistetaan json muotoisen datan käyttö http pyynnöissä
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// mahdollistetaan evästeiden käsittely
app.use(cookieParser());
// hakemisto staattisille tiedostoille
app.use(express.static(path.join(__dirname, 'public')));
// Liitetään reitit sovellukseen
app.use('/', indexRouter);
app.use('/', hakuRouter);
app.use('/', ilmoitusRouter);
app.use('/', regRouter);
app.use('/', loginRouter);
app.use('/', uusitilausRouter);
// Exportataan app-tiedosto
export default app;
