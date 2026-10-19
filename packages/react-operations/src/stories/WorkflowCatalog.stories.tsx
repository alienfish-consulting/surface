import * as React from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {ActivityFeed,ApprovalQueue,AuditTrail,KanbanBoard} from '../index.js';
const meta={title:'Operations/Workflows',component:KanbanBoard,args:{lanes:[]},parameters:{layout:'padded'}} satisfies Meta<typeof KanbanBoard>;
export default meta;type Story=StoryObj<typeof meta>;
export const WorkflowStates:Story={render:()=>{const [result,setResult]=React.useState('Awaiting decision');return <div style={{display:'grid',gap:24}}><KanbanBoard lanes={[{id:'todo',label:'To do',tasks:[{id:'1',title:'Review change',priority:'high'}]},{id:'done',label:'Done',tasks:[]}]}/><ApprovalQueue items={[{id:'a',title:'Production rollout',requester:'Morgan',status:'pending',revision:3}]} onDecision={(_id,decision)=>setResult(decision)}/><p role="status">{result}</p><ActivityFeed connection="reconnecting" items={[{id:'e2',sequence:2,timestamp:'10:02',message:'Connection interrupted',tone:'warning'},{id:'e1',sequence:1,timestamp:'10:01',message:'Deployment started'}]}/><AuditTrail items={[{id:'u1',timestamp:'10:00',actor:'Lee',action:'approved',target:'change 42',outcome:'success'}]}/></div>}};
