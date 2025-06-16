import type { PaperProps } from '@mui/material/Paper';
import type { Grid2Props } from '@mui/material/Grid2';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

type ProductItemSkeletonProps = PaperProps & {
  itemCount?: number;
};

export function ProductItemSkeleton({ sx, itemCount = 16, ...other }: ProductItemSkeletonProps) {
  return Array.from({ length: itemCount }, (_, index) => (
    <Paper
      key={index}
      variant="outlined"
      sx={[
        () => ({
          borderRadius: 2,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ p: 1 }}>
        <Skeleton sx={{ pt: '100%' }} />
      </Box>

      <Stack spacing={2} sx={{ p: 3, pt: 2 }}>
        <Skeleton sx={{ width: 0.5, height: 16 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
            <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
            <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
          </Box>

          <Skeleton sx={{ width: 40, height: 16 }} />
        </Box>
      </Stack>
    </Paper>
  ));
}

// ----------------------------------------------------------------------

export function ProductDetailsSkeleton({ ...other }: Grid2Props) {
  return (
    <Grid container spacing={8} {...other}>
      <Grid size={{ xs: 12, md: 6, lg: 7 }}>
        <Skeleton sx={{ pt: '100%' }} />
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 5 }}>
        <Stack spacing={3}>
          <Skeleton sx={{ height: 16, width: 48 }} />
          <Skeleton sx={{ height: 16, width: 80 }} />
          <Skeleton sx={{ height: 16, width: 0.5 }} />
          <Skeleton sx={{ height: 16, width: 0.75 }} />
          <Skeleton sx={{ height: 120 }} />
        </Stack>
      </Grid>

      <Grid size={12}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {Array.from({ length: 3 }, (_, index) => (
            <Box
              key={index}
              sx={{
                gap: 2,
                width: 1,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Skeleton variant="circular" sx={{ width: 80, height: 80 }} />
              <Skeleton sx={{ height: 16, width: 160 }} />
              <Skeleton sx={{ height: 16, width: 80 }} />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
