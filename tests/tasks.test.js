const request = require('supertest');
const app = require('../src/app');

// ─────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────
describe('GET /health', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('timestamp');
  });
});

// ─────────────────────────────────────────
// GET /api/tasks — Liste des tâches
// ─────────────────────────────────────────
describe('GET /api/tasks', () => {
  it('should return an array of tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('tasks');
    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(res.body).toHaveProperty('count');
  });
});

// ─────────────────────────────────────────
// POST /api/tasks — Création d'une tâche
// ─────────────────────────────────────────
describe('POST /api/tasks', () => {
  it('should create a new task', async () => {
    const newTask = { title: 'Test task', description: 'Created by Jest' };
    const res = await request(app)
      .post('/api/tasks')
      .send(newTask);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body).toHaveProperty('id');
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'No title' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

// ─────────────────────────────────────────
// PUT /api/tasks/:id — Modification
// ─────────────────────────────────────────
describe('PUT /api/tasks/:id', () => {
  it('should update an existing task', async () => {
    // D'abord créer une tâche
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'To update' });

    // Puis la modifier
    const res = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ title: 'Updated!', completed: true });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated!');
  });

  it('should return 404 for non-existent task', async () => {
    const res = await request(app)
      .put('/api/tasks/999999')
      .send({ title: 'Nope' });
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────
// DELETE /api/tasks/:id — Suppression
// ─────────────────────────────────────────
describe('DELETE /api/tasks/:id', () => {
  it('should delete an existing task', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'To delete' });

    const res = await request(app)
      .delete(`/api/tasks/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted|supprimée/i);
  });

  it('should return 404 for non-existent task', async () => {
    const res = await request(app)
      .delete('/api/tasks/999999');
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────
// 404 — Route inexistante
// ─────────────────────────────────────────
describe('404 handling', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
  });
});