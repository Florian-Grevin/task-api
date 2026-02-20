# TaskAPI

API REST de gestion de tâches — Projet fil rouge CI/CD.

## Lancement

```bash
npm install
npm start          # Production
npm run dev         # Développement (auto-reload)
pm2 start ecosystem.config.js  # Via PM2
```

## Endpoints

| Méthode | Route        | Description           |
|---------|-------------|----------------------|
| GET     | /           | Health check          |
| GET     | /api/tasks  | Lister les tâches     |
| POST    | /api/tasks  | Créer une tâche       |
| PUT     | /api/tasks/:id | Modifier une tâche |
| DELETE  | /api/tasks/:id | Supprimer une tâche|