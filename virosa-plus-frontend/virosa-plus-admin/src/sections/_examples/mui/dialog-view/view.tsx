import { FormDialog } from './form-dialog';
import { AlertDialog } from './alert-dialog';
import { ScrollDialog } from './scroll-dialog';
import { SimpleDialog } from './simple-dialog';
import { MaxWidthDialog } from './max-width-dialog';
import { FullScreenDialog } from './full-screen-dialog';
import { TransitionsDialog } from './transitions-dialog';
import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  {
    name: 'Simple',
    component: (
      <ComponentBox sx={{ flexDirection: 'column' }}>
        <SimpleDialog />
      </ComponentBox>
    ),
  },
  {
    name: 'Alerts',
    component: (
      <ComponentBox>
        <AlertDialog />
      </ComponentBox>
    ),
  },
  {
    name: 'Transitions',
    component: (
      <ComponentBox>
        <TransitionsDialog />
      </ComponentBox>
    ),
  },
  {
    name: 'Form',
    component: (
      <ComponentBox>
        <FormDialog />
      </ComponentBox>
    ),
  },
  {
    name: 'Full Screen',
    component: (
      <ComponentBox>
        <FullScreenDialog />
      </ComponentBox>
    ),
  },
  {
    name: 'Max width dialog',
    component: (
      <ComponentBox>
        <MaxWidthDialog />
      </ComponentBox>
    ),
  },
  {
    name: 'Scrolling content dialogs',
    component: (
      <ComponentBox>
        <ScrollDialog />
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function DialogView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Dialog',
        moreLinks: ['https://mui.com/material-ui/react-dialog/'],
      }}
    />
  );
}
