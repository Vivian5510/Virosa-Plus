import type { Theme } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

export function megaMenuVars(theme: Theme, variant: 'vertical' | 'horizontal' | 'mobile') {
  const {
    shape,
    spacing,
    vars: { palette },
  } = theme;

  const getValue = (values: {
    vertical?: string | number;
    horizontal?: string | number;
    mobile?: string | number;
  }) => values[variant];

  return {
    '--nav-width': getValue({
      mobile: '280px',
      vertical: '260px',
      horizontal: 'unset',
    }),
    '--nav-item-gap': getValue({
      mobile: theme.spacing(0.5),
      vertical: theme.spacing(0.5),
      horizontal: theme.spacing(2.5),
    }),
    '--nav-item-radius': getValue({
      mobile: '0',
      vertical: '0',
      horizontal: `${shape.borderRadius}px`,
    }),
    '--nav-item-height': getValue({
      mobile: '40px',
      vertical: '40px',
      horizontal: '32px',
    }),
    '--nav-item-padding': getValue({
      mobile: spacing(1, 1.5, 1, 2.5),
      vertical: spacing(1, 1.5, 1, 2.5),
      horizontal: spacing(0.5, 1),
    }),
    // icon
    '--nav-icon-size': '22px',
    '--nav-icon-margin': getValue({
      mobile: '0 16px 0 0',
      vertical: '0 16px 0 0',
      horizontal: '0 8px 0 0',
    }),
    // hover
    '--nav-item-hover-bg': palette.action.hover,
    // active
    '--nav-item-active-color': palette.primary.main,
    '--nav-item-active-bg': getValue({
      mobile: varAlpha(palette.primary.mainChannel, 0.08),
      vertical: varAlpha(palette.primary.mainChannel, 0.08),
      horizontal: 'transparent',
    }),
    '--nav-item-active-hover-bg': getValue({
      mobile: varAlpha(palette.primary.mainChannel, 0.16),
      vertical: varAlpha(palette.primary.mainChannel, 0.16),
      horizontal: varAlpha(palette.primary.mainChannel, 0.08),
    }),
  };
}
