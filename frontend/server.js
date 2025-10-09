const express = require('express');
const path = require('path');
const app = express();
const distPath = path.join(__dirname, 'dist', 'browser');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));