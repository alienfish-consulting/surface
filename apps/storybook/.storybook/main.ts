import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath, URL } from 'node:url';

const config: StorybookConfig = {
  stories: [
    '../../../packages/react-core/src/**/*.stories.@(ts|tsx)',
    '../../../packages/react-data/src/**/*.stories.@(ts|tsx)',
    '../../../packages/react-operations/src/**/*.stories.@(ts|tsx)',
    '../../../packages/react-ai/src/**/*.stories.@(ts|tsx)',
    '../../../packages/react-designers/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@enterprise-ui/react-core': fileURLToPath(new URL('../../../packages/react-core/src/index.tsx', import.meta.url)),
        '@enterprise-ui/react-data': fileURLToPath(new URL('../../../packages/react-data/src/index.tsx', import.meta.url)),
        '@enterprise-ui/react-operations': fileURLToPath(new URL('../../../packages/react-operations/src/index.tsx', import.meta.url)),
        '@enterprise-ui/react-ai': fileURLToPath(new URL('../../../packages/react-ai/src/index.tsx', import.meta.url)),
        '@enterprise-ui/react-designers': fileURLToPath(new URL('../../../packages/react-designers/src/index.tsx', import.meta.url)),
      },
    },
  }),
};

export default config;
