import type { Theme, CSSObject, Components } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../../extend-theme-types.d.ts}
 */

export type BadgeExtendVariant = {
  always: true;
  busy: true;
  online: true;
  offline: true;
  invisible: true;
};

// ----------------------------------------------------------------------

const dotBaseStyles = (theme: Theme): CSSObject => ({
  width: 10,
  zIndex: 9,
  height: 10,
  padding: 0,
  top: 'auto',
  right: '14%',
  bottom: '14%',
  minWidth: 'auto',
  transform: 'scale(1) translate(50%, 50%)',
  '&::before, &::after': {
    content: "''",
    borderRadius: 1,
    backgroundColor: theme.vars.palette.common.white,
  },
});

const MuiBadge: Components<Theme>['MuiBadge'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    dot: { borderRadius: '50%' },
    badge: ({ ownerState, theme }) => ({
      /**
       * @variant online
       */
      ...(ownerState.variant === 'online' && {
        ...dotBaseStyles(theme),
        backgroundColor: theme.vars.palette.success.main,
      }),
      /**
       * @variant always
       */
      ...(ownerState.variant === 'always' && {
        ...dotBaseStyles(theme),
        backgroundColor: theme.vars.palette.warning.main,
        '&::before': { width: 2, height: 4, transform: 'translate(1px, -1px)' },
        '&::after': { width: 2, height: 4, transform: 'translate(0, 1px) rotate(125deg)' },
      }),
      /**
       * @variant busy
       */
      ...(ownerState.variant === 'busy' && {
        ...dotBaseStyles(theme),
        backgroundColor: theme.vars.palette.error.main,
        '&::before': { width: 6, height: 2 },
      }),
      /**
       * @variant offline
       */
      ...(ownerState.variant === 'offline' && {
        ...dotBaseStyles(theme),
        backgroundColor: theme.vars.palette.text.disabled,
        '&::before': { width: 6, height: 6, borderRadius: '50%' },
      }),
      /**
       * @variant invisible
       */
      ...(ownerState.variant === 'invisible' && {
        display: 'none',
      }),
    }),
  },
};

// ----------------------------------------------------------------------

export const badge = { MuiBadge };
