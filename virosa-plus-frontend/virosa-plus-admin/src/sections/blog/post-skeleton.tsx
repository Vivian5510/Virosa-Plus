import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

type PostItemSkeletonProps = BoxProps & {
  itemCount?: number;
  variant?: 'vertical' | 'horizontal';
};

export function PostItemSkeleton({
  sx,
  itemCount = 16,
  variant = 'vertical',
  ...other
}: PostItemSkeletonProps) {
  if (variant === 'horizontal') {
    return Array.from({ length: itemCount }, (_, index) => (
      <Box
        key={index}
        sx={[
          (theme) => ({
            display: 'flex',
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: `solid 1px ${theme.vars.palette.divider}`,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Box
          sx={{
            p: 3,
            gap: 2,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            <Skeleton sx={{ width: 24, height: 12 }} />
          </Box>

          <Skeleton sx={{ width: 1, height: 10 }} />
          <Skeleton sx={{ width: `calc(100% - 40px)`, height: 10 }} />
          <Skeleton sx={{ width: `calc(100% - 80px)`, height: 10 }} />
        </Box>

        <Box sx={{ p: 1, display: { xs: 'none', sm: 'block' } }}>
          <Skeleton sx={{ width: 170, height: 240, flexShrink: 0 }} />
        </Box>
      </Box>
    ));
  }

  return Array.from({ length: itemCount }, (_, index) => (
    <Box
      key={index}
      sx={[
        (theme) => ({
          display: 'flex',
          borderRadius: 2,
          flexDirection: 'column',
          bgcolor: 'background.paper',
          border: `solid 1px ${theme.vars.palette.divider}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ p: 1 }}>
        <Skeleton sx={{ pt: '100%' }} />
      </Box>

      <Box
        sx={{
          p: 3,
          pt: 2,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Skeleton variant="circular" sx={{ width: 40, height: 40, flexShrink: 0 }} />
        <Box
          sx={{
            gap: 1,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Skeleton sx={{ height: 10 }} />
          <Skeleton sx={{ width: 0.5, height: 10 }} />
        </Box>
      </Box>
    </Box>
  ));
}

// ----------------------------------------------------------------------

export function PostDetailsSkeleton({ sx, ...other }: BoxProps) {
  return (
    <Box sx={sx} {...other}>
      <Skeleton variant="rectangular" sx={{ height: 480 }} />

      <Box sx={{ width: 1, maxWidth: 720, mx: 'auto' }}>
        <Box
          sx={{
            my: 8,
            gap: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Skeleton height={10} />
          <Skeleton height={10} sx={{ width: 0.9 }} />
          <Skeleton height={10} sx={{ width: 0.8 }} />
        </Box>
        <Skeleton sx={{ height: 720, mb: 8 }} />
      </Box>
    </Box>
  );
}
