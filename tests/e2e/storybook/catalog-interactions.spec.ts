import {expect,test} from '@playwright/test';
import {openStory} from './helpers.js';

test('data visualization primitive exposes its status content',async({page})=>{
  await openStory(page,'data-visualization-primitives--default');
  const tooltip=page.getByRole('status');
  await expect(tooltip).toContainText('Current requests');
  await expect(tooltip).toContainText('1,284');
});

test('operations event filters and live state remain browser-operable',async({page})=>{
  await openStory(page,'operations-events-and-incidents--events');
  const query=page.getByLabel('Filter events');
  await query.fill('capacity');
  await expect(query).toHaveValue('capacity');
  const severity=page.getByLabel('Severity');
  await severity.selectOption('danger');
  await expect(severity).toHaveValue('danger');
  await expect(page.getByRole('region',{name:'Filtered events'})).toContainText('reconnecting');
});

test('AI approval and prompt stories expose governed interactions',async({page})=>{
  await openStory(page,'ai-execution-details--approval-and-artifacts');
  await expect(page.getByRole('button',{name:'Approve'})).toBeVisible();
  await expect(page.getByText('change-summary.md')).toBeVisible();

  await openStory(page,'ai-execution-details--prompt-and-reasoning');
  const prompt=page.getByLabel('Prompt template');
  await prompt.fill('Summarize the incident with cited evidence.');
  await expect(prompt).toHaveValue('Summarize the incident with cited evidence.');
  await expect(page.getByRole('button',{name:'Save template'})).toBeVisible();
});

test('designer specialist story supports binding and proposal editing',async({page})=>{
  await openStory(page,'designers-specialists--form-authoring');
  const pointer=page.getByLabel('JSON pointer');
  await pointer.fill('/displayName');
  await expect(pointer).toHaveValue('/displayName');
  const proposed=page.getByLabel('Proposed value');
  await proposed.fill('Customer account');
  await page.getByRole('button',{name:'Review proposal'}).click();
  await expect(page.getByText('Change account.title')).toBeVisible();
  await expect(page.getByRole('button',{name:'Wider'})).toBeVisible();
});
