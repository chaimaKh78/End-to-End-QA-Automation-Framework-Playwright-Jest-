const tasks = new Map();
let nextId = 1;

const ALLOWED_STATUS = new Set(['todo', 'in-progress', 'done']);
const ALLOWED_PRIORITY = new Set(['low', 'medium', 'high']);

function normalizeStatus(status) {
  return ALLOWED_STATUS.has(status) ? status : 'todo';
}

function normalizePriority(priority) {
  return ALLOWED_PRIORITY.has(priority) ? priority : 'medium';
}

const taskService = {
  getAll: () => Array.from(tasks.values()).sort((a, b) => a.id - b.id),

  getById: (id) => tasks.get(Number(id)) || null,

  create: (data = {}) => {
    const title = String(data.title || '').trim();
    if (!title) {
      throw new Error('Le titre est obligatoire');
    }

    const now = new Date().toISOString();
    const task = {
      id: nextId++,
      title,
      status: normalizeStatus(data.status),
      priority: normalizePriority(data.priority),
      createdAt: now,
      updatedAt: now
    };

    tasks.set(task.id, task);
    return task;
  },

  update: (id, data = {}) => {
    const task = tasks.get(Number(id));
    if (!task) return null;

    const updated = {
      ...task,
      ...data,
      id: task.id,
      title: data.title !== undefined ? String(data.title).trim() || task.title : task.title,
      status: data.status !== undefined ? normalizeStatus(data.status) : task.status,
      priority: data.priority !== undefined ? normalizePriority(data.priority) : task.priority,
      updatedAt: new Date().toISOString()
    };

    tasks.set(task.id, updated);
    return updated;
  },

  delete: (id) => tasks.delete(Number(id)),

  reset: () => {
    tasks.clear();
    nextId = 1;
  }
};

module.exports = taskService;
