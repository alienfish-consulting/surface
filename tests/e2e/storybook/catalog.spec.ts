import {createRequire} from 'node:module';
import {expect,test} from '@playwright/test';
import {openStory} from './helpers.js';

const require=createRequire(import.meta.url);
const axePath=require.resolve('axe-core/axe.min.js');

interface StoryIndexEntry {id:string;title:string;name:string;type:string}

test('every Storybook story mounts and has no serious or critical automated WCAG violations',async({page,request,browserName})=>{
  test.skip(browserName!=='chromium','The complete catalog scan runs once in Chromium; interaction shards cover all three engines.');
  test.setTimeout(180_000);

  const indexResponse=await request.get('/index.json');
  expect(indexResponse.ok()).toBe(true);
  const index=await indexResponse.json() as {entries:Record<string,StoryIndexEntry>};
  const stories=Object.values(index.entries).filter(entry=>entry.type==='story').sort((a,b)=>a.id.localeCompare(b.id));
  expect(stories.length).toBeGreaterThan(0);

  const runtimeErrors:Array<{story:string;message:string}>=[];
  let currentStory='catalog';
  page.on('pageerror',error=>runtimeErrors.push({story:currentStory,message:String(error)}));
  page.on('console',message=>{if(message.type()==='error')runtimeErrors.push({story:currentStory,message:message.text()})});
  const accessibilityFailures:Array<{story:string;violations:unknown[]}>=[];

  for(const story of stories){
    currentStory=story.id;
    await openStory(page,story.id);
    await page.addScriptTag({path:axePath});
    const violations=await page.locator('#storybook-root').evaluate(async root=>{
      const axe=(window as unknown as {axe:{run:(root:Element,options:unknown)=>Promise<{violations:Array<{id:string;impact:string|null;nodes:Array<{target:unknown;failureSummary:string}>}>}>}}).axe;
      const result=await axe.run(root,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});
      return result.violations
        .filter(item=>item.impact==='serious'||item.impact==='critical')
        .map(item=>({id:item.id,impact:item.impact,nodes:item.nodes.map(node=>({target:node.target,failureSummary:node.failureSummary}))}));
    });
    if(violations.length)accessibilityFailures.push({story:story.id,violations});
  }

  expect(runtimeErrors).toEqual([]);
  expect(accessibilityFailures).toEqual([]);
});
