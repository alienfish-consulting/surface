import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {describe,expect,test} from 'vitest';

const root=resolve(import.meta.dirname,'..');
const packages=['tokens','contracts','react-core','react-data','react-operations','react-ai','react-designers','react-renderer','electron-bridge'];

describe('package exports',()=>{
  test.each(packages)('%s exposes built ESM and declarations',name=>{
    const directory=resolve(root,'packages',name);
    const manifest=JSON.parse(readFileSync(resolve(directory,'package.json'),'utf8')) as {type:string;main:string;types:string;exports:Record<string,unknown>};
    expect(manifest.type).toBe('module');
    expect(manifest.exports['.']).toBeTruthy();
    expect(manifest.main).toBe('./dist/index.js');
    expect(manifest.types).toBe('./dist/index.d.ts');
    expect(existsSync(resolve(directory,'dist/index.js'))).toBe(true);
    expect(existsSync(resolve(directory,'dist/index.d.ts'))).toBe(true);
    expect(existsSync(resolve(directory,'LICENSE.md'))).toBe(true);
    expect(readdirSync(resolve(directory,'dist'),{recursive:true}).map(String).some(path=>path.includes('stories/'))).toBe(false);
  });

  test('browser package manifests do not depend on Electron',()=>{
    for(const name of packages.filter(name=>name!=='electron-bridge')){
      const manifest=readFileSync(resolve(root,'packages',name,'package.json'),'utf8');
      expect(manifest.toLowerCase()).not.toContain('"electron"');
    }
    const bridgeSource=readFileSync(resolve(root,'packages/electron-bridge/src/index.ts'),'utf8');
    expect(bridgeSource).not.toMatch(/from ['"]electron['"]/);
  });
});
