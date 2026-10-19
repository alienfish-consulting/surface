import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => JSON.parse(readFileSync(resolve(root,path),'utf8'));
const isCheck=process.argv.includes('--check');
let drift=false;
const output=(file,content)=>{
  const dest=resolve(root,file);
  if (isCheck) {
    if (!existsSync(dest) || readFileSync(dest,'utf8')!==content) {console.error('Generated drift:',file);drift=true;}
    return;
  }
  mkdirSync(dirname(dest),{recursive:true});writeFileSync(dest,content);
  console.log('generated:',file);
};
const previousRegistry=read('packages/contracts/fixtures/component-registry.json');
const coreContracts=read('packages/contracts/source/core-component-contracts.json');
const dataContracts=read('packages/contracts/source/data-component-contracts.json');
const operationsContracts=read('packages/contracts/source/operations-component-contracts.json');
const aiContracts=read('packages/contracts/source/ai-component-contracts.json');
const designerContracts=read('packages/contracts/source/designer-component-contracts.json');
const serializableCoreTypes=['ui.AppShell','ui.Panel','ui.Button','ui.TextField',...coreContracts.components.map(component=>component.type)];
const coreRegistry={
  registryVersion:coreContracts.registryVersion,
  components:[
    ...previousRegistry.components.map(entry=>entry.type==='ui.AppShell'||entry.type==='ui.Panel'
      ? {...entry,version:'1.2.0',allowedChildren:serializableCoreTypes}
      : entry),
    ...coreContracts.components.map(({schemaFile,propsSchema,...entry})=>({...entry,propsSchema:schemaFile}))
  ]
};
const serializableDataTypes=['ui.DataGrid','ui.KpiCard',...dataContracts.components.map(component=>component.type)];
const activeContainerTypes=[...serializableCoreTypes,...serializableDataTypes];
const dataRegistry={
  registryVersion:dataContracts.registryVersion,
  components:[
    ...coreRegistry.components.map(entry=>entry.type==='ui.AppShell'||entry.type==='ui.Panel'
      ? {...entry,version:'1.3.0',allowedChildren:activeContainerTypes}
      : entry.type==='ui.DataGrid'||entry.type==='ui.KpiCard'?{...entry,version:'1.3.0'}:entry),
    ...dataContracts.components.map(({schemaFile,propsSchema,...entry})=>({...entry,propsSchema:schemaFile}))
  ]
};
const serializableOperationTypes=['ui.ActivityFeed',...operationsContracts.components.map(component=>component.type)];
const allContainerTypes=[...activeContainerTypes,...serializableOperationTypes];
const operationsRegistry={
  registryVersion:operationsContracts.registryVersion,
  components:[
    ...dataRegistry.components.map(entry=>entry.type==='ui.AppShell'||entry.type==='ui.Panel'
      ? {...entry,version:'1.4.0',allowedChildren:allContainerTypes}
      : entry.type==='ui.ActivityFeed'?{...entry,version:'1.4.0'}:entry),
    ...operationsContracts.components.map(({schemaFile,propsSchema,...entry})=>({...entry,propsSchema:schemaFile}))
  ]
};
const serializableAiTypes=aiContracts.components.map(component=>component.type);
const finalContainerTypes=[...allContainerTypes,...serializableAiTypes];
const aiRegistry={
  registryVersion:aiContracts.registryVersion,
  components:[
    ...operationsRegistry.components.map(entry=>entry.type==='ui.AppShell'||entry.type==='ui.Panel'
      ? {...entry,version:'1.5.0',allowedChildren:finalContainerTypes}:entry),
    ...aiContracts.components.map(({schemaFile,propsSchema,...entry})=>({...entry,propsSchema:schemaFile}))
  ]
};
const serializableDesignerTypes=designerContracts.components.map(component=>component.type);
const completeContainerTypes=[...finalContainerTypes,...serializableDesignerTypes];
const registry={registryVersion:designerContracts.registryVersion,components:[
  ...aiRegistry.components.map(entry=>entry.type==='ui.AppShell'||entry.type==='ui.Panel'?{...entry,version:'1.6.0',allowedChildren:completeContainerTypes}:entry),
  ...designerContracts.components.map(({schemaFile,propsSchema,...entry})=>({...entry,propsSchema:schemaFile}))
]};
const generatedContracts=[...coreContracts.components,...dataContracts.components,...operationsContracts.components,...aiContracts.components,...designerContracts.components];
for(const contract of generatedContracts){
  output(`packages/contracts/${contract.schemaFile}`,JSON.stringify(contract.propsSchema,null,2)+'\n');
}
output('packages/contracts/fixtures/component-registry.v1.2.0.json',JSON.stringify(coreRegistry,null,2)+'\n');
output('packages/contracts/fixtures/component-registry.v1.3.0.json',JSON.stringify(dataRegistry,null,2)+'\n');
output('packages/contracts/fixtures/component-registry.v1.4.0.json',JSON.stringify(operationsRegistry,null,2)+'\n');
output('packages/contracts/fixtures/component-registry.v1.5.0.json',JSON.stringify(aiRegistry,null,2)+'\n');
output('packages/contracts/fixtures/component-registry.v1.6.0.json',JSON.stringify(registry,null,2)+'\n');
if (new Set(registry.components.map(x=>x.type)).size!==registry.components.length) throw new Error('Duplicate registry entries');
const supported = new Set(['string','number','integer','boolean']);
function tsOf(s){
  if (Object.keys(s).length===0) return 'unknown';
  if (s.$ref) return 'unknown';
  if (s.oneOf) return s.oneOf.map(tsOf).join(' | ');
  if (s.enum) return s.enum.map(x=>JSON.stringify(x)).join(' | ');
  if (s.const!==undefined) return JSON.stringify(s.const);
  if (Array.isArray(s.type)) return s.type.map(type=>type==='null'?'null':tsOf({...s,type})).join(' | ');
  if (s.type && supported.has(s.type)) return s.type==='integer'?'number':s.type;
  if (s.type==='array') return s.items?`Array<${tsOf(s.items)}>`:'unknown[]';
  if (s.type==='object' && s.properties) return `{ ${Object.entries(s.properties).map(([k,v])=>`${JSON.stringify(k)}${s.required?.includes(k)?'':'?'}: ${tsOf(v)}`).join('; ')} }`;
  if (s.type==='object' && s.additionalProperties) return `Record<string, ${s.additionalProperties===true?'unknown':tsOf(s.additionalProperties)}>`;
  if (s.type==='object') return 'Record<string, unknown>';
  throw new Error('Unsupported generated type; review schema generator for '+JSON.stringify(s));
}
let out='// GENERATED from canonical JSON Schemas and component registry. DO NOT EDIT.\n';
const index={};
for(const comp of registry.components){
 const schema=read('packages/contracts/'+comp.propsSchema);
 if(schema.type!=='object'||schema.additionalProperties!==false||!schema.properties)throw new Error('Unsupported root props schema: '+comp.type);
 const name=comp.type.slice(3)+'SerializedProps';
 out += `export interface ${name} {\n`;
 for(const [key,val] of Object.entries(schema.properties)) out += `  ${JSON.stringify(key)}${schema.required?.includes(key)?'':'?'}: ${tsOf(val)};\n`;
 out+='}\n'; index[comp.type]=name;
}
out+='export interface SerializablePropsByComponent {\n';
for(const [k,v] of Object.entries(index))out+=`  ${JSON.stringify(k)}: ${v};\n`;
out+='}\n';
out+='export type SerializableComponentType = keyof SerializablePropsByComponent;\n';
output('packages/contracts/src/generated/serialized-props.ts',out);
const componentSchemas=Object.fromEntries(registry.components.map(component=>[
  component.type,
  generatedContracts.find(contract=>contract.type===component.type)?.propsSchema ?? read('packages/contracts/'+component.propsSchema)
]));
const registryDocuments=[registry,aiRegistry,operationsRegistry,dataRegistry,coreRegistry,previousRegistry,read('packages/contracts/fixtures/component-registry.v1.0.0.json')];
const bundle={registryDocument: registry,
 registryDocuments,
 declarativeExceptions:[...coreContracts.exceptions,...dataContracts.exceptions,...operationsContracts.exceptions,...aiContracts.exceptions,...designerContracts.exceptions],
 documentSchema:read('packages/contracts/schemas/design-document.schema.json'),
 registrySchema:read('packages/contracts/schemas/component-registry.schema.json'),
 proposalSchema:read('packages/contracts/schemas/patch-proposal.schema.json'),
 componentSchemas};
