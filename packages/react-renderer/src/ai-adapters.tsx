import * as React from 'react';
import type {DesignNode,SerializableComponentType,SerializablePropsByComponent} from '@enterprise-ui/contracts';
import * as AI from '@enterprise-ui/react-ai';
import type {Adapter,Host} from './core-adapters.js';
type Props=Record<string,unknown>;const array=<T,>(v:unknown)=>Array.isArray(v)?v as T[]:[];
const adapt=<K extends SerializableComponentType>(type:K,render:(props:SerializablePropsByComponent[K]&Props,children:React.ReactNode,node:DesignNode,host:Host)=>React.ReactNode):[string,Adapter]=>[type,render as unknown as Adapter];
const action=(n:DesignNode,h:Host,e:string,p?:unknown)=>{const id=n.intents?.[e]?.actionId;if(id)void h.requestAction({actionId:id,nodeId:n.id,event:e,payload:p})};
export const aiAdapters:ReadonlyMap<string,Adapter>=new Map([
 adapt('ui.ChatWorkspace',(p,c)=><AI.ChatWorkspace label={p.label} thread={c}/>),
 adapt('ui.ConversationList',(p,_c,n,h)=><AI.ConversationList label={p.label} items={array<AI.Conversation>(p.items)} selectedId={p.selectedId} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.MessageThread',(p,_c,n,h)=><AI.MessageThread label={p.label} messages={array<AI.ChatMessageData>(p.messages)} onRetry={id=>action(n,h,'onRetry',{id})} onCancel={id=>action(n,h,'onCancel',{id})}/>),
 adapt('ui.ChatMessage',p=><AI.ChatMessage message={p.message as unknown as AI.ChatMessageData}/>),
 adapt('ui.MessageComposer',(p,_c,n,h)=><AI.MessageComposer label={p.label} value={p.value} disabled={p.disabled} onChange={value=>action(n,h,'onChange',{value})} onSubmit={value=>action(n,h,'onSubmit',{value})} onCancel={()=>action(n,h,'onCancel')}/>),
 adapt('ui.StreamingText',p=><AI.StreamingText label={p.label} text={p.text} status={p.status}/>),
 adapt('ui.AttachmentTray',(p,_c,n,h)=><AI.AttachmentTray items={array<AI.Attachment>(p.items)} onRemove={id=>action(n,h,'onRemove',{id})} onRetry={id=>action(n,h,'onRetry',{id})}/>),
 adapt('ui.CitationList',(p,_c,n,h)=><AI.CitationList label={p.label} items={array<AI.Citation>(p.items)} onOpen={id=>action(n,h,'onOpen',{id})}/>),
 adapt('ui.ToolCallCard',(p,_c,n,h)=><AI.ToolCallCard name={p.name} status={p.status} input={p.input} onCancel={()=>action(n,h,'onCancel')}/>),
 adapt('ui.ToolResultViewer',p=><AI.ToolResultViewer label={p.label} value={p.value} error={p.error}/>),
 adapt('ui.ToolExecutionTimeline',p=><AI.ToolExecutionTimeline items={array(p.items)}/>),
 adapt('ui.AgentRoster',(p,_c,n,h)=><AI.AgentRoster items={array<AI.AgentItem>(p.items)} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.AgentActivityFeed',p=><AI.AgentActivityFeed items={array(p.items)}/>),
 adapt('ui.AgentTaskCard',(p,_c,n,h)=><AI.AgentTaskCard title={p.title} status={p.status} owner={p.owner} onOpen={()=>action(n,h,'onOpen')}/>),
 adapt('ui.MultiAgentTimeline',p=><AI.MultiAgentTimeline items={array(p.items)}/>),
 adapt('ui.ApprovalRequest',(p,_c,n,h)=><AI.ApprovalRequest approval={p.approval as never} onDecision={(id,decision,revision)=>action(n,h,'onDecision',{id,decision,revision})}/>),
 adapt('ui.ApprovalReview',(p,_c,n,h)=><AI.ApprovalReview title={p.title} summary={p.summary} diff={p.diff as {before:string;after:string}|undefined} onApprove={()=>action(n,h,'onApprove')} onDeny={()=>action(n,h,'onDeny')}/>),
 adapt('ui.ArtifactViewer',p=><AI.ArtifactViewer label={p.label} content={p.content} language={p.language}/>),
 adapt('ui.ArtifactCard',(p,_c,n,h)=><AI.ArtifactCard title={p.title} type={p.type} onOpen={()=>action(n,h,'onOpen')}/>),
 adapt('ui.ContextInspector',p=><AI.ContextInspector label={p.label} value={p.value}/>),
 adapt('ui.TokenUsageMeter',p=><AI.TokenUsageMeter label={p.label} used={p.used} limit={p.limit}/>),
 adapt('ui.ModelSelector',(p,_c,n,h)=><AI.ModelSelector models={array(p.models)} value={p.value} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.PromptTemplateEditor',(p,_c,n,h)=><AI.PromptTemplateEditor value={p.value} onChange={value=>action(n,h,'onChange',{value})} onSave={value=>action(n,h,'onSave',{value})}/>),
 adapt('ui.PromptVersionDiff',p=><AI.PromptVersionDiff label={p.label} before={p.before} after={p.after} mode={p.mode}/>),
 adapt('ui.RunStatusPanel',p=><AI.RunStatusPanel title={p.title} status={p.status} message={p.message}/>),
 adapt('ui.RunStepTimeline',p=><AI.RunStepTimeline items={array(p.items)}/>),
 adapt('ui.ReasoningSummaryPanel',p=><AI.ReasoningSummaryPanel title={p.title} summary={p.summary}/>),
]);
