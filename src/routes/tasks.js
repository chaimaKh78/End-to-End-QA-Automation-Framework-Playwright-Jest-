const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

router.get('/', (req, res) => {
  const tasks = taskService.getAll();
  res.json({ success: true, data: tasks, count: tasks.length });
});

router.get('/:id', (req, res) => {
  const task = taskService.getById(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
  }
  res.json({ success: true, data: task });
});

router.post('/', (req, res) => {
  try {
    const task = taskService.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/:id', (req, res) => {
  const task = taskService.update(req.params.id, req.body);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
  }
  res.json({ success: true, data: task });
});

router.delete('/:id', (req, res) => {
  const deleted = taskService.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
  }
  res.json({ success: true, message: 'Tâche supprimée' });
});

module.exports = router;
