const mysql = require('mysql2');
require('dotenv').config();
const conn = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'rekorinki',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
conn.connect((err) => {
  if (err) {
    return console.error('MySQL yhteysvirhe: ' + err.message);
  }
  console.log('Yhteys MySQL-kantaan toimii!');
});

module.exports = conn;
