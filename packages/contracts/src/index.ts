import Ajv2020 from 'ajv/dist/2020.js';
import type { ErrorObject, ValidateFunction } from 'ajv';
import { applyPatch, type Operation } from 'fast-json-patch';
import {registryDocument,registryDocuments,declarativeExceptions,documentSchema,registrySchema,proposalSchema,componentSchemas} from './generated/schema-bundle.js';
export type * from './generated/serialized-props.js';
export {
  implementedComponentTypes,
  isImplementedComponentType,
  type ImplementedComponentType,
} from './generated/catalog-status.js';

export type Binding = { sourceId: string; pointer: string };
export type NamedIntent = { actionId: string };
export interface DesignNode {
  id: string;
  type: string;
  props: Record<string, unknown>;
  bindings?: Record<string, Binding>;
  intents?: Record<string, NamedIntent>;
  children?: DesignNode[];
}
export interface DesignDocument {
  schemaVersion: '1.0.0'; registryVersion: string; id: string; revision: number;
  kind: 'dashboard'|'form'|'workflow'|'workspace'|'query';
  themeId: string; density: 'compact'|'comfortable'; dataSources: string[]; actionIds: string[];
  root: DesignNode;
}
export interface Proposal {
  proposalId: string; documentId: string; schemaVersion: '1.0.0';
  registryVersion: string; baseRevision: number; rationale: string;
  operations: Operation[];
}
export type HostActionRequest = {actionId:string;nodeId:string;event:string;payload?:unknown};
export type Host = {data:Record<string,unknown>;requestAction:(request:HostActionRequest)=>void|Promise<void>};
export interface RegistryEntry {
  type: string; version: string; package: string; purpose: string;
  propsSchema: string; allowedChildren: readonly string[]; bindings: readonly string[]; events: readonly string[];
  states: readonly string[]; responsive: string;
}
export const registryVersion = registryDocument.registryVersion;
export const previousRegistryVersion = registryDocuments[1].registryVersion;
export const legacyRegistryVersion = (registryDocuments[registryDocuments.length-1] as {registryVersion:string}).registryVersion;
export {declarativeExceptions};
export const registry: ReadonlyMap<string, RegistryEntry> = new Map<string, RegistryEntry>(
  registryDocument.components.map((entry) => [entry.type, entry])
);
const registriesByVersion:ReadonlyMap<string,ReadonlyMap<string,RegistryEntry>>=new Map(registryDocuments.map(document=>[
  document.registryVersion,new Map<string,RegistryEntry>(document.components.map(entry=>[entry.type,entry]))
]));
const ajv = new Ajv2020({ allErrors:true, strict:false });
ajv.addFormat('date',/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/);
const documentValidator = ajv.compile(documentSchema);
const registryValidator = ajv.compile(registrySchema);
const proposalValidator = ajv.compile(proposalSchema);
const validators: ReadonlyMap<string, ValidateFunction> = new Map(
  Object.entries(componentSchemas).map(([type,schema])=>[type,ajv.compile(schema)])
);
for(const document of registryDocuments){
  const version:string=document.registryVersion;
  if(!registryValidator(document))throw Error(`Invalid component registry ${version}: `+JSON.stringify(registryValidator.errors));
}

