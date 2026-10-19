import * as React from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import type {DesignDocument,Proposal} from '@enterprise-ui/contracts';
import {Stack,Surface} from '@enterprise-ui/react-core';
import {
  BindingEditor,DashboardDesigner,DashboardGrid,FormDesigner,FormFieldPalette,LayersPanel,
  PropertyInspector,QueryDesigner,ResizeHandles,SchemaDesigner,SchemaInspector,SelectionOutline,
  WorkflowDesigner,WorkflowEdgeEditor,WorkflowNodePalette,
} from '../index.js';

const document:DesignDocument={
  schemaVersion:'1.0.0',registryVersion:'1.6.0',id:'designer-story',revision:4,kind:'form',themeId:'default',density:'comfortable',dataSources:['customer'],actionIds:['save'],
  root:{id:'account',type:'ui.Panel',props:{title:'Account'},children:[{id:'name',type:'ui.TextField',props:{label:'Name'}}]},
};

const meta={title:'Designers/Specialists',component:FormDesigner,parameters:{layout:'padded'}} satisfies Meta<typeof FormDesigner>;
export default meta;
type Story=StoryObj;

export const FormAuthoring:Story={render:()=>{
  const [binding,setBinding]=React.useState({sourceId:'customer',pointer:'/name'});
  const [proposal,setProposal]=React.useState<Proposal|null>(null);
  return <FormDesigner>
    <Stack>
      <FormFieldPalette fields={['Text field','Number field','Date picker']} onInsert={()=>{}}/>
      <BindingEditor binding={binding} onChange={setBinding}/>
      <SchemaInspector type="ui.TextField"/>
      <LayersPanel document={document} selectedId="name" onSelect={()=>{}}/>
      <PropertyInspector document={document} onPropose={setProposal}/>
      {proposal&&<pre>{proposal.rationale}</pre>}
      <Surface style={{position:'relative',padding:24}}><SelectionOutline label="Account panel selected"/><ResizeHandles onResize={()=>{}}/>Selected canvas item</Surface>
    </Stack>
  </FormDesigner>;
}};

export const DashboardAuthoring:Story={render:()=> <DashboardDesigner>
  <DashboardGrid items={[{id:'revenue',label:'Revenue KPI'},{id:'activity',label:'Recent activity'}]} onMove={()=>{}}/>
</DashboardDesigner>};

export const WorkflowAuthoring:Story={render:()=> <WorkflowDesigner>
  <Stack>
    <WorkflowNodePalette nodes={['Approval','Notification','Deployment']} onInsert={()=>{}}/>
    <WorkflowEdgeEditor from="review" to="deploy" condition="success" onChange={()=>{}}/>
  </Stack>
</WorkflowDesigner>};

export const QueryAndSchemaAuthoring:Story={render:()=> <Stack>
  <QueryDesigner><Surface style={{padding:16}}>Query clauses and preview remain application-owned.</Surface></QueryDesigner>
  <SchemaDesigner schema={{type:'object',properties:{name:{type:'string'}}}} onChange={()=>{}}/>
</Stack>};
