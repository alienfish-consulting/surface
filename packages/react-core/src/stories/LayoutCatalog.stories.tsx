import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AppHeader,Breadcrumbs,Button,Card,Divider,DockWorkspace,EmptyState,Grid,Inline,NavigationRail,
  PageLayout,ResizablePanel,ScrollArea,Sidebar,SplitPane,Stack,Surface,Toolbar,VirtualList,
} from '../index.js';

const meta:Meta<typeof PageLayout>={title:'Core/Foundation/Layout catalog',component:PageLayout,parameters:{layout:'fullscreen'}};
export default meta;
type Story=StoryObj<typeof meta>;

export const ApplicationLayout:Story={render:()=> <PageLayout
 header={<AppHeader title="Operations" leading={<span aria-hidden="true">◈</span>} trailing={<Button label="Create"/>}/>} sidebar={<Sidebar label="Primary"><NavigationRail label="Primary" activeId="overview" items={[{id:'overview',label:'Overview'},{id:'activity',label:'Activity'},{id:'settings',label:'Settings'}]}/></Sidebar>}>
 <Stack><Breadcrumbs items={[{label:'Home',href:'#'},{label:'Operations'}]}/><Card title="Workspace"><p>Responsive application content.</p></Card></Stack>
 </PageLayout>};

export const Composition:Story={render:()=> <Stack>
 <Toolbar label="Document actions"><Button label="Save"/><Button label="Preview" variant="secondary"/></Toolbar>
 <Inline><Surface elevation="raised" style={{padding:16}}>Raised surface</Surface><Divider orientation="vertical"/><Surface style={{padding:16}}>Flat surface</Surface></Inline>
 <Grid minColumnWidth="180px"><Card title="One">Grid card</Card><Card title="Two">Grid card</Card><Card title="Three">Grid card</Card></Grid>
 <ScrollArea label="Scrollable activity" maxHeight={96}><Stack>{Array.from({length:8},(_,index)=><div key={index}>Activity row {index+1}</div>)}</Stack></ScrollArea>
 <EmptyState title="No saved views" description="Create a view to keep common filters." action={<Button label="Create view"/>}/>
 </Stack>};

export const Workspaces:Story={render:()=> <Stack>
 <SplitPane label="Resize inspector" start={<Surface style={{padding:16}}>Canvas</Surface>} end={<Surface style={{padding:16}}>Inspector</Surface>}/>
 <ResizablePanel label="Navigation"><Surface style={{padding:16}}>Use arrow keys on the resize separator.</Surface></ResizablePanel>
 <DockWorkspace label="Designer" start="Layers" main="Canvas" end="Properties" bottom="Validation"/>
 <VirtualList label="Virtual records" height={180} rowHeight={36} items={Array.from({length:1000},(_,index)=>`Record ${index+1}`)} renderItem={item=>item}/>
 </Stack>};

export const DarkCompact:Story={globals:{theme:'dark',density:'compact'},...Composition};
