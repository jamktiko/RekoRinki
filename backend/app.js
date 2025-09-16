const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./dbconnection');

const indexRouter = require('./routes/index');
const messagesRouter = require('./routes/messages');

const app = express();

// CORS
const corsOptions = {
  origin: '*', // Productionissa kannattaa rajata domainiin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middlewaret
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Staattiset tiedostot (frontend build)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/messages', messagesRouter);

// Portti
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
