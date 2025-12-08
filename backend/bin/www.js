#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config;
//Tuodaan. env tiedosto ja ladataan ympäristömuuttujat .env tiedostosta
// Tuodaan app tiedosto
import app from '../app.js';
// tuodaan dbug kirjasto, sekä http
import debugLib from 'debug';
import http from 'http';
// Luodaan nimiavaruus debuggausta varten
const debug = debugLib('restapi:server');
// Haetaan portti ympäristö muuttujista, tai käytetään porttia 3000 oletuksena
const port = normalizePort(process.env.BACKEND_PORT || '3000');
app.set('port', port);
// Luodaan http serveri
const server = http.createServer(app);
// Määritellään, että palvelin kuuntelee kaikkia verkkoosoitteita
server.listen(port, '0.0.0.0');
// luodaan virheen käsitteliä
server.on('error', onError);
// Luodaan kuuntelukäsitteliä
server.on('listening', onListening);
// luodaan portin normalisointi funktio
function normalizePort(val) {
  // otetaan funktion arvo port muuttujaan
  const port = parseInt(val, 10);
  // Tarkistetaan, että portti on numeerinen
  if (isNaN(port)) {
    return val;
  }

  // Tarkistetaan, että porttinumero on kelvollinen
  if (port >= 0) {
    return port;
  }

  return false;
}
// Virheenkäsittely funktio, joka heittää virheen
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // luodaan porttiin liittyvät virheviestit
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
// Luodaan listening funktio
function onListening() {
  // Haetaan palvelimen osoitetiedot
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
