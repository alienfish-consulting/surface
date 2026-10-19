import { expect, test } from '@playwright/test';

test('design lab renders the existing POC and exposes local display controls', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Schema-first Design Lab' })).toBeVisible();
  await expect(page.getByText('DECLARATIVE RUNTIME')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Proposal review' })).toBeVisible();

  await page.getByLabel('Theme').selectOption('dark');
  await expect(page.locator('[data-ui-theme="dark"]')).toBeVisible();

  await page.getByLabel('Density').selectOption('compact');
  await expect(page.locator('[data-ui-density="compact"]')).toBeVisible();
});
