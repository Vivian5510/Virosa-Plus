import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';

import { Textfields } from './textfield';
import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const boxStyles: SxProps<Theme> = {
  rowGap: 5,
  columnGap: 3,
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
};

const DEMO_COMPONENTS = [
  {
    name: 'Outlined',
    component: (
      <Box sx={boxStyles}>
        <Textfields variant="outlined" />
      </Box>
    ),
  },
  {
    name: 'Filled',
    component: (
      <Box sx={boxStyles}>
        <Textfields variant="filled" />
      </Box>
    ),
  },
  {
    name: 'Standard',
    component: (
      <Box sx={boxStyles}>
        <Textfields variant="standard" />
      </Box>
    ),
  },
];

// ----------------------------------------------------------------------

export function TextfieldView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Textfield',
        moreLinks: ['https://mui.com/material-ui/react-text-field/'],
      }}
    />
  );
}
