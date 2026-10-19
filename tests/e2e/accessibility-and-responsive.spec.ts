import {createRequire} from 'node:module';
import {expect,test} from '@playwright/test';

const require=createRequire(import.meta.url);
const axePath=require.resolve('axe-core/axe.min.js');

test('design lab has no serious or critical automated WCAG violations',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.addScriptTag({path:axePath});
  for(const mode of [{theme:'light',density:'comfortable',contrast:false},{theme:'dark',density:'compact',contrast:false},{theme:'light',density:'comfortable',contrast:true}]){
    await page.getByLabel('Theme').selectOption(mode.theme);
    await page.getByLabel('Density').selectOption(mode.density);
    await page.locator('.lab-page').evaluate((element,contrast)=>contrast?element.setAttribute('data-ui-contrast','high'):element.removeAttribute('data-ui-contrast'),mode.contrast);
    const violations=await page.evaluate(async()=>{
      const axe=(window as unknown as {axe:{run:(root:Document,options:unknown)=>Promise<{violations:Array<{id:string;impact:string|null;nodes:Array<{target:unknown;html:string;failureSummary:string}>}>}>}}).axe;
      const result=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});
      return result.violations.filter(item=>item.impact==='serious'||item.impact==='critical').map(item=>({id:item.id,impact:item.impact,nodes:item.nodes.map(node=>({target:node.target,html:node.html,failureSummary:node.failureSummary}))}));
    });
    expect(violations,JSON.stringify(mode)).toEqual([]);
  }
});

test('narrow layout avoids page-level horizontal overflow and retains keyboard focus',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});

test('forced-colors mode keeps controls visible and focusable',async({page,browserName})=>{
  test.skip(browserName!=='chromium','Forced-colors emulation is accepted in the Chromium shard.');
  await page.emulateMedia({forcedColors:'active'});
  await page.goto('/');
  const button=page.getByRole('button',{name:'Open focus dialog'});
  await expect(button).toBeVisible();
  await button.focus();
  await expect(button).toBeFocused();
});
