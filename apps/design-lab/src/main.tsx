import * as React from 'react';
import {createRoot} from 'react-dom/client';
import '@enterprise-ui/tokens/theme.css';
import '../../../packages/react-core/src/styles.css';
import '../../../packages/react-data/src/styles.css';
import '../../../packages/react-operations/src/styles.css';
import './styles.css';
import fixture from '../../../packages/contracts/fixtures/vertical-slice.design.json';
import {assertDesignDocument,previewProposal} from '@enterprise-ui/contracts';
import type {DesignDocument,Proposal} from '@enterprise-ui/contracts';
import {DesignRenderer} from '@enterprise-ui/react-renderer';
import type {Host,HostActionRequest} from '@enterprise-ui/react-renderer';
import {PropertyInspector} from '@enterprise-ui/react-designers';
import {AppShell,Panel,Button,ComboBox,Dialog,DockWorkspace} from '@enterprise-ui/react-core';
import {DataGrid,KpiCard} from '@enterprise-ui/react-data';
import type {GridColumnDefinition} from '@enterprise-ui/react-data';
import {ActivityFeed,ApprovalCard} from '@enterprise-ui/react-operations';

const initial=assertDesignDocument(fixture);
const customerColumns:GridColumnDefinition[]=[{key:'name',label:'Customer',sortable:true},{key:'region',label:'Region'},{key:'revenue',label:'Revenue',align:'end'}];
const customerRows=[{id:'acme',name:'Acme Manufacturing',region:'North America',revenue:'$184,200'},{id:'globex',name:'Globex',region:'Europe',revenue:'$121,800'},{id:'initech',name:'Initech',region:'North America',revenue:'$98,400'}];
function App(){
 const [doc,setDoc]=React.useState<DesignDocument>(initial);
 const [proposal,setProposal]=React.useState<Proposal|null>(null);
 const [theme,setTheme]=React.useState<'light'|'dark'>('light');
 const [density,setDensity]=React.useState<'comfortable'|'compact'>('comfortable');
 const [allowed,setAllowed]=React.useState(true);
 const [dialogOpen,setDialogOpen]=React.useState(false);
 const [hostData,setHostData]=React.useState<Record<string,unknown>>({metrics:{activeCustomers:1284,revenue:98340},form:{query:''}});
 const [log,setLog]=React.useState<string[]>(['Host fixture initialized; no backend required.']);
 const [result,setResult]=React.useState('No pending proposal.');
 const [gridQuery,setGridQuery]=React.useState('');
 const [gridSort,setGridSort]=React.useState<{key:string;direction:'ascending'|'descending'}>({key:'name',direction:'ascending'});
 const [approvalResult,setApprovalResult]=React.useState('Pending host decision');
 const addLog=(message:string)=>setLog(prev=>[message,...prev].slice(0,8));
 const host:Host={data:hostData,requestAction:({actionId,nodeId,event,payload}:HostActionRequest)=>{
   if(!allowed){addLog(`DENIED by host: ${actionId} from ${nodeId}`);return;}
   if(actionId==='form.search' && payload!==null && typeof payload==='object' && 'value' in payload && typeof payload.value==='string')
    setHostData(prev=>({...prev,form:{query:payload.value}}));
   addLog(`HOST ACCEPTED intent ${actionId} · ${event}`);
 }};
 let preview:ReturnType<typeof previewProposal>|null=null;
 let error='';
 if(proposal){try{preview=previewProposal(doc,proposal);}catch(e){error=String(e);}}
 return <div className="lab-page" data-ui-theme={theme} data-ui-density={density}>
  <div className="lab-toolbar"><div><span className="lab-overline">Enterprise UI / Development specimen</span><h1>Schema-first Design Lab</h1><p>One registry · One document · React and JSON rendering · Human-reviewed changes</p></div>
   <div className="lab-controls"><label>Theme <select aria-label="Theme" value={theme} onChange={e=>setTheme(e.target.value as 'light'|'dark')}><option>light</option><option>dark</option></select></label>
    <label>Density <select aria-label="Density" value={density} onChange={e=>setDensity(e.target.value as 'comfortable'|'compact')}><option>comfortable</option><option>compact</option></select></label>
    <label className="lab-checkbox"><input type="checkbox" checked={allowed} onChange={e=>setAllowed(e.target.checked)}/> Host authorization</label>
   </div>
  </div>
  <div className="lab-layout"><div className="lab-main"><p className="lab-kicker">DECLARATIVE RUNTIME <code>rev {doc.revision}</code></p>
    <DesignRenderer doc={doc} host={host}/>
    <div className="lab-direct"><p className="lab-kicker">DIRECT JSX CONSUMPTION · SAME COMPONENTS</p>
     <AppShell title="Direct React composition"><Panel title="Example JSX panel"><KpiCard label="Static JSX KPI" value={42} format="integer"/><Button label="JSX action" variant="secondary" onPress={()=>addLog('Host fixture handled direct JSX action')}/></Panel></AppShell>
     <section aria-label="Foundational interaction specimen">
      <h2>Foundational interaction specimen</h2>
      <ComboBox label="Environment" options={[{value:'production',label:'Production'},{value:'staging',label:'Staging'}]} placeholder="Choose an environment"/>
      <Button label="Open focus dialog" onPress={()=>setDialogOpen(true)}/>
      <Dialog open={dialogOpen} title="Confirm deployment" description="Focus moves into this dialog and Escape returns control to the host state." onOpenChange={setDialogOpen} footer={<Button label="Done" onPress={()=>setDialogOpen(false)}/>}>
       <p>No deployment is performed by this local specimen.</p>
      </Dialog>
      <DockWorkspace label="Workspace layout" main={<p>Main editor</p>} start={<p>Explorer</p>} end={<p>Inspector</p>} bottom={<p>Output</p>}/>
     </section>
     <section aria-label="Advanced data specimen">
      <h2>Advanced data specimen</h2>
      <label>Filter customers <input value={gridQuery} onChange={event=>setGridQuery(event.currentTarget.value)}/></label>
      <DataGrid title="Customer accounts" columns={customerColumns} rows={customerRows.filter(row=>row.name.toLowerCase().includes(gridQuery.toLowerCase()))} sort={gridSort} onSortChange={setGridSort}/>
     </section>
     <section aria-label="Operations specimen">
      <h2>Operations specimen</h2>
      <ActivityFeed title="Deployment activity" connection="reconnecting" items={[{id:'2',sequence:2,timestamp:'10:02',message:'Retry scheduled',tone:'warning'},{id:'1',sequence:1,timestamp:'10:01',message:'Connection interrupted'}]}/>
      <ApprovalCard approval={{id:'deploy-42',title:'Resume production rollout',description:'Host authorization is required.',requester:'Release manager',status:'pending',revision:4}} onDecision={(_id,decision,revision)=>setApprovalResult(`${decision} requested for revision ${revision}`)}/>
      <p role="status">{approvalResult}</p>
     </section>
    </div>
  </div>
  <aside className="lab-side"><PropertyInspector document={doc} onPropose={p=>{setProposal(p);setResult('Property change proposed; review the diff and request host approval.');}}/>
    <section className="lab-review" aria-label="Proposal review"><h2>Proposal review</h2>
      {proposal?<><p><strong>{proposal.rationale}</strong></p><code>base revision: {proposal.baseRevision}</code>
       {error?<p className="lab-fail" role="alert">{error}</p>:<><pre>{JSON.stringify(proposal.operations,null,2)}</pre>
        <div className="lab-button-row"><Button label="Request host approval" onPress={()=>{
         if(!preview)return;
         if(!allowed){setResult('Host denied the edit. Document unchanged.');addLog('HOST DENIED proposal '+proposal.proposalId);return;}
         if(doc.revision!==proposal.baseRevision){setResult('Stale document revision. Document unchanged.');return;}
         setDoc(preview.candidate);setProposal(null);setResult('Host authorized and committed new document revision.');addLog('HOST COMMITTED revision '+preview.candidate.revision);
        }}/><Button label="Reject" variant="secondary" onPress={()=>{setProposal(null);setResult('Human rejected proposal. Document unchanged.');}}/></div></>}
      </>:<p className="lab-detail">Use the inspector to propose an edit. Only component properties are allowed in this POC.</p>}
      <p className="lab-result" role="status">{result}</p>
    </section>
    <section className="lab-events"><h2>Host activity</h2><ul aria-live="polite">{log.map((line,i)=><li key={`${i}-${line}`}>{line}</li>)}</ul></section>
    <section className="lab-source"><h2>Source of truth</h2><p>Versioned design JSON is shared by renderer and inspector. No additional persisted designer format.</p><details><summary>Current document JSON</summary><pre>{JSON.stringify(doc,null,2)}</pre></details></section>
  </aside></div>
 </div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
