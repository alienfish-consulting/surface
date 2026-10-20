import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {describe,expect,test} from 'vitest';
import {declarativeExceptions,registry} from '@alienfishconsulting/surface-contracts';
import {defaultAdapters} from '@alienfishconsulting/surface-react-renderer';

const root=resolve(import.meta.dirname,'..');
const packageDirectories=['tokens','contracts','react-core','react-data','react-operations','react-ai','react-designers','react-renderer','electron-bridge'];
const reactPackages=packageDirectories.filter(name=>name.startsWith('react-'));
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
  test('keeps the workspace private while coordinating public proprietary packages',()=>{
    const rootManifest=JSON.parse(readFileSync(resolve(root,'package.json'),'utf8')) as {private:boolean;version:string};
    expect(rootManifest).toMatchObject({private:true,version:'1.0.0'});
    for(const directory of packageDirectories){
      const manifest=JSON.parse(readFileSync(resolve(root,'packages',directory,'package.json'),'utf8')) as Record<string,unknown>;
      expect(manifest).toMatchObject({
        name:`@alienfishconsulting/surface-${directory}`,
        version:'1.0.0',
        license:'SEE LICENSE IN LICENSE.md',
        publishConfig:{access:'public',registry:'https://registry.npmjs.org/'},
      });
      expect(manifest.private).not.toBe(true);
      expect(manifest.files).toEqual(expect.arrayContaining(['dist','README.md','LICENSE.md']));
    }
  });
  test('supports both qualified React generations',()=>{
    for(const directory of reactPackages){
      const manifest=JSON.parse(readFileSync(resolve(root,'packages',directory,'package.json'),'utf8')) as {peerDependencies:{react:string}};
      expect(manifest.peerDependencies.react).toBe('^18.2.0 || ^19.0.0');
    }
  });
});
