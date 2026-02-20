
# Task Manager API

API REST de gestion de tâches construite avec Express.js,
gérée par PM2 et déployée via GitHub Actions.

## Prérequis

- Node.js >= 18
- npm >= 9
- PM2 installé globalement : `npm install -g pm2`

## Installation

```bash
git clone https://github.com/VOTRE-USER/task-manager-api.git
cd task-manager-api
npm install
cp .env.example .env
```

## Lancement

```bash
# Mode développement (PM2 + watch)
npm run dev

# Mode production
npm run prod

# Sans PM2
npm start
```

## Tests

```bash
npm test
```

## Endpoints

| Méthode | Route          | Description        |
|---------|-----------------|----------------------|
| GET    | /health        | Health check       |
| GET    | /api/tasks     | Liste des tâches    |
| POST   | /api/tasks     | Créer une tâche    |
| PUT    | /api/tasks/:id  | Modifier une tâche  |
| DELETE  | /api/tasks/:id  | Supprimer une tâche |

## Scripts PM2

| Commande       | Action                   |
|-----------------|--------------------------------|
| `npm run dev`   | Lancer en développement       |
| `npm run prod`  | Lancer en production         |
| `npm run reload` | Reload sans downtime         |
| `npm run logs`  | Afficher les logs           |
| `npm run monitor`| Dashboard PM2               |
| `npm run cleanup`| Supprimer le processus PM2   |

## Licence

MIT