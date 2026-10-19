import * as React from 'react';
import {assertDesignDocument,readPointer,registry} from '@enterprise-ui/contracts';
import type {DesignDocument,DesignNode,SerializablePropsByComponent} from '@enterprise-ui/contracts';
import {AppShell,Panel,Button,TextField,KpiCard} from '@enterprise-ui/react-core';

export type HostActionRequest = {actionId:string; nodeId:string; event:string; payload?:unknown};
export type Host = {
  data: Record<string,unknown>;
  requestAction: (request:HostActionRequest)=>void|Promise<void>;
};
export interface RenderProps {doc:DesignDocument;host:Host}
type Props = Record<string,unknown>;
type Adapter = (props:Props,children:React.ReactNode,node:DesignNode,host:Host)=>React.ReactNode;
type CoreType = 'ui.AppShell'|'ui.Panel'|'ui.KpiCard'|'ui.Button'|'ui.TextField';
// A narrow boundary: registry validation precedes rendering; each adapter is checked against
// its generated serializable props from the canonical JSON Schema.
function adapt<K extends CoreType>(type:K,fn:(props:SerializablePropsByComponent[K] & Props,children:React.ReactNode,node:DesignNode,host:Host)=>React.ReactNode):[string,Adapter]{
  return [type,fn as unknown as Adapter];
}
export const coreAdapters:ReadonlyMap<string,Adapter>=new Map<string,Adapter>([
  adapt('ui.AppShell',(p,children)=><AppShell title={p.title}>{children}</AppShell>),
  adapt('ui.Panel',(p,children)=><Panel title={p.title} collapsible={p.collapsible===true}>{children}</Panel>),
  adapt('ui.KpiCard',(p)=><KpiCard label={p.label} value={typeof p.value==='number'||typeof p.value==='string'?p.value:null} format={p.format} currency={p.currency??'USD'}/>),
  adapt('ui.Button',(p,_children,node,host)=><Button label={p.label} variant={p.variant??'primary'} disabled={p.disabled===true} onPress={()=>{
    const actionId=node.intents?.onPress?.actionId;
    if(actionId) void host.requestAction({actionId,nodeId:node.id,event:'onPress'});
  }}/>),
  adapt('ui.TextField',(p,_children,node,host)=><TextField label={p.label} placeholder={p.placeholder} value={typeof p.value==='string'?p.value:undefined} description={p.description} required={p.required===true} error={p.error} onValueChange={(value)=>{
    const actionId=node.intents?.onChange?.actionId;
    if(actionId) void host.requestAction({actionId,nodeId:node.id,event:'onChange',payload:{value}});
  }}/>)
]);
export function DesignRenderer({doc,host,adapters=coreAdapters}:{doc:DesignDocument;host:Host;adapters?:ReadonlyMap<string,Adapter>}){
  const validated=assertDesignDocument(doc);
  const render=(node:DesignNode):React.ReactNode=>{
    const entry=registry.get(node.type);
    if(!entry) throw Error('Not in component registry: '+node.type);
    const adapter=adapters.get(node.type);
    if(!adapter) throw Error('Registered but not implemented in this slice: '+node.type);
    const props={...node.props};
    for(const [prop,{sourceId,pointer}] of Object.entries(node.bindings??{}))
      props[prop]=readPointer(Object.hasOwn(host.data,sourceId)?host.data[sourceId]:undefined,pointer);
    return <React.Fragment key={node.id}>{adapter(props,node.children?.map(render)??null,node,host)}</React.Fragment>;
  };
  return <>{render(validated.root)}</>;
}
