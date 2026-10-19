import type { Meta, StoryObj } from '@storybook/react-vite';
import { KpiCard } from '../index.js';

const meta: Meta<typeof KpiCard> = {
  title: 'Core/KpiCard',
  component: KpiCard,
  args: { label: 'Active customers', value: 1284, format: 'integer' },
  decorators: [(Story) => <div className="story-column"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Integer: Story = {};
export const Currency: Story = { args: { label: 'Monthly revenue', value: 98340, format: 'currency' } };
export const Percent: Story = { args: { label: 'Conversion rate', value: 0.274, format: 'percent' } };
export const Loading: Story = { args: { loading: true } };
export const Stale: Story = { args: { freshness: 'stale' } };
