import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../../../packages/tokens/dist/theme.css';
import '../../../packages/react-core/src/styles.css';
import '../../../packages/react-data/src/styles.css';
import './preview.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Enterprise UI theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'high-contrast', title: 'High contrast' },
        ],
      },
    },
    density: {
      description: 'Enterprise UI density',
      defaultValue: 'comfortable',
      toolbar: {
        icon: 'component',
        items: [
          { value: 'comfortable', title: 'Comfortable' },
          { value: 'compact', title: 'Compact' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = context.globals.theme as string;
      const highContrast = selectedTheme === 'high-contrast';
      return (
        <div
          className="story-canvas"
          data-ui-theme={highContrast ? 'light' : selectedTheme}
          data-ui-contrast={highContrast ? 'high' : undefined}
          data-ui-density={context.globals.density}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
    options: { storySort: { order: ['Core','Data'] } },
    a11y: { test: 'todo' },
  },
};

export default preview;
