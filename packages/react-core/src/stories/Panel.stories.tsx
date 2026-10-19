import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../index.js';

const meta = {
  title: 'Core/Panel',
  component: Panel,
  args: { title: 'Account health', children: 'Panel content remains composable.' },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsible: Story = { args: { collapsible: true } };
export const Compact: Story = { globals: { density: 'compact' } };
export const Dark: Story = { globals: { theme: 'dark' } };
