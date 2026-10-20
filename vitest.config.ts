import {defineConfig} from 'vitest/config';
import {fileURLToPath,URL} from 'node:url';
const src=(p:string)=>fileURLToPath(new URL(p,import.meta.url));
export default defineConfig({test:{include:['tests/**/*.test.ts','tests/**/*.test.tsx']},resolve:{alias:{
 '@alienfishconsulting/surface-contracts':src('./packages/contracts/src/index.ts'),
 '@alienfishconsulting/surface-react-core':src('./packages/react-core/src/index.tsx'),
 '@alienfishconsulting/surface-react-data':src('./packages/react-data/src/index.tsx'),
 '@alienfishconsulting/surface-react-operations':src('./packages/react-operations/src/index.tsx'),
 '@alienfishconsulting/surface-react-ai':src('./packages/react-ai/src/index.tsx'),
 '@alienfishconsulting/surface-react-designers':src('./packages/react-designers/src/index.ts'),
 '@alienfishconsulting/surface-electron-bridge':src('./packages/electron-bridge/src/index.ts'),
 '@alienfishconsulting/surface-react-renderer':src('./packages/react-renderer/src/index.ts')
}}});
