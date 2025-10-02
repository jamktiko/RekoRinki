const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Palvelee Angular buildin dist-kansion
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));

// JSON body parser
app.use(bodyParser.json());

// API-endpoint
app.post('/api/greet', (req, res) => {
  const name = req.body.name || 'Guest';
  res.json({ message: `Hello ${name}! Welcome to Elastic Beanstalk!` });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));