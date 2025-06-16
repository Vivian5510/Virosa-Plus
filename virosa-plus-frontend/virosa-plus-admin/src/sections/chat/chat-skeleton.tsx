import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

type ChatMessageSkeletonProps = BoxProps & {
  itemCount?: number;
};

export function ChatNavItemSkeleton({ sx, itemCount = 6, ...other }: ChatMessageSkeletonProps) {
  return Array.from({ length: itemCount }, (_, index) => (
    <Box
      key={index}
      sx={[
        () => ({
          gap: 2,
          px: 2.5,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Skeleton variant="circular" sx={{ width: 48, height: 48 }} />

      <Stack spacing={1} flexGrow={1}>
        <Skeleton sx={{ width: 0.75, height: 10 }} />
        <Skeleton sx={{ width: 0.5, height: 10 }} />
      </Stack>
    </Box>
  ));
}

// ----------------------------------------------------------------------

export function ChatHeaderSkeleton({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={[{ width: 1, display: 'flex', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
      <Stack spacing={1} flexGrow={1} sx={{ mx: 2 }}>
        <Skeleton sx={{ width: 96, height: 10 }} />
        <Skeleton sx={{ width: 40, height: 10 }} />
      </Stack>

      <Skeleton variant="circular" sx={{ width: 28, height: 28 }} />
      <Skeleton variant="circular" sx={{ width: 28, height: 28, mx: 1 }} />
      <Skeleton variant="circular" sx={{ width: 28, height: 28, mr: 1 }} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function ChatRoomSkeleton({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={[
        () => ({
          pt: 5,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Stack alignItems="center">
        <Skeleton variant="circular" sx={{ width: 96, height: 96 }} />
        <Skeleton
          sx={{
            mb: 1,
            mt: 2,
            height: 10,
            width: 0.65,
          }}
        />
        <Skeleton sx={{ mb: 5, width: 0.35, height: 10 }} />
        <CircularProgress color="inherit" thickness={2} />
      </Stack>
    </Box>
  );
}
