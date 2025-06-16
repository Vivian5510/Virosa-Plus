import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { varTap, varHover, transitionTap } from 'src/components/animate';

import type { NavItemData } from './nav-config-components';

// ----------------------------------------------------------------------

type ComponentCardProps = BoxProps<'a'> & {
  item: NavItemData;
};

export function ComponentCard({ item, sx, ...other }: ComponentCardProps) {
  return (
    <Box
      component={RouterLink}
      href={item.href}
      sx={[
        (theme) => ({
          color: 'inherit',
          borderRadius: 1.25,
          overflow: 'hidden',
          textAlign: 'center',
          position: 'relative',
          textDecoration: 'none',
          border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {['MUI X', '3rd Party'].includes(item.packageType!) && (
        <Label
          color={item.packageType === 'MUI X' ? 'info' : 'default'}
          sx={{
            top: 8,
            right: 8,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          {item.packageType}
        </Label>
      )}

      <Box
        sx={[
          (theme) => ({
            overflow: 'hidden',
            bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.06),
            transition: theme.transitions.create('background-color', {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.sharp,
            }),
            '&:hover': {
              bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
            },
            ...theme.applyStyles('dark', {
              bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
            }),
          }),
        ]}
      >
        <m.div whileTap={varTap(0.98)} whileHover={varHover()} transition={transitionTap()}>
          <Image alt={item.name} src={item.icon} ratio="1/1" disablePlaceholder />
        </m.div>
      </Box>

      <Typography variant="subtitle2" sx={{ p: 2 }}>
        {item.name}
      </Typography>
    </Box>
  );
}
