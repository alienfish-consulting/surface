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

  const grid = page.getByRole('region', { name: 'Customer accounts' });
  await expect(grid.getByRole('table')).toBeVisible();
  await expect(grid.getByText('Acme Manufacturing')).toBeVisible();
  await grid.getByRole('button', { name: 'Customer' }).click();
  await expect(grid.getByRole('columnheader', { name: 'Customer' })).toHaveAttribute('aria-sort', 'descending');
  await page.getByLabel('Filter customers').fill('globex');
  await expect(grid.getByText('Globex')).toBeVisible();
  await expect(grid.getByText('Acme Manufacturing')).toHaveCount(0);

  const operations = page.getByRole('region', { name: 'Operations specimen' });
  await expect(operations.getByText('reconnecting')).toBeVisible();
  await operations.getByRole('button', { name: 'Deny' }).click();
  await expect(operations.getByRole('status').last()).toHaveText('deny requested for revision 4');
});
