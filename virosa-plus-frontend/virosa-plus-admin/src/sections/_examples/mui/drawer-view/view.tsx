import { AnchorDrawer } from './anchor-drawer';
import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  {
    name: 'Anchor',
    component: (
      <ComponentBox>
        <AnchorDrawer />
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function DrawerView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Drawer',
        moreLinks: ['https://mui.com/material-ui/react-drawer/'],
      }}
    />
  );
}
