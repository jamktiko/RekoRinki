// server.js
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3000;

app.get('/test-db', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306
        });

        const [rows] = await connection.query('SELECT 1 AS test');
        await connection.end();

        res.json({ success: true, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});