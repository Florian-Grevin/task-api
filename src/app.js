const express = require('express');
const logger = require('./middleware/logger');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globaux ──
app.use(express.json());       // Parser le JSON
app.use(logger);               // Logger chaque requête

// ── Routes ──
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    app: 'TaskAPI',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks',
      health: '/'
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use('/api/tasks', tasksRouter);  // Monter les routes CRUD

// ── Gestion des routes inexistantes ──
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.originalUrl,
    hint: 'Consultez GET / pour la liste des endpoints'
  });
});

// ── Gestion globale des erreurs ──
app.use((err, req, res, next) => {
  console.error('[TaskAPI] Erreur non gérée :', err.message);
  res.status(500).json({
    error: 'Erreur interne du serveur'
  });
});

// ── Démarrer le serveur ──
app.listen(PORT, () => {
  console.log(`[TaskAPI] Serveur démarré sur le port ${PORT}`);
  console.log(`[TaskAPI] Environnement : ${process.env.NODE_ENV || 'development'}`);
  console.log(`[TaskAPI] Routes : GET / | CRUD /api/tasks`);
});