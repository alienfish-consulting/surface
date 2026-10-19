import * as React from 'react';
import {test,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {assertDesignDocument,registryVersion} from '@enterprise-ui/contracts';
import type {DesignDocument} from '@enterprise-ui/contracts';
import {DesignRenderer} from '@enterprise-ui/react-renderer';
import {Button} from '@enterprise-ui/react-core';
import fixture from '../packages/contracts/fixtures/vertical-slice.design.json';
test('renders same versioned fixture from registry',()=>{
 const html=renderToStaticMarkup(<DesignRenderer doc={assertDesignDocument(fixture)} host={{data:{metrics:{activeCustomers:1240,revenue:90000},form:{query:''}},requestAction:()=>{}}}/>);
 expect(html).toContain('Active customers');expect(html).toContain('1,240');expect(html).toContain('Customer search');
});
test('supports direct JSX on same components',()=>{
 expect(renderToStaticMarkup(<Button label="Direct JSX"/>)).toContain('Direct JSX');
});
test('fails closed for schema-only catalog entries without runtime adapters',()=>{
 const schemaOnly=structuredClone(assertDesignDocument(fixture));
 const node=schemaOnly.root.children![0]!.children![0]!;
 node.type='ui.DataGrid';
 node.props={title:'Customers',columns:[{key:'name',label:'Name'}]};
 delete node.bindings;
 expect(()=>renderToStaticMarkup(<DesignRenderer doc={schemaOnly} host={{data:{},requestAction:()=>{}}}/>))
  .toThrow('Cataloged but not implemented: ui.DataGrid');
});
test('renders the foundational serialized subset and emits only named host intentions',()=>{
 const requests:unknown[]=[];
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'core-render',revision:0,kind:'form',themeId:'default',density:'comfortable',dataSources:[],actionIds:['form.change'],root:{id:'page',type:'ui.PageLayout',props:{},children:[{id:'field',type:'ui.Select',props:{label:'Environment',options:[{value:'prod',label:'Production'}]},intents:{onChange:{actionId:'form.change'}}}]}};
 const html=renderToStaticMarkup(<DesignRenderer doc={document} host={{data:{},requestAction:request=>{requests.push(request)}}}/>);
 expect(html).toContain('Environment');expect(html).toContain('Production');expect(requests).toEqual([]);
});
