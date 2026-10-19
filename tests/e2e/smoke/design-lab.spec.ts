import { expect, test } from '@playwright/test';

test('design lab renders a complete dashboard and exposes local display controls', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Operations overview', level: 1 })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Overview' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByText('Monthly revenue', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Customer accounts' }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Schema-first Design Lab' })).toBeVisible();
  await expect(page.getByText('DECLARATIVE RUNTIME')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Proposal review' })).toBeVisible();
  await expect(page.getByText('browser fallback (unavailable)',{exact:true})).toBeVisible();

  await page.getByLabel('Theme').selectOption('dark');
  await expect(page.locator('.lab-page[data-ui-theme="dark"]')).toBeVisible();

  await page.getByLabel('Density').selectOption('compact');
  await expect(page.locator('[data-ui-density="compact"]')).toBeVisible();

  const grid = page.getByRole('region', { name: 'Customer accounts' });
  await expect(grid.getByRole('table')).toBeVisible();
  await expect(grid.getByText('Acme Manufacturing')).toBeVisible();
  await grid.getByRole('button', { name: 'Customer', exact: true }).click();
  await expect(grid.getByRole('columnheader', { name: 'Customer' })).toHaveAttribute('aria-sort', 'descending');
  await page.getByLabel('Filter customers').fill('globex');
  await expect(grid.getByText('Globex')).toBeVisible();
  await expect(grid.getByText('Acme Manufacturing')).toHaveCount(0);

  const operations = page.getByRole('region', { name: 'Operations specimen' });
  await expect(operations.getByText('reconnecting')).toBeVisible();
  await operations.getByRole('button', { name: 'Deny' }).click();
  await expect(operations.getByRole('status').last()).toHaveText('deny requested for revision 4');
  const agentReview = page.getByRole('region', { name: 'Agent review specimen' });
  await agentReview.getByRole('button', { name: 'Deny' }).click();
  await expect(agentReview.getByRole('status')).toHaveText('deny intention sent to host');
});

test('designer proposals support reject, stale detection, and approved commit', async ({page}) => {
  await page.goto('/');
  const proposedValue=page.getByLabel('Proposed value');
  const review=page.getByRole('region',{name:'Proposal review'});

  await proposedValue.fill('Rejected title');
  await page.getByRole('button',{name:'Review proposal'}).click();
  await review.getByRole('button',{name:'Reject',exact:true}).click();
  await expect(review.getByRole('status')).toHaveText('Human rejected proposal. Document unchanged.');
  await expect(page.getByText('rev 1',{exact:true})).toBeVisible();

  await proposedValue.fill('Stale title');
  await page.getByRole('button',{name:'Review proposal'}).click();
  await review.getByRole('button',{name:'Simulate concurrent revision'}).click();
  await expect(review.getByRole('alert')).toContainText('revision');
  await review.getByRole('button',{name:'Discard stale proposal'}).click();
  await expect(page.getByText('rev 2',{exact:true})).toBeVisible();

  await proposedValue.fill('Approved title');
  await page.getByRole('button',{name:'Review proposal'}).click();
  await review.getByRole('button',{name:'Request host approval'}).click();
  await expect(review.getByRole('status')).toHaveText('Host authorized and committed new document revision.');
  await expect(page.getByText('rev 3',{exact:true})).toBeVisible();
  await expect(page.locator('.lab-studio-main .ui-shell-header').getByText('Approved title',{exact:true})).toBeVisible();
});
