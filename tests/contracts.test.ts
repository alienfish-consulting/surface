import {test,expect} from 'vitest';
import {assertDesignDocument,declarativeExceptions,registryVersion,validateDocument,previewProposal,readPointer} from '@alienfishconsulting/surface-contracts';
import type {DesignDocument,Proposal} from '@alienfishconsulting/surface-contracts';
import fixture from '../packages/contracts/fixtures/vertical-slice.design.json';
import legacyFixture from '../packages/contracts/fixtures/customer-operations.design.json';
const source=assertDesignDocument(fixture);
const copy=()=>structuredClone(source);
const proposal=(doc=source):Proposal=>({proposalId:'test',documentId:doc.id,schemaVersion:doc.schemaVersion,
 registryVersion:doc.registryVersion,baseRevision:doc.revision,rationale:'change panel label',
 operations:[{op:'test',path:'/revision',value:doc.revision},{op:'replace',path:'/root/children/0/props/title',value:'Updated overview'}]});
test('current and immutable legacy fixtures validate against pinned registries',()=>{
 expect(validateDocument(source).ok).toBe(true);expect(validateDocument(legacyFixture).ok).toBe(true);
});
test('rejects unknown components and unsupported props',()=>{
 const d=copy();d.root.children![0]!.type='ui.Evil';expect(validateDocument(d).ok).toBe(false);
 const p=copy();p.root.children![0]!.props.injected='bad';expect(validateDocument(p).ok).toBe(false);
});
test('rejects undeclared binding/action and prototype pointer',()=>{
 const d=copy();d.root.children![0]!.children![0]!.bindings!.value={sourceId:'secrets',pointer:'/__proto__'};
 expect(validateDocument(d).ok).toBe(false);
});
test('preview does not mutate authoritative document',()=>{
 const before=JSON.stringify(source);const result=previewProposal(source,proposal());
 expect(result.candidate.root.children![0]!.props.title).toBe('Updated overview');
 expect(result.candidate.revision).toBe(source.revision+1);expect(JSON.stringify(source)).toBe(before);
});
test('stale, unsafe, and invalid changes fail closed',()=>{
 const stale=proposal();stale.baseRevision=0;expect(()=>previewProposal(source,stale)).toThrow('Stale revision');
 const unsafe=proposal();unsafe.operations[1]={op:'replace',path:'/actionIds/0',value:'secrets.exfiltrate'};
 expect(()=>previewProposal(source,unsafe)).toThrow('Only component props');
 const invalid=proposal();invalid.operations[1]={op:'replace',path:'/root/children/0/props/title',value:123};
 expect(()=>previewProposal(source,invalid)).toThrow('Invalid design document');
});
test('pointer decoder rejects prototype properties and uses own keys',()=>{
 expect(readPointer({a:{value:2}},'/a/value')).toBe(2);
 expect(readPointer({a:3},'/__proto__')).toBeUndefined();
});
test('active registry validates core and data contracts and preserves explicit JSX-only exceptions',()=>{
 expect(registryVersion).toBe('1.6.0');
 expect(declarativeExceptions.map(item=>item.type)).toEqual(['ui.KeyboardShortcut','ui.ToastViewport','ui.GridColumn','ui.ChartLegend','ui.ChartTooltip','ui.TopologyEdge','ui.SelectionOutline','ui.ResizeHandles']);
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'core-contract',revision:0,kind:'form',themeId:'default',density:'comfortable',dataSources:[],actionIds:['form.change'],root:{id:'page',type:'ui.PageLayout',props:{},children:[{id:'field',type:'ui.Select',props:{label:'Environment',options:[{value:'prod',label:'Production'}]},intents:{onChange:{actionId:'form.change'}}}]}};
 expect(validateDocument(document)).toEqual({ok:true,document});
 const invalid=structuredClone(document);invalid.root.children![0]!.props.unknown=true;
 expect(validateDocument(invalid).ok).toBe(false);
});
test('data registry validates a serialized grid and rejects undeclared data props',()=>{
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'data-contract',revision:0,kind:'dashboard',themeId:'default',density:'compact',dataSources:['accounts'],actionIds:['grid.activate'],root:{id:'grid',type:'ui.DataGrid',props:{title:'Customers',columns:[{key:'name',label:'Name',sortable:true}]},bindings:{rows:{sourceId:'accounts',pointer:''}},intents:{onRowActivate:{actionId:'grid.activate'}}}};
 expect(validateDocument(document)).toEqual({ok:true,document});
 const invalid=structuredClone(document);invalid.root.props.renderCell='arbitrary-code';
 expect(validateDocument(invalid).ok).toBe(false);
});
test('operations registry validates named approval intentions and rejects executable props',()=>{
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'approval-contract',revision:0,kind:'workflow',themeId:'default',density:'comfortable',dataSources:['approvals'],actionIds:['approval.decide'],root:{id:'queue',type:'ui.ApprovalQueue',props:{label:'Change approvals'},bindings:{items:{sourceId:'approvals',pointer:''}},intents:{onDecision:{actionId:'approval.decide'}}}};
 expect(validateDocument(document)).toEqual({ok:true,document});
 const invalid=structuredClone(document);invalid.root.props.onApprove='javascript:run()';
 expect(validateDocument(invalid).ok).toBe(false);
});
