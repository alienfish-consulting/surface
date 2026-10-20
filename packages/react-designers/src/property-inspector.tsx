import * as React from 'react';
import type {DesignDocument,Proposal} from '@alienfishconsulting/surface-contracts';
import {registry} from '@alienfishconsulting/surface-contracts';
import {Button,TextField} from '@alienfishconsulting/surface-react-core';
import {flattenNodes} from './designer-helpers.js';
export function PropertyInspector({document, onPropose}:{document:DesignDocument;onPropose:(proposal:Proposal)=>void}){
 const nodes=flattenNodes(document.root);
 const [id,setId]=React.useState(document.root.id);
 const found=nodes.find(n=>n.node.id===id)??nodes[0];
 const entry=found?registry.get(found.node.type):undefined;
 const editable=found?Object.entries(found.node.props).filter(([,value])=>typeof value==='string'):[];
 const [field,setField]=React.useState('');const [text,setText]=React.useState('');
 React.useEffect(()=>{setField(editable[0]?.[0]??'');setText(String(editable[0]?.[1]??''));},[id,document.revision]);
 if(!found)return null;
 const currentPath=found.path;
 return <section className="lab-inspector"><h2>Property inspector</h2><label htmlFor="node-choice">Component</label>
  <select id="node-choice" value={id} onChange={event=>setId(event.target.value)}>{nodes.map(n=><option key={n.node.id} value={n.node.id}>{n.node.id} · {n.node.type}</option>)}</select>
  <p className="lab-detail">{entry?.purpose}</p>
  <label htmlFor="property-choice">Editable property</label>
  <select id="property-choice" value={field} onChange={event=>{const key=event.target.value;setField(key);setText(String(found.node.props[key]??''));}}>
  {editable.map(([key])=><option key={key} value={key}>{key}</option>)}</select>
  <TextField label="Proposed value" value={text} onValueChange={setText}/>
  <Button label="Review proposal" disabled={!field || String(found.node.props[field])===text} onPress={()=>{
   if(!field) return;
   const escaped=field.replaceAll('~','~0').replaceAll('/','~1');
   onPropose({proposalId:`property-${document.revision}`,documentId:document.id,schemaVersion:document.schemaVersion,registryVersion:document.registryVersion,baseRevision:document.revision,rationale:`Change ${found.node.id}.${field}`,
    operations:[{op:'test',path:'/revision',value:document.revision},{op:'replace',path:`${currentPath}/props/${escaped}`,value:text}]});
  }}/>
  <p className="lab-detail">Edits generate RFC 6902 proposals. Nothing is persisted until the host authorizes and commits.</p>
 </section>;
}
