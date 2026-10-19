import type { Meta, StoryObj } from '@storybook/react-vite';
import {Avatar,Badge,Code,DataValue,Heading,Icon,Inline,KeyboardShortcut,Label,Link,Stack,Text,Tooltip,TruncateText,Button} from '../index.js';

const meta:Meta<typeof Text>={title:'Core/Foundation/Typography and display',component:Text};
export default meta;
type Story=StoryObj<typeof meta>;

export const Typography:Story={render:()=> <Stack>
 <Heading level={1}>Enterprise heading</Heading><Heading level={3}>Section heading</Heading>
 <Text>Primary text</Text><Text tone="secondary">Secondary supporting text</Text><Text tone="tertiary">Tertiary metadata</Text>
 <Label htmlFor="display-example" required>Field label</Label><Link href="#details">View details</Link>
 <Code>{'status === "ready"'}</Code><Code block>{'const state = { status: "ready" };'}</Code>
 </Stack>};

export const Indicators:Story={render:()=> <Stack>
 <Inline><Badge>Neutral</Badge><Badge tone="info">Info</Badge><Badge tone="success">Healthy</Badge><Badge tone="warning">Warning</Badge><Badge tone="danger">Failed</Badge></Inline>
 <Inline><Avatar name="Lee Allen"/><Avatar name="Morgan Chen" size="lg"/><Icon label="Approved">✓</Icon><KeyboardShortcut keys={['⌘','K']}/></Inline>
 <Inline><Text>Revenue:</Text><DataValue value={98340} format="number"/><Text>Updated:</Text><DataValue value="2026-10-18" format="date"/></Inline>
 <TruncateText text="A long enterprise resource name that should truncate predictably in a constrained region" style={{maxWidth:320}}/>
 <Tooltip content="Runs the approved local action"><Button label="Run action" variant="secondary"/></Tooltip>
 </Stack>};

export const HighContrast:Story={globals:{theme:'high-contrast'},...Indicators};
