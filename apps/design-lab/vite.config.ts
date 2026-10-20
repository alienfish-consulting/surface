import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath,URL} from 'node:url';
const src=(p:string)=>fileURLToPath(new URL(p,import.meta.url));
export default defineConfig({
 plugins:[react()],
 resolve:{alias:{
  '@alienfishconsulting/surface-contracts':src('../../packages/contracts/src/index.ts'),
  '@alienfishconsulting/surface-react-core':src('../../packages/react-core/src/index.tsx'),
  '@alienfishconsulting/surface-react-renderer':src('../../packages/react-renderer/src/index.ts'),
  '@alienfishconsulting/surface-react-designers':src('../../packages/react-designers/src/index.ts')
 }},
 server:{port:5173},
});
