import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  onRefresh: () => void;
};

export function Toolbar({ onRefresh, sx, ...other }: Props) {
  return (
    <Box
      sx={[
        () => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <IconButton onClick={onRefresh}>
        <Iconify icon="eva:refresh-fill" />
      </IconButton>
    </Box>
  );
}
