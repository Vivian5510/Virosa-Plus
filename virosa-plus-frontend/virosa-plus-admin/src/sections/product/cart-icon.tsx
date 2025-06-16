import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps<'a'> & {
  totalItems: number;
};

export function CartIcon({ totalItems, sx, ...other }: Props) {
  return (
    <Box
      component={RouterLink}
      href={paths.product.checkout}
      sx={[
        (theme) => ({
          right: 0,
          top: 112,
          zIndex: 999,
          display: 'flex',
          cursor: 'pointer',
          position: 'fixed',
          color: 'text.primary',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          bgcolor: 'background.paper',
          padding: theme.spacing(1, 3, 1, 2),
          boxShadow: theme.vars.customShadows.dropdown,
          transition: theme.transitions.create(['opacity']),
          '&:hover': { opacity: 0.72 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="solar:cart-3-bold" width={24} />
      </Badge>
    </Box>
  );
}
