const express = require('express');
const router = express.Router();

// ══════════════════════════════════════════════
// Stockage en mémoire (remplacé par une BDD en prod)
// ══════════════════════════════════════════════
let tasks = [
  { id: 1, title: 'Configurer PM2', done: true },
  { id: 2, title: 'Écrire les routes API', done: false },
  { id: 3, title: 'Mettre en place GitHub Actions', done: false }
];
let nextId = 4;

// ══════════════════════════════════════════════
// GET /api/tasks — Lister toutes les tâches
// ══════════════════════════════════════════════
router.get('/', (req, res) => {
  // Filtrage optionnel par statut : ?done=true ou ?done=false
  const { done } = req.query;

  let result = tasks;
  if (done !== undefined) {
    result = tasks.filter(t => t.done === (done === 'true'));
  }

  res.json({
    count: result.length,
    tasks: result
  });
});

// ══════════════════════════════════════════════
// GET /api/tasks/:id — Obtenir une tâche par ID
// ══════════════════════════════════════════════
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({
      error: 'Tâche non trouvée',
      id: req.params.id
    });
  }

  res.json(task);
});

// ══════════════════════════════════════════════
// POST /api/tasks — Créer une nouvelle tâche
// ══════════════════════════════════════════════
router.post('/', (req, res) => {
  const { title } = req.body;

  // Validation
  if (!title || title.trim() === '') {
    return res.status(400).json({
      error: 'Le champ "title" est obligatoire'
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    done: false
  };

  tasks.push(newTask);

  // 201 Created — la ressource a été créée
  res.status(201).json(newTask);
});

// ══════════════════════════════════════════════
// PUT /api/tasks/:id — Modifier une tâche
// ══════════════════════════════════════════════
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({
      error: 'Tâche non trouvée',
      id: req.params.id
    });
  }

  // Mise à jour partielle (seuls les champs envoyés changent)
  const { title, done } = req.body;
  if (title !== undefined) task.title = title.trim();
  if (done !== undefined) task.done = Boolean(done);

  res.json(task);
});

// ══════════════════════════════════════════════
// DELETE /api/tasks/:id — Supprimer une tâche
// ══════════════════════════════════════════════
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      error: 'Tâche non trouvée',
      id: req.params.id
    });
  }

  const deleted = tasks.splice(index, 1)[0];

  res.json({
    message: 'Tâche supprimée',
    task: deleted
  });
});

module.exports = router;