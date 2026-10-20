import {existsSync,mkdirSync,readdirSync,readFileSync,rmSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const releaseDirectory=resolve(root,'.release');
const packages=['tokens','contracts','react-core','react-data','react-operations','react-ai','react-designers','react-renderer','electron-bridge'];
const expectedPrefix='@alienfishconsulting/surface-';

rmSync(releaseDirectory,{recursive:true,force:true});
mkdirSync(releaseDirectory,{recursive:true});

for(const directory of packages){
  const packageRoot=resolve(root,'packages',directory);
  const manifest=JSON.parse(readFileSync(resolve(packageRoot,'package.json'),'utf8'));
  if(manifest.name!==`${expectedPrefix}${directory}`)throw new Error(`Unexpected package identity for ${directory}: ${manifest.name}`);
  if(manifest.version!=='1.0.0')throw new Error(`All v1 packages must be version 1.0.0: ${manifest.name}`);
  if(manifest.private===true)throw new Error(`Publishable package is still private: ${manifest.name}`);
  if(manifest.license!=='SEE LICENSE IN LICENSE.md')throw new Error(`Missing proprietary license declaration: ${manifest.name}`);
  if(!existsSync(resolve(packageRoot,'LICENSE.md')))throw new Error(`Missing generated package license: ${manifest.name}`);
  if(!existsSync(resolve(packageRoot,'dist/index.js')) || !existsSync(resolve(packageRoot,'dist/index.d.ts')))
    throw new Error(`Build output is incomplete: ${manifest.name}`);
  const outputs=readdirSync(resolve(packageRoot,'dist'),{recursive:true}).map(String);
  if(outputs.some(path=>path.includes('stories/')))throw new Error(`Storybook output leaked into ${manifest.name}`);

  const packed=spawnSync('corepack',['pnpm','--filter',manifest.name,'pack','--pack-destination',releaseDirectory],{
    cwd:root,
    encoding:'utf8',
    stdio:'inherit',
  });
  if(packed.status!==0)throw new Error(`Packing failed: ${manifest.name}`);
}

const archives=readdirSync(releaseDirectory).filter(file=>file.endsWith('.tgz')).sort();
if(archives.length!==packages.length)throw new Error(`Expected ${packages.length} tarballs, found ${archives.length}`);
console.log(`Packed ${archives.length} Surface packages in ${releaseDirectory}`);