const formatErrors = (errors?: ErrorObject[]|null) => (errors??[]).map(e=>`${e.instancePath||'/'} ${e.message??'invalid'}`);
const forbiddenKeys = new Set(['__proto__','constructor','prototype']);
export function readPointer(source: unknown, pointer: string): unknown {
  if(pointer === '') return source;
  if(!pointer.startsWith('/')) return undefined;
  let value: unknown = source;
  for(const item of pointer.slice(1).split('/')) {
    if(/~(?![01])/.test(item)) return undefined;
    const key = item.replaceAll('~1','/').replaceAll('~0','~');
    if(forbiddenKeys.has(key)) return undefined;
    if(Array.isArray(value) && /^(0|[1-9][0-9]*)$/.test(key)) value=value[Number(key)];
    else if(value!==null && typeof value==='object' && !Array.isArray(value) && Object.hasOwn(value,key))
      value=(value as Record<string,unknown>)[key];
    else return undefined;
  }
  return value;
}
export function validateDocument(input: unknown): {ok:true;document:DesignDocument}|{ok:false;errors:string[]} {
  if(typeof input !== 'object' || input===null) return {ok:false,errors:['Document must be an object']};
  let serialized:string;
  try {serialized=JSON.stringify(input);} catch {return {ok:false,errors:['Document must be JSON-serializable']};}
  if(serialized.length > 250_000) return {ok:false,errors:['Document size limit exceeded']};
  if(!documentValidator(input)) return {ok:false,errors:formatErrors(documentValidator.errors)};
  const doc=input as DesignDocument;
  const errors:string[]=[];
  const activeRegistry=registriesByVersion.get(doc.registryVersion);
  if(!activeRegistry) errors.push(`Unsupported registryVersion: ${doc.registryVersion}`);
  if(doc.dataSources.some(source=>forbiddenKeys.has(source))) errors.push('Forbidden data source identifier');
  const seen=new Set<string>();let total=0;
  const visit=(n: DesignNode, parent: RegistryEntry|undefined, depth: number) => {
    if(depth>32) {errors.push('Maximum nesting depth exceeded');return;}
    if(++total>500) {errors.push('Maximum node count exceeded');return;}
    if(seen.has(n.id)) errors.push(`Duplicate node id: ${n.id}`);
    seen.add(n.id);
    const entry=activeRegistry?.get(n.type);
    if(!entry){errors.push(`Unregistered component: ${n.type}`);return;}
    if(parent && !parent.allowedChildren.includes(n.type)) errors.push(`${n.type} cannot be a child of ${parent.type}`);
    const valid=validators.get(n.type);
    if(!valid || !valid(n.props)) errors.push(...formatErrors(valid?.errors).map(x=>`${n.id}/props ${x}`));
    for(const [name,binding] of Object.entries(n.bindings??{})) {
      if(!entry.bindings.includes(name))errors.push(`${n.id}: unsupported binding ${name}`);
      if(!doc.dataSources.includes(binding.sourceId))errors.push(`${n.id}: undeclared data source ${binding.sourceId}`);
      const keys=binding.pointer.slice(1).split('/').map(x=>x.replaceAll('~1','/').replaceAll('~0','~'));
      if(keys.some(x=>forbiddenKeys.has(x)))errors.push(`${n.id}: forbidden pointer path`);
    }
    for(const [name,intent] of Object.entries(n.intents??{})) {
      if(!entry.events.includes(name))errors.push(`${n.id}: unsupported intent ${name}`);
      if(!doc.actionIds.includes(intent.actionId))errors.push(`${n.id}: undeclared action ${intent.actionId}`);
    }
    for(const child of n.children??[])visit(child,entry,depth+1);
  };
  visit(doc.root,undefined,0);
  return errors.length?{ok:false,errors}:{ok:true,document:doc};
}
export function assertDesignDocument(input:unknown):DesignDocument {
  const result=validateDocument(input);
  if(!result.ok) throw Error('Invalid design document: '+result.errors.join('; '));
  return result.document;
}
// Allow only property-level edits of existing nodes. Other RFC6902 edits are intentionally deferred.
const allowedPropertyPath=/^\/root(?:\/children\/(?:0|[1-9][0-9]*))*\/props(?:\/(?:[^~/]|~[01])*)+$/;
export function previewProposal(original:DesignDocument,input:unknown):{candidate:DesignDocument;summary:string} {
  assertDesignDocument(original);
  if(!proposalValidator(input))throw Error('Invalid proposal schema: '+formatErrors(proposalValidator.errors).join('; '));
  const proposal=input as Proposal;
  if(proposal.documentId!==original.id || proposal.schemaVersion!==original.schemaVersion || proposal.registryVersion!==original.registryVersion)
    throw Error('Proposal targets a different design document or schema version');
  if(proposal.baseRevision!==original.revision)throw Error('Stale revision');
  const first=proposal.operations[0];
  if(first?.op!=='test' || first.path!=='/revision' || first.value!==original.revision)
    throw Error('First operation must test current /revision');
  for(const op of proposal.operations.slice(1)) {
    if(!['test','add','replace','remove'].includes(op.op))throw Error('Patch operation not supported in first vertical slice');
    if(!allowedPropertyPath.test(op.path))throw Error('Only component props may be patched');
    if(op.path.split('/').some(x=>forbiddenKeys.has(x)))throw Error('Dangerous patch path');
  }
  const cloned=JSON.parse(JSON.stringify(original)) as DesignDocument;
  let patched: DesignDocument;
  try { patched=applyPatch(cloned,proposal.operations,true,false,true).newDocument; }
  catch(err){throw Error('Invalid patch: '+String(err));}
  patched.revision=original.revision+1; // candidate only; only the host may commit
  return {candidate:assertDesignDocument(patched),summary:`${proposal.operations.length-1} proposed property operation(s); awaiting host authorization`};
}
