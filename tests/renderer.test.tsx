import * as React from 'react';
import {test,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {assertDesignDocument} from '@enterprise-ui/contracts';
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
