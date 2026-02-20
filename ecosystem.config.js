module.exports = {
  apps: [
    {
      name: 'task-api',
      script: 'src/index.js',

      // ─── Mode d'exécution ───
      exec_mode: 'cluster',
      instances: 'max',  // Utilise tous les cœurs CPU

      // ─── Surveillance fichiers ───
      watch: true,
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs', '.git'],

      // ─── Logs ───
      out_file: './logs/app-out.log',
      error_file: './logs/app-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // ─── Redémarrage automatique ───
      max_memory_restart: '200M',
      restart_delay: 3000,
      max_restarts: 10,

      // ─── Environnements ───
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 4000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080
      }
    }
  ]
};