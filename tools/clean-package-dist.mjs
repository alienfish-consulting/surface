import {rmSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const allowed=new Set(['tokens','contracts','react-core','react-data','react-operations','react-ai','react-designers','react-renderer','electron-bridge']);
const packageName=process.argv[2];

if(!packageName || !allowed.has(packageName))throw new Error(`Unknown package build target: ${packageName??'<missing>'}`);

const packageRoot=resolve(root,'packages',packageName);
const destination=resolve(packageRoot,'dist');
if(dirname(destination)!==packageRoot)throw new Error('Refusing to clean a path outside the selected package');

rmSync(destination,{recursive:true,force:true});
