import * as React from 'react';
import {assertDesignDocument,isImplementedComponentType,readPointer,registry} from '@enterprise-ui/contracts';
import type {DesignDocument,DesignNode} from '@enterprise-ui/contracts';
import {defaultAdapters} from './registry.js';
import type {Adapter,Host} from './core-adapters.js';

export interface RenderProps {doc:DesignDocument;host:Host}
export function DesignRenderer({doc,host,adapters=defaultAdapters}:{doc:DesignDocument;host:Host;adapters?:ReadonlyMap<string,Adapter>}){
  const validated=assertDesignDocument(doc);
  const render=(node:DesignNode):React.ReactNode=>{
    const entry=registry.get(node.type);
    if(!entry) throw Error('Not in component registry: '+node.type);
    if(!isImplementedComponentType(node.type)) throw Error('Cataloged but not implemented: '+node.type);
    const adapter=adapters.get(node.type);
    if(!adapter) throw Error('Registered but not implemented in this slice: '+node.type);
    const props={...node.props};
    for(const [prop,{sourceId,pointer}] of Object.entries(node.bindings??{}))
      props[prop]=readPointer(Object.hasOwn(host.data,sourceId)?host.data[sourceId]:undefined,pointer);
    return <React.Fragment key={node.id}>{adapter(props,node.children?.map(render)??null,node,host)}</React.Fragment>;
  };
  return <>{render(validated.root)}</>;
}
