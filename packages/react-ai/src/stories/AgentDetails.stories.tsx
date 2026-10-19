import * as React from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {Stack} from '@enterprise-ui/react-core';
import {
  AgentActivityFeed,AgentTaskCard,ApprovalRequest,ArtifactViewer,ContextInspector,MultiAgentTimeline,
  PromptTemplateEditor,PromptVersionDiff,ReasoningSummaryPanel,RunStepTimeline,ToolExecutionTimeline,
  ToolResultViewer,
} from '../index.js';

const meta={title:'AI/Execution details',component:AgentTaskCard,parameters:{layout:'padded'}} satisfies Meta<typeof AgentTaskCard>;
export default meta;
type Story=StoryObj;

const timeline=[
  {id:'inspect',time:'10:01',title:'Inspected repository',description:'Read the package and contract boundaries.'},
  {id:'review',time:'10:03',title:'Prepared review',description:'Two changes require authorization.'},
];

export const ActivityAndTasks:Story={render:()=> <Stack>
  <AgentTaskCard title="Review schema proposal" status="waiting" owner="Reviewer" onOpen={()=>{}}/>
  <AgentActivityFeed items={timeline}/>
  <MultiAgentTimeline items={timeline}/>
</Stack>};

export const ToolResults:Story={render:()=> <Stack>
  <ToolExecutionTimeline items={timeline}/>
  <ToolResultViewer label="Validation result" value={{valid:true,documents:4}}/>
  <ToolResultViewer label="Unavailable tool" error="The host denied this tool request."/>
</Stack>};

export const ApprovalAndArtifacts:Story={render:()=> <Stack>
  <ApprovalRequest approval={{id:'approval-42',title:'Apply reviewed proposal',description:'Updates one registered label.',requester:'Planner',status:'pending',revision:7}} onDecision={()=>{}}/>
  <ArtifactViewer label="change-summary.md" language="markdown" content={'# Proposed change\n\nUpdate the account label.'}/>
  <ContextInspector value={{documentId:'account-form',revision:7,selectedNode:'account-name'}}/>
</Stack>};

export const PromptAndReasoning:Story={render:()=>{
  const [prompt,setPrompt]=React.useState('Summarize the selected incident.');
  return <Stack>
    <PromptTemplateEditor value={prompt} onChange={setPrompt} onSave={()=>{}}/>
    <PromptVersionDiff before="Summarize the incident." after="Summarize the selected incident with evidence."/>
    <RunStepTimeline items={timeline}/>
    <ReasoningSummaryPanel summary="The proposal is structurally valid, but the host still needs to authorize the named action."/>
  </Stack>;
}};
