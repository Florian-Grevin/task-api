/**
 * Middleware de logging des requêtes HTTP
 * Affiche : méthode, URL, code de statut, durée
 */
const logger = (req, res, next) => {
  const start = Date.now();

  // Intercepter la fin de la réponse
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const status = res.statusCode;

    // Coloriser le statut selon le code
    const statusColor = status >= 400 ? '❌' : '✅';

    console.log(
      `${statusColor} [${timestamp}] ${req.method} ${req.originalUrl} → ${status} (${duration}ms)`
    );
  });

  next();
};

module.exports = logger;