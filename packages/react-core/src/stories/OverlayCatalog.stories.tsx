import type {Meta,StoryObj} from '@storybook/react-vite';
import {
 Accordion,AlertDialog,Banner,Button,CommandMenu,ContextMenu,Dialog,Drawer,DropdownMenu,HoverCard,
 Inline,Menu,NotificationCenter,Pagination,Popover,Progress,Skeleton,Spinner,Stack,StatusIndicator,
 Stepper,Tabs,Toast,ToastViewport,TreeView,
} from '../index.js';

const menuItems=[{id:'open',label:'Open',shortcut:'↵'},{id:'duplicate',label:'Duplicate'},{id:'delete',label:'Delete',danger:true}] as const;
const meta:Meta<typeof Banner>={title:'Core/Foundation/Overlays feedback and navigation',component:Banner};
export default meta;
type Story=StoryObj<typeof meta>;

export const PopoversAndMenus:Story={render:()=> <Stack>
 <Inline><Popover label="Filters" defaultOpen trigger={<Button label="Filters" variant="secondary"/>}><p>Filter controls belong here.</p></Popover><DropdownMenu label="Record actions" triggerLabel="Actions" items={menuItems}/><HoverCard trigger={<a href="#owner">Morgan Chen</a>}><strong>Morgan Chen</strong><br/>Operations lead</HoverCard></Inline>
 <Menu label="Context actions" items={menuItems}/><ContextMenu label="Canvas actions" items={menuItems}><div style={{padding:24,border:'1px dashed currentColor'}}>Right-click or press Shift+F10.</div></ContextMenu>
 </Stack>};

export const DialogExample:Story={render:()=> <Dialog open title="Edit customer" description="Changes remain local until saved." onOpenChange={()=>{}} footer={<Button label="Save"/>}><p>Dialog content</p></Dialog>};
export const AlertDialogExample:Story={render:()=> <AlertDialog open title="Delete record?" description="This cannot be undone." confirmLabel="Delete" danger onConfirm={()=>{}} onOpenChange={()=>{}}>Confirm the selected record.</AlertDialog>};
export const DrawerExample:Story={render:()=> <Drawer open title="Details" onOpenChange={()=>{}}><p>Drawer content remains responsive.</p></Drawer>};
export const CommandMenuExample:Story={render:()=> <CommandMenu open items={menuItems} onOpenChange={()=>{}}/>};

export const Feedback:Story={render:()=> <Stack>
 <Banner title="Maintenance scheduled" tone="info">Service may reconnect briefly.</Banner><Banner tone="warning">Review pending configuration.</Banner>
 <Inline><StatusIndicator status="success" label="Healthy"/><StatusIndicator status="warning" label="Degraded" pulse/><Spinner/><Skeleton width={180}/></Inline>
 <Progress label="Deployment" value={64} showValue/><Toast title="Changes saved" description="Revision 18 is now active." tone="success"/><Toast title="Connection lost" description="Retrying in 5 seconds." tone="danger"/>
 <ToastViewport><Toast title="Background task complete"/></ToastViewport>
 <NotificationCenter items={[{id:'1',title:'Approval requested',description:'Customer import',time:'2m'},{id:'2',title:'Deployment complete',read:true,time:'1h'}]}/>
 </Stack>};

export const Navigation:Story={render:()=> <Stack>
 <Tabs label="Customer sections" defaultValue="overview" items={[{id:'overview',label:'Overview',content:'Overview content'},{id:'activity',label:'Activity',content:'Activity content'},{id:'settings',label:'Settings',content:'Settings content'}]}/>
 <Accordion defaultValue={['one']} items={[{id:'one',title:'General',content:'General settings'},{id:'two',title:'Security',content:'Security settings'}]}/>
 <TreeView label="Resources" selectedId="api" defaultExpandedIds={['services']} nodes={[{id:'services',label:'Services',children:[{id:'api',label:'API'},{id:'worker',label:'Worker'}]},{id:'storage',label:'Storage'}]}/>
 <Pagination page={3} pageCount={12} onPageChange={()=>{}}/><Stepper steps={[{id:'draft',label:'Draft',status:'complete'},{id:'review',label:'Review',status:'current'},{id:'publish',label:'Publish'}]}/>
 </Stack>};

export const DarkCompact:Story={globals:{theme:'dark',density:'compact'},...Feedback};
