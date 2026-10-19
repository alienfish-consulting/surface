import {test,expect} from 'vitest';
import {assertDesignDocument,validateDocument,previewProposal,readPointer} from '@enterprise-ui/contracts';
import type {Proposal} from '@enterprise-ui/contracts';
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
