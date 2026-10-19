import {expect,type Page} from '@playwright/test';

export async function openStory(page:Page,id:string){
  const response=await page.goto(`/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`,{waitUntil:'domcontentloaded'});
  expect(response?.ok(),`Story request failed: ${id}`).toBe(true);
  await expect(page.locator('#storybook-root')).toBeVisible();
  await expect(page.locator('.sb-errordisplay')).toBeHidden();
}
