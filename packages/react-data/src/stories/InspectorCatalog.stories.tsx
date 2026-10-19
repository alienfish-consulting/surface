import type {Meta,StoryObj} from '@storybook/react-vite';
import {Stack} from '@enterprise-ui/react-core';
import {CodeViewer,DataInspector,DiffViewer,FileTree,JsonViewer} from '../index.js';
const meta={title:'Data/Inspectors',component:DataInspector,parameters:{layout:'padded'}} satisfies Meta<typeof DataInspector>;export default meta;type Story=StoryObj;
const value={customer:{id:'cust-42',name:'Aperture Labs',status:'active'},totals:[12,18,24]};
export const InspectAndCompare:Story={render:()=> <Stack><DataInspector value={value} path="customer.name"/><JsonViewer value={value}/><DiffViewer before={'status: pending\nowner: lee'} after={'status: active\nowner: lee'}/></Stack>};
export const CodeAndFiles:Story={render:()=> <Stack><FileTree defaultExpandedIds={['src']} nodes={[{id:'src',name:'src',kind:'folder',children:[{id:'app',name:'App.tsx',kind:'file',status:'M'}]},{id:'pkg',name:'package.json',kind:'file'}]}/><CodeViewer label="App.tsx" language="tsx" highlightLines={[2]} code={'export function App(){\n  return <main>Hello</main>;\n}'}/></Stack>};
