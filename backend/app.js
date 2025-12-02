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
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
  origin: ['http://localhost:4200', 'https://d63upw3bx0q64.cloudfront.net'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/', hakuRouter);
app.use('/', ilmoitusRouter);
app.use('/', regRouter);
app.use('/', loginRouter);
export default app;
