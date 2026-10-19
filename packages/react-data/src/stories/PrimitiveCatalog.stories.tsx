import type {Meta,StoryObj} from '@storybook/react-vite';
import {ChartTooltip} from '../index.js';

const meta={
  title:'Data/Visualization primitives',
  component:ChartTooltip,
  args:{label:'Current requests',value:'1,284'},
  parameters:{layout:'centered'},
} satisfies Meta<typeof ChartTooltip>;

export default meta;
type Story=StoryObj<typeof meta>;

export const Default:Story={};
export const LongValue:Story={args:{label:'Average request duration',value:'2 minutes 14 seconds'}};
