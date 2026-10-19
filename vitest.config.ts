import {defineConfig} from 'vitest/config';
import {fileURLToPath,URL} from 'node:url';
const src=(p:string)=>fileURLToPath(new URL(p,import.meta.url));
export default defineConfig({test:{include:['tests/**/*.test.ts','tests/**/*.test.tsx']},resolve:{alias:{
 '@enterprise-ui/contracts':src('./packages/contracts/src/index.ts'),
 '@enterprise-ui/react-core':src('./packages/react-core/src/index.tsx'),
 '@enterprise-ui/react-data':src('./packages/react-data/src/index.tsx'),
 '@enterprise-ui/react-operations':src('./packages/react-operations/src/index.tsx'),
 '@enterprise-ui/react-ai':src('./packages/react-ai/src/index.tsx'),
 '@enterprise-ui/react-designers':src('./packages/react-designers/src/index.ts'),
 '@enterprise-ui/electron-bridge':src('./packages/electron-bridge/src/index.ts'),
 '@enterprise-ui/react-renderer':src('./packages/react-renderer/src/index.ts')
}}});
