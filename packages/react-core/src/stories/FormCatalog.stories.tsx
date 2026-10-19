import type {Meta,StoryObj} from '@storybook/react-vite';
import {
 Autocomplete,Button,ButtonGroup,Checkbox,CheckboxGroup,ColorPicker,ComboBox,DatePicker,DateRangePicker,
 FieldSet,FileInput,FormField,IconButton,Inline,InputGroup,MultiSelect,NumberField,OtpField,PasswordField,
 RadioGroup,RangeSlider,SearchField,SegmentedControl,Select,Slider,Stack,Switch,TagInput,TextArea,
 TextField,TimePicker,ToggleButton,ValidationMessage,
} from '../index.js';

const options=[{value:'alpha',label:'Alpha'},{value:'beta',label:'Beta'},{value:'gamma',label:'Gamma'}] as const;
const meta:Meta<typeof TextArea>={title:'Core/Foundation/Form catalog',component:TextArea};
export default meta;
type Story=StoryObj<typeof meta>;

export const TextAndChoiceFields:Story={render:()=> <Stack>
 <TextField label="Customer name" description="Use the registered business name."/>
 <TextArea label="Notes" description="Visible to the operations team."/>
 <PasswordField label="Password" description="At least twelve characters."/>
 <NumberField label="Seats" min={1} defaultValue={10}/><SearchField label="Search customers" defaultValue="Acme"/>
 <Select label="Environment" options={options} placeholder="Choose an environment"/>
 <MultiSelect label="Regions" options={options} defaultValue={['alpha','gamma']}/>
 <ComboBox label="Owner" options={options}/><Autocomplete label="Reviewer" options={options}/>
 <Checkbox label="Include archived records"/><CheckboxGroup legend="Notifications" options={options} defaultValue={['alpha']}/>
 <RadioGroup legend="Deployment strategy" options={options} defaultValue="beta"/><Switch label="Enable automatic updates"/>
 </Stack>};

export const RangeAndDateFields:Story={render:()=> <Stack>
 <Slider label="Capacity" min={0} max={100} defaultValue={60}/><RangeSlider label="Budget range" defaultValue={[20,80]}/>
 <DatePicker label="Start date"/><DateRangePicker legend="Reporting period"/><TimePicker label="Run time"/>
 <ColorPicker label="Accent color" defaultValue="#2563eb"/><FileInput label="Import configuration" accept=".json"/>
 </Stack>};

export const CompositionAndSpecialized:Story={render:()=> <Stack>
 <Inline><IconButton label="Refresh" icon="↻"/><ToggleButton>Pin view</ToggleButton><ButtonGroup label="Record actions"><Button label="Approve"/><Button label="Reject" variant="secondary"/></ButtonGroup></Inline>
 <FieldSet legend="Review"><FormField label="Reference" controlId="reference" description="Internal identifier"><input id="reference"/></FormField></FieldSet>
 <InputGroup label="Search and submit"><input aria-label="Search query"/><Button label="Search"/></InputGroup>
 <SegmentedControl label="View" options={options} defaultValue="alpha"/><TagInput label="Tags" defaultValue={['enterprise','reviewed']}/>
 <OtpField label="Verification code" defaultValue="123"/><ValidationMessage tone="error">Correct the highlighted fields.</ValidationMessage>
 </Stack>};

export const InvalidAndDisabled:Story={render:()=> <Stack>
 <TextArea label="Description" error="Description is required." aria-invalid="true"/><Select label="Environment" options={options} error="Select an environment."/>
 <PasswordField label="Password" disabled defaultValue="locked"/><Switch label="Automatic updates unavailable" disabled/>
 </Stack>};

export const DarkCompact:Story={globals:{theme:'dark',density:'compact'},...CompositionAndSpecialized};
