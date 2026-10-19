import * as React from 'react';
import type {Binding,DesignDocument,DesignNode,Proposal,SerializableComponentType,SerializablePropsByComponent} from '@enterprise-ui/contracts';
import * as D from '@enterprise-ui/react-designers';
import type {Adapter,Host} from './core-adapters.js';
type Props=Record<string,unknown>;const array=<T,>(v:unknown)=>Array.isArray(v)?v as T[]:[];
const adapt=<K extends SerializableComponentType>(type:K,render:(p:SerializablePropsByComponent[K]&Props,c:React.ReactNode,n:DesignNode,h:Host)=>React.ReactNode):[string,Adapter]=>[type,render as unknown as Adapter];
const action=(n:DesignNode,h:Host,e:string,p?:unknown)=>{const id=n.intents?.[e]?.actionId;if(id)void h.requestAction({actionId:id,nodeId:n.id,event:e,payload:p})};
export const designerAdapters:ReadonlyMap<string,Adapter>=new Map([
 adapt('ui.DesignerShell',(p,c)=><D.DesignerShell label={p.label} canvas={c}/>),
 adapt('ui.ComponentPalette',(p,_c,n,h)=><D.ComponentPalette label={p.label} types={p.types} onInsert={type=>action(n,h,'onInsert',{type})}/>),
 adapt('ui.DesignCanvas',(p,_c,n,h)=><D.DesignCanvas document={p.document as DesignDocument} selectedId={p.selectedId} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.PropertyInspector',(p,_c,n,h)=><D.PropertyInspector document={p.document as DesignDocument} onPropose={proposal=>action(n,h,'onPropose',{proposal})}/>),
 adapt('ui.SchemaInspector',p=><D.SchemaInspector type={p.type}/>),
 adapt('ui.LayersPanel',(p,_c,n,h)=><D.LayersPanel document={p.document as DesignDocument} selectedId={p.selectedId} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.OutlineTree',(p,_c,n,h)=><D.OutlineTree root={p.root as unknown as DesignNode} selectedId={p.selectedId} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.UndoRedoToolbar',(p,_c,n,h)=><D.UndoRedoToolbar canUndo={p.canUndo} canRedo={p.canRedo} onUndo={()=>action(n,h,'onUndo')} onRedo={()=>action(n,h,'onRedo')}/>),
 adapt('ui.ResponsivePreview',(p,c)=><D.ResponsivePreview label={p.label} width={p.width}>{c}</D.ResponsivePreview>),
 adapt('ui.BreakpointSwitcher',(p,_c,n,h)=><D.BreakpointSwitcher value={p.value} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.PreviewModeToggle',(p,_c,n,h)=><D.PreviewModeToggle value={p.value} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.BindingEditor',(p,_c,n,h)=><D.BindingEditor binding={p.binding as Binding|undefined} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.ActionEditor',(p,_c,n,h)=><D.ActionEditor actionId={p.actionId} availableActions={p.availableActions} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.FormDesigner',(_p,c)=><D.FormDesigner>{c}</D.FormDesigner>),adapt('ui.FormFieldPalette',(p,_c,n,h)=><D.FormFieldPalette fields={p.fields} onInsert={value=>action(n,h,'onInsert',{value})}/>),
 adapt('ui.DashboardDesigner',(_p,c)=><D.DashboardDesigner>{c}</D.DashboardDesigner>),adapt('ui.DashboardGrid',(p,_c,n,h)=><D.DashboardGrid items={array(p.items)} onMove={(id,direction)=>action(n,h,'onMove',{id,direction})}/>),
 adapt('ui.WorkflowDesigner',(_p,c)=><D.WorkflowDesigner>{c}</D.WorkflowDesigner>),adapt('ui.WorkflowNodePalette',(p,_c,n,h)=><D.WorkflowNodePalette nodes={p.nodes} onInsert={value=>action(n,h,'onInsert',{value})}/>),
 adapt('ui.WorkflowEdgeEditor',(p,_c,n,h)=><D.WorkflowEdgeEditor from={p.from} to={p.to} condition={p.condition} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.QueryDesigner',(_p,c)=><D.QueryDesigner>{c}</D.QueryDesigner>),adapt('ui.SchemaDesigner',(p,_c,n,h)=><D.SchemaDesigner schema={p.schema} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.VersionHistory',(p,_c,n,h)=><D.VersionHistory items={array<D.VersionItem>(p.items)} onSelect={id=>action(n,h,'onSelect',{id})}/>),
 adapt('ui.ConflictResolver',(p,_c,n,h)=><D.ConflictResolver conflicts={array(p.conflicts)} onResolve={(path,choice)=>action(n,h,'onResolve',{path,choice})}/>),
 adapt('ui.PatchReviewPanel',(p,_c,n,h)=><D.PatchReviewPanel proposal={p.proposal as unknown as Proposal} onApprove={()=>action(n,h,'onApprove')} onReject={()=>action(n,h,'onReject')}/>),
 adapt('ui.DesignerValidationPanel',p=><D.DesignerValidationPanel errors={p.errors} warnings={p.warnings}/>),
]);
