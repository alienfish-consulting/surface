import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root=process.cwd();
const packageNames=['react-core','react-data','react-operations','react-ai','react-designers'];
const catalog=JSON.parse(fs.readFileSync(path.join(root,'catalog/components.v1.json'),'utf8')).components;
const exclusionDocument=JSON.parse(fs.readFileSync(path.join(root,'catalog/storybook-exclusions.json'),'utf8'));

const walk=(directory,predicate)=>fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
  const target=path.join(directory,entry.name);
  return entry.isDirectory()?walk(target,predicate):predicate(target)?[target]:[];
});
const parse=file=>ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('x')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
const capitalized=name=>/^[A-Z]/.test(name);
const jsxNames=node=>{
  const names=new Set();
  const visit=current=>{
    if((ts.isJsxOpeningElement(current)||ts.isJsxSelfClosingElement(current))&&ts.isIdentifier(current.tagName)&&capitalized(current.tagName.text))names.add(current.tagName.text);
    ts.forEachChild(current,visit);
  };
  visit(node);
  return names;
};

const graph=new Map();
const addDeclaration=(name,node)=>{
  if(!capitalized(name))return;
  const dependencies=graph.get(name)??new Set();
  for(const dependency of jsxNames(node))dependencies.add(dependency);
  graph.set(name,dependencies);
};

const storyFiles=[];
for(const packageName of packageNames){
  const sourceRoot=path.join(root,'packages',packageName,'src');
  for(const file of walk(sourceRoot,target=>/\.tsx?$/.test(target))){
    if(file.includes(`${path.sep}stories${path.sep}`)||file.includes(`${path.sep}generated${path.sep}`))continue;
    const source=parse(file);
    for(const statement of source.statements){
      const exported=statement.modifiers?.some(modifier=>modifier.kind===ts.SyntaxKind.ExportKeyword);
      if(exported&&(ts.isFunctionDeclaration(statement)||ts.isClassDeclaration(statement))&&statement.name)addDeclaration(statement.name.text,statement);
      if(exported&&ts.isVariableStatement(statement))for(const declaration of statement.declarationList.declarations){
        if(ts.isIdentifier(declaration.name))addDeclaration(declaration.name.text,declaration.initializer??declaration);
      }
    }
  }
  const storiesRoot=path.join(sourceRoot,'stories');
  if(fs.existsSync(storiesRoot))storyFiles.push(...walk(storiesRoot,target=>/\.stories\.tsx?$/.test(target)));
}

const roots=new Set();
let storyCount=0;
for(const file of storyFiles){
  const source=parse(file);
  for(const name of jsxNames(source))roots.add(name);
  const visit=current=>{
    if(ts.isPropertyAssignment(current)&&ts.isIdentifier(current.name)&&current.name.text==='component'&&ts.isIdentifier(current.initializer))roots.add(current.initializer.text);
    if(ts.isVariableStatement(current)&&current.modifiers?.some(modifier=>modifier.kind===ts.SyntaxKind.ExportKeyword))storyCount+=current.declarationList.declarations.length;
    ts.forEachChild(current,visit);
  };
  visit(source);
}

const reached=new Set();
const visit=name=>{
  if(reached.has(name))return;
  reached.add(name);
  for(const dependency of graph.get(name)??[])visit(dependency);
};
for(const rootName of roots)visit(rootName);

const catalogById=new Map(catalog.map(component=>[component.id,component]));
const exclusionIds=new Set();
const errors=[];
if(exclusionDocument.schemaVersion!==1)errors.push('catalog/storybook-exclusions.json must use schemaVersion 1.');
for(const exclusion of exclusionDocument.exclusions??[]){
  if(exclusionIds.has(exclusion.id))errors.push(`Duplicate Storybook exclusion: ${exclusion.id}`);
  exclusionIds.add(exclusion.id);
  const component=catalogById.get(exclusion.id);
  if(!component)errors.push(`Unknown Storybook exclusion: ${exclusion.id}`);
  if(typeof exclusion.reason!=='string'||exclusion.reason.trim().length<20)errors.push(`Storybook exclusion requires a specific reason: ${exclusion.id}`);
  if(component&&reached.has(component.name))errors.push(`Remove covered component from Storybook exclusions: ${exclusion.id}`);
}

for(const component of catalog){
  if(!graph.has(component.name))errors.push(`Catalog component has no exported runtime declaration: ${component.id}`);
}
const missing=catalog.filter(component=>!reached.has(component.name)&&!exclusionIds.has(component.id));
for(const component of missing)errors.push(`Catalog component is not rendered by Storybook: ${component.id}`);

if(errors.length){
  console.error(`Storybook coverage check failed with ${errors.length} issue(s):`);
  for(const error of errors)console.error(`- ${error}`);
  process.exit(1);
}

const covered=catalog.filter(component=>reached.has(component.name)).length;
console.log(`Storybook coverage passed: ${catalog.length} catalog units accounted for; ${covered} rendered; ${exclusionIds.size} documented nonvisual exclusions; ${storyCount} stories in ${storyFiles.length} files.`);
