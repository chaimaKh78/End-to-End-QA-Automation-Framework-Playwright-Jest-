const taskService = require('../../src/services/taskService');

describe('TaskService – Tests Unitaires', () => {
  describe('create()', () => {
    test('doit créer une tâche avec les champs par défaut', () => {
      const task = taskService.create({ title: 'Nouvelle tâche' });
      expect(task).toMatchObject({
        id: expect.any(Number),
        title: 'Nouvelle tâche',
        status: 'todo',
        priority: 'medium'
      });
    });

    test('doit rejeter un titre vide', () => {
      expect(() => taskService.create({ title: '' }))
        .toThrow('Le titre est obligatoire');
    });

    test('doit accepter une priorité haute', () => {
      const task = taskService.create({ title: 'Urgent', priority: 'high' });
      expect(task.priority).toBe('high');
    });
  });

  describe('getAll()', () => {
    test('doit retourner un tableau vide initialement', () => {
      expect(taskService.getAll()).toEqual([]);
    });

    test('doit retourner toutes les tâches créées', () => {
      taskService.create({ title: 'Tâche 1' });
      taskService.create({ title: 'Tâche 2' });
      expect(taskService.getAll()).toHaveLength(2);
    });
  });

  describe('update()', () => {
    test('doit mettre à jour le statut', () => {
      const task = taskService.create({ title: 'À faire' });
      const updated = taskService.update(task.id, { status: 'done' });
      expect(updated.status).toBe('done');
    });

    test('doit retourner null pour un id inexistant', () => {
      expect(taskService.update(9999, { status: 'done' })).toBeNull();
    });
  });

  describe('delete()', () => {
    test('doit supprimer une tâche existante', () => {
      const task = taskService.create({ title: 'À supprimer' });
      expect(taskService.delete(task.id)).toBe(true);
      expect(taskService.getById(task.id)).toBeNull();
    });
  });
});
