import type { Theme, SxProps } from '@mui/material/styles';

import Tooltip from '@mui/material/Tooltip';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const componentBoxStyles: SxProps<Theme> = {
  gap: 1,
};

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const DEMO_COMPONENTS = [
  {
    name: 'Filled',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Tooltip key={color} title={color}>
            <Label color={color} variant="filled">
              {color}
            </Label>
          </Tooltip>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Outlined',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Label key={color} color={color} variant="outlined">
            {color}
          </Label>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Soft',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Label key={color} color={color} variant="soft">
            {color}
          </Label>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Inverted',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Label key={color} color={color} variant="inverted">
            {color}
          </Label>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'With icon',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <Label
          variant="filled"
          color="primary"
          startIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          Start icon
        </Label>

        <Label variant="filled" color="primary" endIcon={<Iconify icon="fluent:mail-24-filled" />}>
          End icon
        </Label>

        <Label
          variant="outlined"
          color="primary"
          startIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          Start icon
        </Label>

        <Label
          variant="outlined"
          color="primary"
          endIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          End icon
        </Label>

        <Label color="primary" startIcon={<Iconify icon="fluent:mail-24-filled" />}>
          Start icon
        </Label>

        <Label color="primary" endIcon={<Iconify icon="fluent:mail-24-filled" />}>
          End icon
        </Label>
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function LabelView() {
  return <ComponentLayout sectionData={DEMO_COMPONENTS} heroProps={{ heading: 'Label' }} />;
}
