import * as React from 'react';
import '@alienfishconsulting/surface-tokens/theme.css';
import '../../../packages/react-core/src/styles.css';
import '../../../packages/react-data/src/styles.css';
import '../../../packages/react-operations/src/styles.css';
import '../../../packages/react-ai/src/styles.css';
import '../../../packages/react-designers/src/styles.css';
import './styles.css';
import fixture from '../../../packages/contracts/fixtures/vertical-slice.design.json';
import {assertDesignDocument,previewProposal} from '@alienfishconsulting/surface-contracts';
import type {DesignDocument,Proposal} from '@alienfishconsulting/surface-contracts';
import {DesignRenderer} from '@alienfishconsulting/surface-react-renderer';
import type {Host,HostActionRequest} from '@alienfishconsulting/surface-react-renderer';
import {PropertyInspector} from '@alienfishconsulting/surface-react-designers';
import {Avatar,Badge,Button,ComboBox,Dialog,DockWorkspace} from '@alienfishconsulting/surface-react-core';
import {Chart,DataGrid,KpiCard} from '@alienfishconsulting/surface-react-data';
import type {GridColumnDefinition} from '@alienfishconsulting/surface-react-data';
import {ActivityFeed,ApprovalCard,ServiceHealthGrid} from '@alienfishconsulting/surface-react-operations';
import {ApprovalReview,ToolCallCard} from '@alienfishconsulting/surface-react-ai';
import {createBrowserBridge} from '@alienfishconsulting/surface-electron-bridge';

type SectionId='overview'|'customers'|'operations'|'design-studio';
type IconName='overview'|'customers'|'operations'|'studio'|'search'|'bell'|'menu';

const initial=assertDesignDocument(fixture);
const desktopBridge=createBrowserBridge();
const customerColumns:GridColumnDefinition[]=[
 {key:'name',label:'Customer',sortable:true},
 {key:'plan',label:'Plan'},
 {key:'region',label:'Region'},
 {key:'status',label:'Status'},
 {key:'revenue',label:'Revenue',align:'end'},
];
const customerRows=[
 {id:'acme',name:'Acme Manufacturing',plan:'Enterprise',region:'North America',status:'Healthy',revenue:'$184,200'},
 {id:'globex',name:'Globex',plan:'Enterprise',region:'Europe',status:'Review',revenue:'$121,800'},
 {id:'initech',name:'Initech',plan:'Growth',region:'North America',status:'Healthy',revenue:'$98,400'},
 {id:'hooli',name:'Hooli',plan:'Enterprise',region:'Asia Pacific',status:'Healthy',revenue:'$87,250'},
 {id:'stark',name:'Stark Industries',plan:'Growth',region:'Europe',status:'At risk',revenue:'$76,900'},
];
const revenueData=[
 {x:'May',y:286},{x:'Jun',y:318},{x:'Jul',y:304},{x:'Aug',y:371},
 {x:'Sep',y:402},{x:'Oct',y:438},{x:'Nov',y:465},{x:'Dec',y:512},
];
const navigation:ReadonlyArray<{id:SectionId;label:string;icon:IconName}>=[
 {id:'overview',label:'Overview',icon:'overview'},
 {id:'customers',label:'Customers',icon:'customers'},
 {id:'operations',label:'Operations',icon:'operations'},
 {id:'design-studio',label:'Design studio',icon:'studio'},
];

