import {copyFileSync,mkdirSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(resolve(root,'packages/react-core/dist'),{recursive:true});
copyFileSync(resolve(root,'packages/react-core/src/styles.css'),resolve(root,'packages/react-core/dist/styles.css'));
