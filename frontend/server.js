import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Palvelee staattisia build-tiedostoja
app.use(express.static(path.join(__dirname, "dist")));

// Proxy backendille /test-db
app.use('/test-db', createProxyMiddleware({
  target: `http://localhost:${process.env.PORT_BACKEND || 3000}`,
  changeOrigin: true
}));

// Kaikki muut pyynnöt ohjataan index.html:ään (Svelte)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});