function Icon({name}:Readonly<{name:IconName}>){
 const paths:Record<IconName,React.ReactNode>={
  overview:<><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  customers:<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  operations:<><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/><path d="M2 19h22"/></>,
  studio:<><path d="m12 3-8 4.5 8 4.5 8-4.5L12 3Z"/><path d="m4 12.5 8 4.5 8-4.5M4 17.5l8 4.5 8-4.5"/></>,
  search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  menu:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
 };
 return <svg className="lab-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function App(){
 const [doc,setDoc]=React.useState<DesignDocument>(initial);
 const [proposal,setProposal]=React.useState<Proposal|null>(null);
 const [theme,setTheme]=React.useState<'light'|'dark'>('light');
 const [density,setDensity]=React.useState<'comfortable'|'compact'>('comfortable');
 const [allowed,setAllowed]=React.useState(true);
 const [dialogOpen,setDialogOpen]=React.useState(false);
 const [mobileNavOpen,setMobileNavOpen]=React.useState(false);
 const [activeSection,setActiveSection]=React.useState<SectionId>('overview');
 const [hostData,setHostData]=React.useState<Record<string,unknown>>({metrics:{activeCustomers:1284,revenue:98340},form:{query:''}});
 const [log,setLog]=React.useState<string[]>(['Host fixture initialized; no backend required.']);
 const [result,setResult]=React.useState('No pending proposal.');
 const [gridQuery,setGridQuery]=React.useState('');
 const [globalQuery,setGlobalQuery]=React.useState('');
 const [gridSort,setGridSort]=React.useState<{key:string;direction:'ascending'|'descending'}>({key:'name',direction:'ascending'});
 const [approvalResult,setApprovalResult]=React.useState('Pending host decision');
 const [agentReview,setAgentReview]=React.useState('Awaiting human review');
 const addLog=(message:string)=>setLog(previous=>[message,...previous].slice(0,8));
 const goToSection=(id:SectionId)=>{
  setActiveSection(id);
  setMobileNavOpen(false);
  document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
 };
 const host:Host={data:hostData,requestAction:({actionId,nodeId,event,payload}:HostActionRequest)=>{
  if(!allowed){addLog(`DENIED by host: ${actionId} from ${nodeId}`);return;}
  if(actionId==='form.search'&&payload!==null&&typeof payload==='object'&&'value' in payload&&typeof payload.value==='string'){
   setHostData(previous=>({...previous,form:{query:payload.value}}));
  }
  addLog(`HOST ACCEPTED intent ${actionId} · ${event}`);
 }};
 let preview:ReturnType<typeof previewProposal>|null=null;
 let error='';
 if(proposal){try{preview=previewProposal(doc,proposal);}catch(reason){error=String(reason);}}
 const visibleCustomers=customerRows.filter(row=>`${row.name} ${row.plan} ${row.region} ${row.status}`.toLowerCase().includes(gridQuery.toLowerCase()));

 return <div className="lab-page" data-ui-theme={theme} data-ui-density={density}>
  <a className="lab-skip-link" href="#dashboard-main">Skip to dashboard content</a>
  <div className="lab-shell">
   <aside className={`lab-sidebar ${mobileNavOpen?'lab-sidebar-open':''}`} aria-label="Application sidebar" data-ui-theme="dark">
    <div className="lab-brand"><span className="lab-brand-mark" aria-hidden="true">◈</span><span><strong>Surface</strong><small>by AlienFish</small></span></div>
    <button className="lab-workspace-switcher" type="button" onClick={()=>addLog('Workspace switcher opened')}>
     <span className="lab-workspace-monogram" aria-hidden="true">AC</span><span><strong>Acme Cloud</strong><small>Production workspace</small></span><span aria-hidden="true">⌄</span>
    </button>
    <nav className="lab-navigation" aria-label="Primary navigation">
     <span className="lab-nav-label">Workspace</span>
     {navigation.map(item=><button key={item.id} type="button" aria-current={activeSection===item.id?'page':undefined} onClick={()=>goToSection(item.id)}><Icon name={item.icon}/><span>{item.label}</span>{item.id==='operations'&&<span className="lab-nav-count">3</span>}</button>)}
    </nav>
    <div className="lab-sidebar-spacer"/>
    <section className="lab-plan-card" aria-label="Workspace usage"><span>Workspace usage</span><strong>72% of monthly events</strong><div aria-hidden="true"><span/></div><button type="button" onClick={()=>addLog('Plan details requested')}>View plan details</button></section>
    <div className="lab-profile"><Avatar name="Lee Allen" size="sm"/><span><strong>Lee Allen</strong><small>Workspace admin</small></span><button type="button" aria-label="Open account menu">•••</button></div>
   </aside>
   {mobileNavOpen&&<button className="lab-nav-scrim" type="button" aria-label="Close navigation" onClick={()=>setMobileNavOpen(false)}/>}

   <div className="lab-content">
    <header className="lab-topbar">
     <button className="lab-mobile-menu" type="button" aria-label="Open navigation" aria-expanded={mobileNavOpen} onClick={()=>setMobileNavOpen(value=>!value)}><Icon name="menu"/></button>
     <div className="lab-global-search"><Icon name="search"/><label className="ui-sr-only" htmlFor="global-search">Search dashboard</label><input id="global-search" type="search" placeholder="Search customers, events, or commands" value={globalQuery} onChange={event=>setGlobalQuery(event.currentTarget.value)}/><kbd>⌘ K</kbd></div>
     <div className="lab-topbar-actions">
      <label>Theme <select aria-label="Theme" value={theme} onChange={event=>setTheme(event.target.value as 'light'|'dark')}><option>light</option><option>dark</option></select></label>
      <label>Density <select aria-label="Density" value={density} onChange={event=>setDensity(event.target.value as 'comfortable'|'compact')}><option>comfortable</option><option>compact</option></select></label>
      <button className="lab-icon-button" type="button" aria-label="Notifications"><Icon name="bell"/><span className="lab-notification-dot"/></button>
     </div>
    </header>

    <main id="dashboard-main" className="lab-dashboard">
     <section id="overview" className="lab-section lab-overview" aria-labelledby="overview-title">
      <div className="lab-page-heading">
       <div><p className="lab-eyebrow">Monday, October 19</p><h1 id="overview-title">Operations overview</h1><p>Here is what is happening across your customer platform today.</p></div>
       <div className="lab-heading-actions"><Button label="Export report" variant="secondary" onPress={()=>addLog('Dashboard report export requested')}/><Button label="Create workflow" onPress={()=>addLog('Workflow creation requested')}/></div>
      </div>

      <div className="lab-status-banner" role="status"><span className="lab-status-pulse" aria-hidden="true"/><div><strong>All systems operational</strong><span>12 services healthy · Last checked 2 minutes ago</span></div><button type="button" onClick={()=>goToSection('operations')}>View system status <span aria-hidden="true">→</span></button></div>

      <div className="lab-kpi-grid" aria-label="Business summary">
       <KpiCard label="Monthly revenue" value={2483900} format="currency" trend={12.4}/>
       <KpiCard label="Active customers" value={1284} format="integer" trend={8.2}/>
       <KpiCard label="Conversion rate" value={0.184} format="percent" trend={2.1}/>
       <KpiCard label="Open incidents" value={3} format="integer" trend={-25}/>
      </div>

      <div className="lab-overview-grid">
       <section className="lab-card lab-revenue-card" aria-labelledby="revenue-title">
        <div className="lab-card-heading"><div><span>Revenue performance</span><h2 id="revenue-title">$2.48M <small>+12.4%</small></h2></div><select aria-label="Revenue period" defaultValue="8-months"><option value="8-months">Last 8 months</option><option value="year">This year</option></select></div>
        <Chart title="Monthly recurring revenue in thousands" data={revenueData} type="area" height={240} valueLabel="thousand dollars"/>
       </section>
       <section className="lab-card lab-activity-card" aria-label="Recent activity">
        <div className="lab-card-heading"><div><span>Live workspace</span><h2>Recent activity</h2></div><button type="button" onClick={()=>goToSection('operations')}>View all</button></div>
        <ol className="lab-activity-list">
         <li><span className="lab-event-icon lab-event-success">✓</span><div><strong>Deployment completed</strong><p>API gateway · production</p><time>8 minutes ago</time></div></li>
         <li><span className="lab-event-icon lab-event-info">↗</span><div><strong>Enterprise account upgraded</strong><p>Hooli moved to annual billing</p><time>34 minutes ago</time></div></li>
         <li><span className="lab-event-icon lab-event-warning">!</span><div><strong>Usage threshold reached</strong><p>Globex exceeded 80% of plan</p><time>1 hour ago</time></div></li>
         <li><span className="lab-event-icon lab-event-neutral">+</span><div><strong>New workspace member</strong><p>Maya Chen joined Operations</p><time>2 hours ago</time></div></li>
        </ol>
       </section>
      </div>
     </section>

     <section id="customers" className="lab-section" aria-labelledby="customers-title">
      <div className="lab-section-heading"><div><p className="lab-eyebrow">Customer intelligence</p><h2 id="customers-title">Customer accounts</h2><p>Monitor account health, plan adoption, and recurring revenue.</p></div><Badge tone="info">{customerRows.length} accounts</Badge></div>
      <div className="lab-table-toolbar"><label>Filter customers <span className="lab-filter-input"><Icon name="search"/><input value={gridQuery} placeholder="Name, plan, region, or status" onChange={event=>setGridQuery(event.currentTarget.value)}/></span></label><Button label="Add customer" variant="secondary" onPress={()=>addLog('Customer creation requested')}/></div>
      <DataGrid title="Customer accounts" columns={customerColumns} rows={visibleCustomers} sort={gridSort} onSortChange={setGridSort}/>
     </section>

     <section id="operations" className="lab-section" aria-labelledby="operations-title">
      <div className="lab-section-heading"><div><p className="lab-eyebrow">Platform operations</p><h2 id="operations-title">Services and approvals</h2><p>Live operational health with explicit authorization for consequential actions.</p></div><label className="lab-auth-switch"><input type="checkbox" checked={allowed} onChange={event=>setAllowed(event.target.checked)}/><span>Host authorization</span></label></div>
      <ServiceHealthGrid label="Production service health" services={[
       {id:'api',label:'API gateway',status:'healthy',detail:'99.99% uptime'},
       {id:'billing',label:'Billing',status:'healthy',detail:'142 ms latency'},
       {id:'events',label:'Event pipeline',status:'degraded',detail:'4.2 min delay'},
       {id:'auth',label:'Identity',status:'healthy',detail:'99.97% uptime'},
      ]} onSelect={id=>addLog(`Service details requested: ${id}`)}/>
      <div className="lab-operations-grid">
       <section className="lab-card" aria-label="Operations specimen">
        <ActivityFeed title="Deployment activity" connection="reconnecting" items={[{id:'2',sequence:2,timestamp:'10:02',message:'Retry scheduled',tone:'warning'},{id:'1',sequence:1,timestamp:'10:01',message:'Connection interrupted'}]}/>
        <ApprovalCard approval={{id:'deploy-42',title:'Resume production rollout',description:'Host authorization is required.',requester:'Release manager',status:'pending',revision:4}} onDecision={(_id,decision,revision)=>setApprovalResult(`${decision} requested for revision ${revision}`)}/>
        <p className="lab-inline-status" role="status">{approvalResult}</p>
       </section>
       <section className="lab-card" aria-label="Agent review specimen">
        <div className="lab-card-heading"><div><span>Automated change</span><h2>Agent review</h2></div><Badge tone="warning">Review required</Badge></div>
        <ToolCallCard name="Inspect proposed patch" status="complete" input={{revision:4,scope:'local only'}}/>
        <ApprovalReview title="Apply agent proposal" summary="Visual approval requests do not execute host actions." onApprove={()=>setAgentReview('approve intention sent to host')} onDeny={()=>setAgentReview('deny intention sent to host')}/>
        <p className="lab-inline-status" role="status">{agentReview}</p>
       </section>
      </div>
     </section>

     <section id="design-studio" className="lab-section lab-studio" aria-labelledby="studio-title">
      <div className="lab-section-heading"><div><p className="lab-eyebrow">Framework workbench</p><h2 id="studio-title">Schema-first Design Lab</h2><p>One registry, one document, direct React and JSON rendering, with human-reviewed changes.</p></div><code className="lab-revision">rev {doc.revision}</code></div>
      <div className="lab-studio-grid">
       <div className="lab-studio-main">
        <section className="lab-card"><p className="lab-kicker">DECLARATIVE RUNTIME</p><DesignRenderer doc={doc} host={host}/></section>
        <section className="lab-card lab-interaction-specimen" aria-label="Foundational interaction specimen">
         <div className="lab-card-heading"><div><span>Direct React composition</span><h2>Interaction workbench</h2></div></div>
         <div className="lab-control-row"><ComboBox label="Environment" options={[{value:'production',label:'Production'},{value:'staging',label:'Staging'}]} placeholder="Choose an environment"/><Button label="Open focus dialog" onPress={()=>setDialogOpen(true)}/></div>
         <Dialog open={dialogOpen} title="Confirm deployment" description="Focus moves into this dialog and Escape returns control to the host state." onOpenChange={setDialogOpen} footer={<Button label="Done" onPress={()=>setDialogOpen(false)}/>}><p>No deployment is performed by this local specimen.</p></Dialog>
         <DockWorkspace label="Workspace layout" main={<p>Main editor</p>} start={<p>Explorer</p>} end={<p>Inspector</p>} bottom={<p>Output</p>}/>
        </section>
       </div>
       <aside className="lab-studio-side" aria-label="Design governance">
        <PropertyInspector document={doc} onPropose={next=>{setProposal(next);setResult('Property change proposed; review the diff and request host approval.');}}/>
        <section className="lab-review" aria-label="Proposal review"><h2>Proposal review</h2>
         {proposal?<><p><strong>{proposal.rationale}</strong></p><code>base revision: {proposal.baseRevision}</code>
          {error?<><p className="lab-fail" role="alert">{error}</p><Button label="Discard stale proposal" variant="secondary" onPress={()=>{setProposal(null);setResult('Stale proposal discarded. Document unchanged.');}}/></>:<><pre>{JSON.stringify(proposal.operations,null,2)}</pre>
           <div className="lab-button-row"><Button label="Request host approval" onPress={()=>{
            if(!preview)return;
            if(!allowed){setResult('Host denied the edit. Document unchanged.');addLog(`HOST DENIED proposal ${proposal.proposalId}`);return;}
            if(doc.revision!==proposal.baseRevision){setResult('Stale document revision. Document unchanged.');return;}
            setDoc(preview.candidate);setProposal(null);setResult('Host authorized and committed new document revision.');addLog(`HOST COMMITTED revision ${preview.candidate.revision}`);
           }}/><Button label="Reject" variant="secondary" onPress={()=>{setProposal(null);setResult('Human rejected proposal. Document unchanged.');}}/><Button label="Simulate concurrent revision" variant="secondary" onPress={()=>{setDoc(current=>({...current,revision:current.revision+1}));setResult('A concurrent host revision made the pending proposal stale.');}}/></div></>}
         </>:<p className="lab-detail">Use the inspector to propose an edit. Only component properties are allowed in this local workbench.</p>}
         <p className="lab-result" role="status">{result}</p>
        </section>
        <section className="lab-events"><h2>Host activity</h2><ul aria-live="polite">{log.map((line,index)=><li key={`${index}-${line}`}>{line}</li>)}</ul></section>
        <section className="lab-source"><h2>Source of truth</h2><p>Versioned design JSON is shared by renderer and inspector. No additional persisted designer format.</p><p>Desktop integration: <strong>{desktopBridge.available?'available':'browser fallback (unavailable)'}</strong></p><details><summary>Current document JSON</summary><pre>{JSON.stringify(doc,null,2)}</pre></details></section>
       </aside>
      </div>
     </section>
    </main>
   </div>
  </div>
 </div>;
}
