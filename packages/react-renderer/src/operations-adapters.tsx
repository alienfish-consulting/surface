import * as React from 'react';
import type {DesignNode,SerializableComponentType,SerializablePropsByComponent} from '@alienfishconsulting/surface-contracts';
import * as Ops from '@alienfishconsulting/surface-react-operations';
import type {Adapter,Host} from './core-adapters.js';
type Props=Record<string,unknown>;
const adapt=<K extends SerializableComponentType>(type:K,render:(props:SerializablePropsByComponent[K]&Props,children:React.ReactNode,node:DesignNode,host:Host)=>React.ReactNode):[string,Adapter]=>[type,render as unknown as Adapter];
const action=(node:DesignNode,host:Host,event:string,payload?:unknown)=>{const actionId=node.intents?.[event]?.actionId;if(actionId)void host.requestAction({actionId,nodeId:node.id,event,payload})};
const array=<T,>(value:unknown)=>Array.isArray(value)?value as T[]:[];
export const operationsAdapters:ReadonlyMap<string,Adapter>=new Map([
 adapt('ui.KanbanBoard',(p,_c,n,h)=><Ops.KanbanBoard label={p.label} lanes={array<Ops.KanbanLaneDefinition>(p.lanes)} onTaskActivate={id=>action(n,h,'onTaskActivate',{id})} onMove={(taskId,laneId,direction)=>action(n,h,'onMove',{taskId,laneId,direction})}/>),
 adapt('ui.KanbanLane',(p,_c,n,h)=><Ops.KanbanLane lane={p.lane as unknown as Ops.KanbanLaneDefinition} onTaskActivate={id=>action(n,h,'onTaskActivate',{id})} onMove={(taskId,direction)=>action(n,h,'onMove',{taskId,direction})}/>),
 adapt('ui.TaskCard',(p,_c,n,h)=><Ops.TaskCard task={p.task as unknown as Ops.Task} onActivate={id=>action(n,h,'onActivate',{id})}/>),
 adapt('ui.ApprovalCard',(p,_c,n,h)=><Ops.ApprovalCard approval={p.approval as unknown as Ops.Approval} onDecision={(id,decision,revision)=>action(n,h,'onDecision',{id,decision,revision})}/>),
 adapt('ui.ApprovalQueue',(p,_c,n,h)=><Ops.ApprovalQueue label={p.label} items={array<Ops.Approval>(p.items)} onDecision={(id,decision,revision)=>action(n,h,'onDecision',{id,decision,revision})}/>),
 adapt('ui.ActivityFeed',(p,_c,n,h)=><Ops.ActivityFeed title={p.title} items={array<Ops.ActivityItem>(p.items)} connection={p.connection as Ops.ConnectionState|undefined} onEventActivate={id=>action(n,h,'onEventActivate',{id})}/>),
 adapt('ui.AuditTrail',(p,_c,n,h)=><Ops.AuditTrail label={p.label} items={array<Ops.AuditItem>(p.items)} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.DeploymentPipeline',(p,_c,n,h)=><Ops.DeploymentPipeline label={p.label} stages={array<Ops.DeploymentStageDefinition>(p.stages)} onStageActivate={id=>action(n,h,'onStageActivate',{id})}/>),
 adapt('ui.DeploymentStage',(p,_c,n,h)=><Ops.DeploymentStage stage={p.stage as unknown as Ops.DeploymentStageDefinition} onActivate={id=>action(n,h,'onActivate',{id})}/>),
 adapt('ui.DeploymentTimeline',(p,_c,n,h)=><Ops.DeploymentTimeline label={p.label} items={array(p.items)} onActivate={id=>action(n,h,'onActivate',{id})}/>),
 adapt('ui.LogViewer',(p,_c,n,h)=><Ops.LogViewer label={p.label} lines={array<Ops.StreamItem>(p.lines)} connection={p.connection} follow={p.follow} onFollowChange={value=>action(n,h,'onFollowChange',{value})}/>),
 adapt('ui.EventStream',(p,_c,n,h)=><Ops.EventStream label={p.label} lines={array<Ops.StreamItem>(p.lines)} connection={p.connection} follow={p.follow} onFollowChange={value=>action(n,h,'onFollowChange',{value})}/>),
 adapt('ui.EventFilterBar',(p,_c,n,h)=><Ops.EventFilterBar query={p.query} severity={p.severity} onQueryChange={value=>action(n,h,'onQueryChange',{value})} onSeverityChange={value=>action(n,h,'onSeverityChange',{value})}/>),
 adapt('ui.InfrastructureTopology',(p,_c,n,h)=><Ops.InfrastructureTopology label={p.label} nodes={array<Ops.TopologyNodeDefinition>(p.nodes)} edges={array<Ops.TopologyEdgeDefinition>(p.edges)} onNodeActivate={id=>action(n,h,'onNodeActivate',{id})}/>),
 adapt('ui.TopologyNode',(p,_c,n,h)=><Ops.TopologyNode node={p.node as unknown as Ops.TopologyNodeDefinition} onActivate={id=>action(n,h,'onActivate',{id})}/>),
 adapt('ui.ServiceHealthGrid',(p,_c,n,h)=><Ops.ServiceHealthGrid label={p.label} services={array<Ops.ServiceHealth>(p.services)} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.StatusPagePanel',p=><Ops.StatusPagePanel title={p.title} status={p.status} message={p.message} updatedAt={p.updatedAt}/>),
 adapt('ui.IncidentTimeline',(p,_c,n,h)=><Ops.IncidentTimeline label={p.label} items={array(p.items)} onActivate={id=>action(n,h,'onActivate',{id})}/>),
 adapt('ui.IncidentSummary',(p,_c,n,h)=><Ops.IncidentSummary incident={p.incident as unknown as Ops.Incident} onOpen={id=>action(n,h,'onOpen',{id})}/>),
 adapt('ui.AlertList',(p,_c,n,h)=><Ops.AlertList label={p.label} items={array<Ops.Alert>(p.items)} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.AlertDetails',(p,_c,n,h)=><Ops.AlertDetails alert={p.alert as unknown as Ops.Alert} onAcknowledge={id=>action(n,h,'onAcknowledge',{id})} onResolve={id=>action(n,h,'onResolve',{id})}/>),
 adapt('ui.RunbookPanel',(p,_c,n,h)=><Ops.RunbookPanel title={p.title} steps={p.steps} currentStep={p.currentStep} onStepActivate={index=>action(n,h,'onStepActivate',{index})}/>),
 adapt('ui.MetricTrendPanel',p=><Ops.MetricTrendPanel title={p.title} value={p.value} values={p.values??[]} tone={p.tone}/>),
 adapt('ui.ResourceTree',(p,_c,n,h)=><Ops.ResourceTree label={p.label} nodes={array(p.nodes)} selectedId={p.selectedId} onSelect={id=>action(n,h,'onSelect',{id})}/>),
]);
