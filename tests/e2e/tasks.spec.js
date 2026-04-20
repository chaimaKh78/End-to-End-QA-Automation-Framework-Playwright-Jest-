const { test, expect } = require('@playwright/test');

test.describe('TaskManager – Tests E2E', () => {
  test.beforeEach(async ({ request }) => {
    const tasks = await request.get('/api/tasks');
    const body = await tasks.json();
    for (const task of body.data) {
      await request.delete(`/api/tasks/${task.id}`);
    }
  });

  test('Affichage de la page principale', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/TaskManager/);
    await expect(page.locator('h1')).toContainText('Mes Tâches');
  });

  test('Créer une nouvelle tâche via formulaire', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid=task-title-input]', 'Tâche créée par Playwright');
    await page.selectOption('[data-testid=task-priority]', 'high');
    await page.click('[data-testid=create-task-btn]');
    await expect(page.locator('[data-testid=task-list]'))
      .toContainText('Tâche créée par Playwright');
  });

  test('Marquer une tâche comme terminée', async ({ page, request }) => {
    await request.post('/api/tasks', {
      data: { title: 'Tâche à terminer', status: 'todo' }
    });

    await page.goto('/');
    await page.click('[data-testid=task-done-btn]:first-child');
    await expect(page.locator('.task-done').first()).toBeVisible();
  });

test('Supprimer une tâche', async ({ page, request }) => {
  await request.post('/api/tasks', { data: { title: 'À supprimer' } });

  await page.goto('/');

  const taskItem = page.locator('li', { hasText: 'À supprimer' });
  await expect(taskItem).toBeVisible();

  // Ouvrir la modale
  await taskItem.getByRole('button', { name: 'Supprimer' }).click();

  // ✅ Attendre la modale via son texte
  const modal = page.locator('text=Supprimer la tâche ?');
  await expect(modal).toBeVisible();

  // ✅ Cliquer sur le bon bouton dans la modale
  await page.getByRole('button', { name: 'Supprimer' }).last().click();

  // Vérifier suppression
  await expect(taskItem).toHaveCount(0);
});
});
