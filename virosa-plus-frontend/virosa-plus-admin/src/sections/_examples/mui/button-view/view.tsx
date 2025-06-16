import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { fabClasses } from '@mui/material/Fab';
import { buttonClasses } from '@mui/material/Button';

import { IconButtons } from './icon-buttons';
import { ButtonGroups } from './button-groups';
import { ComponentLayout } from '../../layout';
import { ToggleButtons } from './toggle-buttons';
import { ButtonVariants } from './button-variants';
import { FloatingActionButton } from './floating-action-button';

// ----------------------------------------------------------------------

const boxStyles: SxProps<Theme> = {
  rowGap: 5,
  columnGap: 3,
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
  [`& .${buttonClasses.root}`]: { textTransform: 'capitalize' },
  [`& .${fabClasses.root}`]: { textTransform: 'capitalize' },
};

const DEMO_COMPONENTS = [
  {
    name: 'Contained',
    component: (
      <Box sx={boxStyles}>
        <ButtonVariants variant="contained" />
      </Box>
    ),
  },
  {
    name: 'Outlined',
    component: (
      <Box sx={boxStyles}>
        <ButtonVariants variant="outlined" />
      </Box>
    ),
  },
  {
    name: 'Text',
    component: (
      <Box sx={boxStyles}>
        <ButtonVariants variant="text" />
      </Box>
    ),
  },
  {
    name: 'Soft',
    component: (
      <Box sx={boxStyles}>
        <ButtonVariants variant="soft" />
      </Box>
    ),
  },
  {
    name: 'Icon button',
    component: (
      <Box sx={boxStyles}>
        <IconButtons />
      </Box>
    ),
  },
  {
    name: 'Fab',
    component: (
      <Box sx={boxStyles}>
        <FloatingActionButton />
      </Box>
    ),
  },
  {
    name: 'Groups',
    component: (
      <Box sx={boxStyles}>
        <ButtonGroups />
      </Box>
    ),
  },
  {
    name: 'Toggle',
    component: (
      <Box sx={boxStyles}>
        <ToggleButtons />
      </Box>
    ),
  },
];

// ----------------------------------------------------------------------

export function ButtonView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Buttons',
        moreLinks: [
          'https://mui.com/material-ui/react-button/',
          'https://mui.com/material-ui/react-button-group/',
          'https://mui.com/material-ui/react-floating-action-button/',
          'https://mui.com/material-ui/react-toggle-button/',
        ],
      }}
    />
  );
}
