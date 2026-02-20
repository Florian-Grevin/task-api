const express = require('express');

// Créer l'application Express
const app = express();

// Port configurable via variable d'environnement
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// ── Route de health check ──
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    app: 'TaskAPI',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ── Démarrer le serveur ──
app.listen(PORT, () => {
  console.log(`[TaskAPI] Serveur démarré sur le port ${PORT}`);
  console.log(`[TaskAPI] Environnement : ${process.env.NODE_ENV || 'development'}`);
});