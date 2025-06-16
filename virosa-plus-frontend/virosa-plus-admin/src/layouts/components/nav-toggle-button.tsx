import type { IconButtonProps } from '@mui/material/IconButton';

import { varAlpha } from 'minimal-shared/utils';

import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

export type NavToggleButtonProps = IconButtonProps & {
  isNavMini: boolean;
};

/* https://icon-sets.iconify.design/eva/arrow-ios-back-fill/ */
const backArrowSvgPath =
  'M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64';

/* https://icon-sets.iconify.design/eva/arrow-ios-forward-fill/ */
const nextArrowSvgPath =
  'M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19';

export function NavToggleButton({ isNavMini, sx, ...other }: NavToggleButtonProps) {
  return (
    <IconButton
      size="small"
      sx={[
        (theme) => ({
          p: 0.5,
          position: 'absolute',
          color: 'action.active',
          bgcolor: 'background.default',
          transform: 'translate(-50%, -50%)',
          zIndex: 'var(--layout-nav-zIndex)',
          top: 'calc(var(--layout-header-desktop-height) / 2)',
          left: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
          border: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
          transition: theme.transitions.create(['left'], {
            easing: 'var(--layout-transition-easing)',
            duration: 'var(--layout-transition-duration)',
          }),
          '&:hover': {
            color: 'text.primary',
            bgcolor: 'background.neutral',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <SvgIcon
        sx={(theme) => ({
          width: 16,
          height: 16,
          ...(theme.direction === 'rtl' && { transform: 'scaleX(-1)' }),
        })}
      >
        <path fill="currentColor" d={isNavMini ? nextArrowSvgPath : backArrowSvgPath} />
      </SvgIcon>
    </IconButton>
  );
}
