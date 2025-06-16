import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

type MailNavItemSkeletonProps = BoxProps & {
  itemCount?: number;
};

export function MailNavItemSkeleton({ itemCount = 6, sx, ...other }: MailNavItemSkeletonProps) {
  return Array.from({ length: itemCount }, (_, index) => (
    <Box
      key={index}
      sx={[
        (theme) => ({
          py: 1,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
          color: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Skeleton variant="circular" sx={{ width: 32, height: 32, bgcolor: 'currentColor' }} />

      <Skeleton sx={{ width: 0.5, height: 10, bgcolor: 'currentColor' }} />
    </Box>
  ));
}

// ----------------------------------------------------------------------

type MailItemSkeletonProps = BoxProps & {
  itemCount?: number;
};

export function MailItemSkeleton({ sx, itemCount = 6, ...other }: MailItemSkeletonProps) {
  return Array.from({ length: itemCount }, (_, index) => (
    <Box
      key={index}
      sx={[
        {
          py: 1,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />

      <Stack spacing={1} flexGrow={1}>
        <Skeleton sx={{ width: 0.75, height: 10 }} />
        <Skeleton sx={{ width: 0.5, height: 10 }} />
      </Stack>
    </Box>
  ));
}
