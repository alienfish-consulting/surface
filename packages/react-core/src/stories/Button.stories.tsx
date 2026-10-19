import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../index.js';

const meta = {
  title: 'Core/Button',
  component: Button,
  args: { label: 'Save changes', variant: 'primary' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Busy: Story = { args: { busy: true, label: 'Saving…' } };
export const Disabled: Story = { args: { disabled: true } };
export const Variants: Story = {
  render: () => (
    <div className="story-stack">
      <Button label="Primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Ghost" variant="ghost" />
    </div>
  ),
};
