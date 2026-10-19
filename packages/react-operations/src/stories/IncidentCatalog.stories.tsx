import * as React from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {Stack} from '@enterprise-ui/react-core';
import {
  AlertList,DeploymentTimeline,EventFilterBar,EventStream,IncidentSummary,IncidentTimeline,
  MetricTrendPanel,ResourceTree,RunbookPanel,StatusPagePanel,
} from '../index.js';

const meta={title:'Operations/Events and incidents',component:IncidentSummary,parameters:{layout:'padded'}} satisfies Meta<typeof IncidentSummary>;
export default meta;
type Story=StoryObj;

const timeline=[
  {id:'detected',time:'10:02',title:'Elevated latency detected',description:'Queue processing exceeded the warning threshold.'},
  {id:'identified',time:'10:08',title:'Cause identified',description:'A worker pool was under-provisioned.'},
];

export const Events:Story={render:()=>{
  const [query,setQuery]=React.useState('worker');
  const [severity,setSeverity]=React.useState('warning');
  return <Stack>
    <EventFilterBar query={query} severity={severity} onQueryChange={setQuery} onSeverityChange={setSeverity}/>
    <EventStream label="Filtered events" connection="reconnecting" follow lines={[
      {id:'event-1',sequence:1,timestamp:'10:02',message:'Worker latency crossed warning threshold',tone:'warning'},
      {id:'event-2',sequence:2,timestamp:'10:04',message:'Additional capacity requested'},
    ]}/>
    <DeploymentTimeline items={timeline}/>
  </Stack>;
}};

export const IncidentResponse:Story={render:()=> <Stack>
  <IncidentSummary incident={{id:'inc-42',title:'Queue processing delay',status:'identified',severity:'high',startedAt:'2026-10-19 10:02',summary:'Background work is delayed while capacity recovers.'}} onOpen={()=>{}}/>
  <IncidentTimeline items={timeline}/>
  <StatusPagePanel title="Background processing" status="degraded" message="Jobs are delayed by approximately four minutes." updatedAt="Updated 10:12"/>
</Stack>};

export const AlertsAndResources:Story={render:()=> <Stack>
  <AlertList items={[
    {id:'alert-1',title:'Queue latency',severity:'critical',status:'open',timestamp:'10:02'},
    {id:'alert-2',title:'Worker saturation',severity:'warning',status:'acknowledged',timestamp:'10:05'},
  ]} onSelect={()=>{}}/>
  <RunbookPanel title="Queue recovery" steps={['Confirm customer impact','Add worker capacity','Verify queue drain']} currentStep={1} onStepActivate={()=>{}}/>
  <MetricTrendPanel title="Queue depth" value="1,284" values={[420,610,940,1284,1030]} tone="danger"/>
  <ResourceTree selectedId="worker" onSelect={()=>{}} nodes={[
    {id:'services',name:'Services',kind:'folder',children:[{id:'worker',name:'Queue worker',kind:'file',status:'degraded'}]},
  ]}/>
</Stack>};