output('packages/contracts/src/generated/schema-bundle.ts',
  '// GENERATED — source of truth: schemas/, versioned registry fixtures, and source component contracts.\n'+
  Object.entries(bundle).map(([name,value])=>`export const ${name} = ${JSON.stringify(value)} as const;\n`).join(''));

const tokens=read('packages/tokens/source/design-tokens.json');
const tokenAt=(path)=>path.split('.').reduce((value,key)=>value?.[key],tokens);
const resolveTokenValue=(value,seen=[])=>{
  if(typeof value==='string'){
    const match=value.match(/^\{([^}]+)\}$/);
    if(!match)return value;
    const path=match[1];
    if(seen.includes(path))throw new Error('Circular token alias: '+[...seen,path].join(' -> '));
    const token=tokenAt(path);
    if(!token || !Object.hasOwn(token,'$value'))throw new Error('Unknown token alias: '+path);
    return resolveTokenValue(token.$value,[...seen,path]);
  }
  return value;
};
const cssValue=(path)=>{
  const token=tokenAt(path);
  if(!token || !Object.hasOwn(token,'$value'))throw new Error('Missing token: '+path);
  const value=resolveTokenValue(token.$value,[path]);
  if(token.$type==='shadow'){
    if(!value || typeof value!=='object' || Array.isArray(value))throw new Error('Invalid shadow token: '+path);
    return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread} ${value.color}`;
  }
  if(Array.isArray(value))return value.map(item=>JSON.stringify(item)).join(', ');
  if(['string','number'].includes(typeof value))return String(value);
  throw new Error('Unsupported CSS token value: '+path);
};
const vars=(entries,indent='    ')=>entries.map(([name,path])=>`${indent}--ui-${name}: ${cssValue(path)};`).join('\n');
const foundation=[
  ...Object.keys(tokens.foundation.space).map(key=>[`space-${key}`,`foundation.space.${key}`]),
  ...Object.keys(tokens.foundation.radius).map(key=>[`radius-${key}`,`foundation.radius.${key}`]),
  ...Object.keys(tokens.foundation.typography.size).map(key=>[`font-size-${key}`,`foundation.typography.size.${key}`]),
  ['font-body','foundation.typography.family.body'],
  ['font-mono','foundation.typography.family.mono'],
  ...Object.keys(tokens.foundation.typography.lineHeight).map(key=>[`line-height-${key}`,`foundation.typography.lineHeight.${key}`]),
  ...Object.keys(tokens.foundation.motion.duration).map(key=>[`motion-${key}`,`foundation.motion.duration.${key}`]),
  ...Object.keys(tokens.foundation.shadow).map(key=>[`shadow-${key}`,`foundation.shadow.${key}`]),
  ...Object.keys(tokens.foundation.layer).map(key=>[`z-${key}`,`foundation.layer.${key}`]),
];
const colorPaths=[
  ['color-bg-canvas','color.background.canvas'], ['color-bg-surface','color.background.surface'],
  ['color-bg-raised','color.background.raised'], ['color-bg-inset','color.background.inset'],
  ['color-text-primary','color.text.primary'], ['color-text-secondary','color.text.secondary'],
  ['color-text-tertiary','color.text.tertiary'], ['color-border-default','color.border.default'],
  ['color-border-strong','color.border.strong'], ['color-action-primary','color.action.primary'],
  ['color-action-primary-hover','color.action.primaryHover'], ['color-action-on-primary','color.action.onPrimary'],
  ['color-action-selected-bg','color.action.selectedBackground'], ['color-action-selected-text','color.action.selectedText'],
  ['color-focus-ring','color.focus.ring'],
  ...['success','warning','danger','info'].flatMap(status=>['background','border','text'].map(role=>[
    `color-status-${status}-${role==='background'?'bg':role}`,
    `color.status.${status}.${role}`
  ]))
];
const semantic=(theme)=>vars(colorPaths.map(([name,path])=>[name,`semantic.${theme}.${path}`]));
const density=(name)=>vars([
  ['size-control',`foundation.density.${name}.control`], ['size-toolbar',`foundation.density.${name}.toolbar`],
  ['size-table-row',`foundation.density.${name}.tableRow`], ['size-nav-item',`foundation.density.${name}.navigationItem`],
  ['size-tab',`foundation.density.${name}.tab`], ['size-page-gutter',`foundation.density.${name}.pageGutter`]
]);
const theme=`/* GENERATED from packages/tokens/source/design-tokens.json. DO NOT EDIT. */
@layer ui.tokens, ui.components, ui.utilities;

@layer ui.tokens {
  :root {
${vars(foundation)}
  }

  :root, [data-ui-theme="light"] {
    color-scheme: light;
${semantic('light')}
  }

  [data-ui-theme="dark"] {
    color-scheme: dark;
${semantic('dark')}
  }

  [data-ui-contrast="high"] {
    --ui-color-bg-canvas: Canvas;
    --ui-color-bg-surface: Canvas;
    --ui-color-bg-raised: Canvas;
    --ui-color-bg-inset: Canvas;
    --ui-color-text-primary: CanvasText;
    --ui-color-text-secondary: CanvasText;
    --ui-color-text-tertiary: CanvasText;
    --ui-color-border-default: CanvasText;
    --ui-color-border-strong: CanvasText;
    --ui-color-action-primary: Highlight;
    --ui-color-action-primary-hover: Highlight;
    --ui-color-action-on-primary: HighlightText;
    --ui-color-action-selected-bg: Highlight;
    --ui-color-action-selected-text: HighlightText;
    --ui-color-focus-ring: Highlight;
  }

  :root, [data-ui-density="comfortable"] {
${density('comfortable')}
  }

  [data-ui-density="compact"] {
${density('compact')}
  }

  @media (pointer: coarse) {
    :root, [data-ui-density="comfortable"], [data-ui-density="compact"] {
      --ui-size-control: ${cssValue('foundation.density.touch.interactiveTarget')};
      --ui-size-table-row: ${cssValue('foundation.density.touch.tableRow')};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --ui-motion-fast: 0ms;
      --ui-motion-normal: 0ms;
      --ui-motion-slow: 0ms;
    }
  }
}
`;
output('packages/tokens/dist/theme.css',theme);
if(drift)process.exitCode=1;
