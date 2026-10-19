import {expect,test} from '@playwright/test';

test('foundational controls support keyboard selection, dialog focus, and dock toggles',async({page})=>{
  await page.goto('/');
  const combo=page.getByLabel('Environment');
  await combo.focus();
  await combo.fill('stag');
  await expect(combo).toHaveValue('stag');

  await page.getByRole('button',{name:'Open focus dialog'}).click();
  const dialog=page.getByRole('dialog',{name:'Confirm deployment'});
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button',{name:'Close dialog'})).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  const startToggle=page.getByRole('button',{name:'Start panel'});
  await expect(page.getByText('Explorer',{exact:true})).toBeVisible();
  await startToggle.click();
  await expect(page.getByText('Explorer',{exact:true})).toBeHidden();
  await expect(startToggle).toHaveAttribute('aria-pressed','false');
});
