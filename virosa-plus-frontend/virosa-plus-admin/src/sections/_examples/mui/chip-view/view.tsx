import { Chips } from './chip';
import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  { name: 'Filled', component: <Chips variant="filled" /> },
  { name: 'Outlined', component: <Chips variant="outlined" /> },
  { name: 'Soft', component: <Chips variant="soft" /> },
];

// ----------------------------------------------------------------------

export function ChipView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Chip',
        moreLinks: ['https://mui.com/material-ui/react-chip/'],
      }}
    />
  );
}
