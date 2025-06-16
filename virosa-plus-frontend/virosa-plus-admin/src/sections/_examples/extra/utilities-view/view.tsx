import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';

import { Styled } from './styled';
import { Countdown } from './countdown';
import { Gradients } from './gradients';
import { TextMaxLine } from './text-max-line';
import { ComponentLayout } from '../../layout';
import { ColorPickers } from './color-pickers';
import { NumberInputs } from './number-inputs';
import { CopyToClipboard } from './copy-to-clipboard';

// ----------------------------------------------------------------------

const boxStyles: SxProps<Theme> = {
  rowGap: 5,
  columnGap: 3,
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
};

const DEMO_COMPONENTS = [
  {
    name: 'Text max line',
    component: (
      <Box sx={boxStyles}>
        <TextMaxLine />
      </Box>
    ),
  },
  {
    name: 'Copy to clipboard',
    component: (
      <Box sx={boxStyles}>
        <CopyToClipboard />
      </Box>
    ),
  },
  {
    name: 'Gradient',
    component: (
      <Box sx={{ ...boxStyles, gridTemplateColumns: 'repeat(1, 1fr)' }}>
        <Gradients />
      </Box>
    ),
  },
  {
    name: 'Countdown',
    component: (
      <Box sx={boxStyles}>
        <Countdown />
      </Box>
    ),
  },
  {
    name: 'Color pickers',
    component: (
      <Box sx={boxStyles}>
        <ColorPickers />
      </Box>
    ),
  },
  {
    name: 'Number input',
    component: (
      <Box sx={boxStyles}>
        <NumberInputs />
      </Box>
    ),
  },
  {
    name: 'Styled',
    component: <Styled />,
  },
];

// ----------------------------------------------------------------------

export function UtilitiesView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Utilities',
      }}
    />
  );
}
