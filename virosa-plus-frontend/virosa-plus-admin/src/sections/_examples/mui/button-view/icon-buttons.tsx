import { m } from 'framer-motion';

import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { varTap, varHover, transitionTap } from 'src/components/animate';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = [
  'inherit',
  'default',
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error',
] as const;

const SIZES = ['small', 'medium', 'large'] as const;

// ----------------------------------------------------------------------

export function IconButtons() {
  return (
    <>
      <ComponentBox title="Base">
        <IconButton color="inherit">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>

        <IconButton>
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>

        <IconButton color="primary">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>

        <IconButton color="secondary">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>

        <IconButton disabled>
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
      </ComponentBox>

      <ComponentBox title="Colors">
        {COLORS.map((color) => (
          <IconButton key={color} color={color}>
            <Iconify icon="ic:round-access-alarm" />
          </IconButton>
        ))}
      </ComponentBox>

      <ComponentBox title="Sizes">
        {SIZES.map((size) => (
          <IconButton key={size} size={size} color="info">
            <Iconify icon="ic:round-access-alarm" />
          </IconButton>
        ))}
      </ComponentBox>

      <ComponentBox title="With Animate">
        {SIZES.map((size) => (
          <IconButton
            key={size}
            component={m.button}
            whileTap={varTap()}
            whileHover={varHover(1.05)}
            transition={transitionTap()}
            size={size}
            color="error"
          >
            <Iconify fontSize="inherit" icon="ic:round-access-alarm" />
          </IconButton>
        ))}
      </ComponentBox>
    </>
  );
}
