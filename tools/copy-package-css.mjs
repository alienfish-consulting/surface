import {copyFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';

const packageName=process.argv[2];
if(!/^[a-z][a-z0-9-]*$/.test(packageName??''))throw new Error('Expected a safe package directory name');
const root=resolve(import.meta.dirname,'..');
const packageRoot=resolve(root,'packages',packageName);
mkdirSync(resolve(packageRoot,'dist'),{recursive:true});
copyFileSync(resolve(packageRoot,'src/styles.css'),resolve(packageRoot,'dist/styles.css'));
