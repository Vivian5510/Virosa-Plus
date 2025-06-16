import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const ControlPanelRoot = styled('div')(({ theme }) => ({
  ...theme.mixins.bgBlur({ color: varAlpha(theme.vars.palette.grey['900Channel'], 0.8) }),
  zIndex: 9,
  minWidth: 180,
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 1.5,
}));
