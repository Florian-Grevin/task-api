
const express = require('express');
const app = express();

// Le port vient de l'environnement PM2 (ou fallback 3000)
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// ... (vos routes CRUD restent identiques) ...

// Afficher l'environnement au démarrage
app.listen(PORT, () => {
  console.log(`🚀 Task API running on port ${PORT} [${ENV}]`);
  console.log(`📡 PID: ${process.pid}`);
});