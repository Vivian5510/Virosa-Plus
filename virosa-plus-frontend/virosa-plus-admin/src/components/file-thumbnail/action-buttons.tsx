import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { IconButtonProps } from '@mui/material/IconButton';

import { varAlpha } from 'minimal-shared/utils';

import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

export function DownloadButton({ sx, ...other }: ButtonBaseProps) {
  return (
    <ButtonBase
      sx={[
        (theme) => ({
          p: 0,
          top: 0,
          right: 0,
          width: 1,
          height: 1,
          zIndex: 9,
          opacity: 0,
          position: 'absolute',
          color: 'common.white',
          borderRadius: 'inherit',
          transition: theme.transitions.create(['opacity']),
          '&:hover': {
            ...theme.mixins.bgBlur({
              color: varAlpha(theme.vars.palette.grey['900Channel'], 0.64),
            }),
            opacity: 1,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify icon="eva:arrow-circle-down-fill" width={24} />
    </ButtonBase>
  );
}

// ----------------------------------------------------------------------

export function RemoveButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton
      size="small"
      sx={[
        (theme) => ({
          p: 0.35,
          top: 4,
          right: 4,
          position: 'absolute',
          color: 'common.white',
          bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
          '&:hover': { bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.72) },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify icon="mingcute:close-line" width={12} />
    </IconButton>
  );
}
