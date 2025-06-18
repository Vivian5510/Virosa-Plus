import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  backHref: string;
  editHref: string;
  liveHref: string;
};

export function PostDetailsToolbar({ sx, backHref, editHref, liveHref, ...other }: Props) {
  return (
    <Box
      sx={[{ gap: 1.5, display: 'flex', mb: { xs: 3, md: 5 } }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Button
        component={RouterLink}
        href={backHref}
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
      >
        返回
      </Button>

      <Box sx={{ flexGrow: 1 }} />

      <Tooltip title="编辑">
        <IconButton component={RouterLink} href={editHref}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
