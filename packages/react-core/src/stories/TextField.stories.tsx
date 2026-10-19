import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '../index.js';

const meta: Meta<typeof TextField> = {
  title: 'Core/TextField',
  component: TextField,
  args: { label: 'Customer name', placeholder: 'Enter a name' },
  decorators: [(Story) => <div className="story-column"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'Use the customer’s registered business name.' } };
export const Invalid: Story = { args: { defaultValue: 'A', error: 'Enter at least two characters.' } };
export const Required: Story = { args: { required: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Locked value' } };
