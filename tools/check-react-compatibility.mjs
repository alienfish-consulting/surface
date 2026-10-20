import {mkdtempSync,readdirSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const requested=process.argv[2];
const supported=new Set(['18.2.0','19.0.0']);
if(!requested || !supported.has(requested))throw new Error('Pass React version 18.2.0 or 19.0.0');

const releaseDirectory=resolve(root,'.release');
const archives=readdirSync(releaseDirectory).filter(file=>file.endsWith('.tgz')).sort();
if(archives.length!==9)throw new Error('Run pnpm release:pack before the React compatibility check');
const cleanEnvironment=Object.fromEntries(Object.entries(process.env).filter(([key])=>!key.toLowerCase().startsWith('npm_config_')));

const temporaryDirectory=mkdtempSync(resolve(tmpdir(),'surface-react-compat-'));
try{
  const reactTypes=requested.startsWith('18.')?'^18.2.0':'^19.0.0';
  const dependencies={react:requested,'react-dom':requested,'@types/react':reactTypes,'@types/react-dom':reactTypes,typescript:'^5.9.0'};
  for(const archive of archives){
    const match=archive.match(/^alienfishconsulting-surface-(.+)-1\.0\.0\.tgz$/);
    if(!match)throw new Error(`Unexpected tarball name: ${archive}`);
    dependencies[`@alienfishconsulting/surface-${match[1]}`]=`file:${resolve(releaseDirectory,archive)}`;
  }
  writeFileSync(resolve(temporaryDirectory,'package.json'),JSON.stringify({private:true,type:'module',dependencies},null,2)+'\n');
  writeFileSync(resolve(temporaryDirectory,'tsconfig.json'),JSON.stringify({compilerOptions:{target:'ES2022',module:'NodeNext',moduleResolution:'NodeNext',jsx:'react-jsx',strict:true,skipLibCheck:false,noEmit:true},include:['verify.tsx']},null,2)+'\n');
  writeFileSync(resolve(temporaryDirectory,'verify.tsx'),`import {Button} from '@alienfishconsulting/surface-react-core';
import {DesignRenderer} from '@alienfishconsulting/surface-react-renderer';
import {registryVersion,type DesignDocument} from '@alienfishconsulting/surface-contracts';
import {createBrowserBridge} from '@alienfishconsulting/surface-electron-bridge';
const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'types',revision:0,kind:'form',themeId:'default',density:'comfortable',dataSources:[],actionIds:[],root:{id:'button',type:'ui.Button',props:{label:'Typed'}}};
export const view=<><Button label="Typed"/><DesignRenderer doc={document} host={{data:{},requestAction(request){void request.actionId;}}}/></>;
void createBrowserBridge();
`);
  writeFileSync(resolve(temporaryDirectory,'verify.mjs'),`import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Button} from '@alienfishconsulting/surface-react-core';
import {DesignRenderer} from '@alienfishconsulting/surface-react-renderer';
import {registryVersion} from '@alienfishconsulting/surface-contracts';
import {createBrowserBridge} from '@alienfishconsulting/surface-electron-bridge';
const button=renderToStaticMarkup(React.createElement(Button,{label:'Continue'}));
if(!button.includes('Continue'))throw new Error('Core component render failed');
const document={schemaVersion:'1.0.0',registryVersion,id:'compat',revision:0,kind:'form',themeId:'default',density:'comfortable',dataSources:[],actionIds:[],root:{id:'button',type:'ui.Button',props:{label:'Compatibility'}}};
const rendered=renderToStaticMarkup(React.createElement(DesignRenderer,{doc:document,host:{data:{},requestAction(){}}}));
if(!rendered.includes('Compatibility'))throw new Error('Declarative renderer failed');
if(createBrowserBridge().available)throw new Error('Browser bridge must remain inert');
console.log('React ${requested} compatibility verified');
`);
  const install=spawnSync('npm',['install','--ignore-scripts','--no-audit','--no-fund'],{cwd:temporaryDirectory,env:cleanEnvironment,stdio:'inherit'});
  if(install.status!==0)throw new Error(`Consumer install failed with React ${requested}`);
  const typecheck=spawnSync(resolve(temporaryDirectory,'node_modules/.bin/tsc'),['-p','tsconfig.json'],{cwd:temporaryDirectory,env:cleanEnvironment,stdio:'inherit'});
  if(typecheck.status!==0)throw new Error(`Consumer type check failed with React ${requested}`);
  const verify=spawnSync(process.execPath,[resolve(temporaryDirectory,'verify.mjs')],{cwd:temporaryDirectory,stdio:'inherit'});
  if(verify.status!==0)throw new Error(`Consumer verification failed with React ${requested}`);
} finally {
  rmSync(temporaryDirectory,{recursive:true,force:true});
}
