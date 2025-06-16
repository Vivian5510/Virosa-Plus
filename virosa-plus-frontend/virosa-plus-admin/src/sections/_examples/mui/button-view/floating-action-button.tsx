import { m } from 'framer-motion';

import Fab from '@mui/material/Fab';

import { Iconify } from 'src/components/iconify';
import { varTap, transitionTap } from 'src/components/animate';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = [
  'default',
  'inherit',
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error',
] as const;

const SIZES = ['small', 'medium', 'large'] as const;

// ----------------------------------------------------------------------

export function FloatingActionButton() {
  return (
    <>
      <ComponentBox title="Default">
        {COLORS.map((color) => (
          <Fab key={color} color={color}>
            <Iconify icon="ic:round-access-alarm" width={24} />
          </Fab>
        ))}

        {COLORS.map((color) => (
          <Fab key={color} color={color} variant="extended">
            <Iconify icon="ic:round-access-alarm" width={24} />
            {color}
          </Fab>
        ))}

        <Fab color="info" disabled>
          <Iconify icon="ic:round-access-alarm" width={24} />
        </Fab>
        <Fab color="info" disabled variant="extended">
          <Iconify icon="ic:round-access-alarm" width={24} />
          disabled
        </Fab>
      </ComponentBox>

      <ComponentBox title="Outlined">
        {COLORS.map((color) => (
          <Fab key={color} color={color} variant="outlined">
            <Iconify icon="ic:round-access-alarm" width={24} />
          </Fab>
        ))}

        {COLORS.map((color) => (
          <Fab key={color} color={color} variant="outlinedExtended">
            <Iconify icon="ic:round-access-alarm" width={24} />
            {color}
          </Fab>
        ))}

        <Fab color="info" disabled variant="outlined">
          <Iconify icon="ic:round-access-alarm" width={24} />
        </Fab>

        <Fab color="info" disabled variant="outlinedExtended">
          <Iconify icon="ic:round-access-alarm" width={24} />
          disabled
        </Fab>
      </ComponentBox>

      <ComponentBox title="Soft">
        {COLORS.map((color) => (
          <Fab key={color} color={color} variant="soft">
            <Iconify icon="ic:round-access-alarm" width={24} />
          </Fab>
        ))}

        {COLORS.map((color) => (
          <Fab key={color} color={color} variant="softExtended">
            <Iconify icon="ic:round-access-alarm" width={24} />
            {color}
          </Fab>
        ))}

        <Fab color="info" disabled variant="soft">
          <Iconify icon="ic:round-access-alarm" width={24} />
        </Fab>

        <Fab color="info" disabled variant="softExtended">
          <Iconify icon="ic:round-access-alarm" width={24} />
          disabled
        </Fab>
      </ComponentBox>

      <ComponentBox title="Sizes">
        {SIZES.map((size) => (
          <Fab key={size} size={size} color="info">
            <Iconify icon="ic:round-access-alarm" width={24} />
          </Fab>
        ))}

        {SIZES.map((size) => (
          <Fab key={size} size={size} color="info" variant="extended">
            <Iconify icon="ic:round-access-alarm" width={24} />
            {size}
          </Fab>
        ))}

        {SIZES.map((size) => (
          <Fab key={size} size={size} color="info" variant="soft">
            <Iconify icon="ic:round-access-alarm" width={24} />
          </Fab>
        ))}

        {SIZES.map((size) => (
          <Fab key={size} size={size} color="info" variant="softExtended">
            <Iconify icon="ic:round-access-alarm" width={24} />
            {size}
          </Fab>
        ))}

        {SIZES.map((size) => (
          <Fab key={size} size={size} color="info" variant="outlined">
            <Iconify icon="ic:round-access-alarm" width={24} />
          </Fab>
        ))}

        {SIZES.map((size) => (
          <Fab key={size} size={size} color="info" variant="outlinedExtended">
            <Iconify icon="ic:round-access-alarm" width={24} />
            {size}
          </Fab>
        ))}
      </ComponentBox>

      <ComponentBox title="With Animate">
        {SIZES.map((size) => (
          <Fab
            key={size}
            component={m.button}
            whileTap={varTap()}
            transition={transitionTap()}
            variant="extended"
            color="info"
            size={size}
          >
            <Iconify icon="ic:round-access-alarm" width={24} />
            {size}
          </Fab>
        ))}
      </ComponentBox>
    </>
  );
}
