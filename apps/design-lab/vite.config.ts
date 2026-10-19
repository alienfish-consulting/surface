import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath,URL} from 'node:url';
const src=(p:string)=>fileURLToPath(new URL(p,import.meta.url));
export default defineConfig({
 plugins:[react()],
 resolve:{alias:{
  '@enterprise-ui/contracts':src('../../packages/contracts/src/index.ts'),
  '@enterprise-ui/react-core':src('../../packages/react-core/src/index.tsx'),
  '@enterprise-ui/react-renderer':src('../../packages/react-renderer/src/index.tsx'),
  '@enterprise-ui/react-designers':src('../../packages/react-designers/src/index.tsx')
 }},
 server:{port:5173},
});
