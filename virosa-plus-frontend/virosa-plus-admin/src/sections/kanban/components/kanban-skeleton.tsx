import type { PaperProps } from '@mui/material/Paper';

import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

type KanbanColumnSkeletonProps = PaperProps & {
  itemCount?: number;
};

export function KanbanColumnSkeleton({ itemCount = 3, sx, ...other }: KanbanColumnSkeletonProps) {
  return Array.from({ length: itemCount }, (_, index) => (
    <Paper
      key={index}
      variant="outlined"
      sx={[
        () => ({
          display: 'flex',
          gap: 'var(--item-gap)',
          flexDirection: 'column',
          p: 'var(--column-padding)',
          width: 'var(--column-width)',
          borderRadius: 'var(--column-radius)',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Skeleton sx={{ pt: '75%', borderRadius: 1.5 }} />
      {[0].includes(index) && <Skeleton sx={{ pt: '50%', borderRadius: 1.5 }} />}
      {[0, 1].includes(index) && <Skeleton sx={{ pt: '25%', borderRadius: 1.5 }} />}
      {[0, 1, 2].includes(index) && <Skeleton sx={{ pt: '25%', borderRadius: 1.5 }} />}
    </Paper>
  ));
}
