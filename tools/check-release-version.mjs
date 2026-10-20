import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const directories=['tokens','contracts','react-core','react-data','react-operations','react-ai','react-designers','react-renderer','electron-bridge'];
const rootVersion=JSON.parse(readFileSync(resolve(root,'package.json'),'utf8')).version;
const tag=process.argv[2];

if(tag && tag!==`v${rootVersion}`)throw new Error(`Tag ${tag} does not match workspace version v${rootVersion}`);
for(const directory of directories){
  const manifest=JSON.parse(readFileSync(resolve(root,'packages',directory,'package.json'),'utf8'));
  if(manifest.version!==rootVersion)throw new Error(`${manifest.name} is ${manifest.version}; expected ${rootVersion}`);
}
console.log(`Release versions are coordinated at ${rootVersion}`);
