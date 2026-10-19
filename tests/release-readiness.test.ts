import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {describe,expect,test} from 'vitest';
import {declarativeExceptions,registry} from '@enterprise-ui/contracts';
import {defaultAdapters} from '@enterprise-ui/react-renderer';

const root=resolve(import.meta.dirname,'..');
const catalog=JSON.parse(readFileSync(resolve(root,'catalog/components.v1.json'),'utf8')) as {components:Array<{id:string;lifecycleState:string;declarativeRequirement:string}>};

describe('v1 release ledger',()=>{
  test('freezes all 198 accepted units as verified',()=>{
    expect(catalog.components).toHaveLength(198);
    expect(new Set(catalog.components.map(item=>item.id)).size).toBe(198);
    expect(catalog.components.every(item=>item.lifecycleState==='verified')).toBe(true);
  });
  test('accounts for every unit through a runtime adapter or documented JSX exception',()=>{
    const exceptions=new Set(declarativeExceptions.map(item=>item.type));
    expect(registry.size).toBe(190);
    expect(exceptions.size).toBe(8);
    expect(registry.size+exceptions.size).toBe(198);
    expect([...registry.keys()].filter(type=>!defaultAdapters.has(type))).toEqual([]);
    expect(catalog.components.filter(item=>item.declarativeRequirement==='required-or-documented-exception').map(item=>item.id).sort()).toEqual([...exceptions].sort());
  });
  test('retains local-only release identity',()=>{
    const rootManifest=JSON.parse(readFileSync(resolve(root,'package.json'),'utf8')) as {private:boolean;version:string};
    expect(rootManifest).toMatchObject({private:true,version:'0.0.0-private'});
  });
});
