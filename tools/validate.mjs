import {readFileSync} from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const schema=read('packages/contracts/schemas/design-document.schema.json');
const registry=read('packages/contracts/fixtures/component-registry.json');
const ajv=new Ajv2020({allErrors:true,strict:false});
const validDoc=ajv.compile(schema);
const validProps=new Map(registry.components.map(c=>[c.type,ajv.compile(read('packages/contracts/'+c.propsSchema))]));
const d=read('packages/contracts/fixtures/vertical-slice.design.json');
if(!validDoc(d)) throw new Error(JSON.stringify(validDoc.errors));
function walk(n,parent){
 const info=registry.components.find(c=>c.type===n.type);if(!info)throw new Error('Unknown '+n.type);
 if(parent && !parent.allowedChildren.includes(n.type))throw new Error('Not a legal child: '+n.type);
 if(!validProps.get(n.type)(n.props))throw new Error('Props invalid '+n.type);
 for(const child of n.children??[])walk(child,info);
}
walk(d.root);
console.log('Validated canonical Draft 2020-12 fixture, 7 registry entries, and child relationships.');
