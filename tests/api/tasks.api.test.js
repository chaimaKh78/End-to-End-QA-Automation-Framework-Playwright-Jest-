const request = require('supertest');
const app = require('../../src/app');

describe('API /api/tasks – Tests Intégration', () => {
  describe('GET /api/tasks', () => {
    test('200 – retourne une liste vide', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
    });
  });

  describe('POST /api/tasks', () => {
    test('201 – crée une tâche', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test CI/CD', priority: 'high' });

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe('Test CI/CD');
      expect(res.body.data.id).toBeDefined();
    });

    test('400 – rejette titre manquant', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: '' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    test('200 – met à jour une tâche existante', async () => {
      const created = await request(app)
        .post('/api/tasks')
        .send({ title: 'À modifier' });

      const id = created.body.data.id;

      const res = await request(app)
        .put(`/api/tasks/${id}`)
        .send({ status: 'in-progress' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('in-progress');
    });

    test('404 – id inexistant', async () => {
      const res = await request(app)
        .put('/api/tasks/9999')
        .send({ status: 'done' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    test('200 – supprime une tâche', async () => {
      const created = await request(app)
        .post('/api/tasks')
        .send({ title: 'À supprimer' });

      const id = created.body.data.id;
      const res = await request(app).delete(`/api/tasks/${id}`);
      expect(res.status).toBe(200);
    });
  });
});
