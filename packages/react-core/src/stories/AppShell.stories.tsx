import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell, Panel } from '../index.js';

const meta = {
  title: 'Core/AppShell',
  component: AppShell,
  args: { title: 'Customer Operations' },
  render: (args) => (
    <AppShell {...args}>
      <Panel title="Workspace panel">Responsive application content</Panel>
    </AppShell>
  ),
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { globals: { density: 'compact' } };
export const Dark: Story = { globals: { theme: 'dark' } };
export const NarrowLayout: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
