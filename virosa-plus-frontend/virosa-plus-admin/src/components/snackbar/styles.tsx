import type { CSSObject } from '@mui/material/styles';

import { Toaster } from 'sonner';
import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { snackbarClasses } from './classes';

// ----------------------------------------------------------------------

export const SnackbarRoot = styled(Toaster)(({ theme }) => {
  const baseStyles: Record<string, CSSObject> = {
    toastDefault: {
      padding: theme.spacing(1, 1, 1, 1.5),
      boxShadow: theme.vars.customShadows.z8,
      color: theme.vars.palette.background.paper,
      backgroundColor: theme.vars.palette.text.primary,
    },
    toastColor: {
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      boxShadow: theme.vars.customShadows.z8,
      color: theme.vars.palette.text.primary,
      backgroundColor: theme.vars.palette.background.paper,
    },
    toastLoader: {
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      boxShadow: theme.vars.customShadows.z8,
      color: theme.vars.palette.text.primary,
      backgroundColor: theme.vars.palette.background.paper,
    },
  };

  const loadingStyles: CSSObject = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'none',
    transform: 'none',
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 'inherit',
    justifyContent: 'center',
    background: theme.vars.palette.background.neutral,
    [`& .${snackbarClasses.loadingIcon}`]: {
      zIndex: 9,
      width: 24,
      height: 24,
      borderRadius: '50%',
      animation: 'rotate 3s infinite linear',
      background: `conic-gradient(transparent, ${varAlpha(theme.vars.palette.text.disabledChannel, 0.64)})`,
    },
    [snackbarClasses.loaderVisible]: { display: 'flex' },
  };

  return {
    width: 300,
    [`& .${snackbarClasses.toast}`]: {
      gap: 12,
      width: '100%',
      minHeight: 52,
      display: 'flex',
      borderRadius: 12,
      alignItems: 'center',
    },
    /**
     * Content
     */
    [`& .${snackbarClasses.content}`]: { gap: 0, flex: '1 1 auto' },
    [`& .${snackbarClasses.title}`]: { fontSize: theme.typography.subtitle2.fontSize },
    [`& .${snackbarClasses.description}`]: { ...theme.typography.caption, opacity: 0.64 },
    /**
     * Buttons
     */
    [`& .${snackbarClasses.actionButton}`]: {},
    [`& .${snackbarClasses.cancelButton}`]: {},
    [`& .${snackbarClasses.closeButton}`]: {
      top: 0,
      right: 0,
      left: 'auto',
      color: 'currentColor',
      backgroundColor: 'transparent',
      transform: 'translate(-6px, 6px)',
      borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
      transition: theme.transitions.create(['background-color', 'border-color']),
      '&:hover': {
        borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
        backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
      },
    },
    /**
     * Icon
     */
    [`& .${snackbarClasses.icon}`]: {
      margin: 0,
      width: 48,
      height: 48,
      alignItems: 'center',
      borderRadius: 'inherit',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      [`& .${snackbarClasses.iconSvg}`]: { width: 24, height: 24, fontSize: 0 },
    },

    '@keyframes rotate': { to: { transform: 'rotate(1turn)' } },

    /**
     * @variant default
     */
    [`& .${snackbarClasses.default}`]: {
      ...baseStyles.toastDefault,
      [`&:has(${snackbarClasses.closeBtnVisible})`]: {
        [`& .${snackbarClasses.content}`]: { paddingRight: 32 },
      },
      [`&:has(.${snackbarClasses.loader})`]: baseStyles.toastLoader,
      /**
       * @with loader
       */
      [`&:has(.${snackbarClasses.loader})`]: baseStyles.toastLoader,
      [`& .${snackbarClasses.loader}`]: loadingStyles,
    },
    /**
     * @variant error
     */
    [`& .${snackbarClasses.error}`]: {
      ...baseStyles.toastColor,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.vars.palette.error.main,
        backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
      },
    },
    /**
     * @variant success
     */
    [`& .${snackbarClasses.success}`]: {
      ...baseStyles.toastColor,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.vars.palette.success.main,
        backgroundColor: varAlpha(theme.vars.palette.success.mainChannel, 0.08),
      },
    },
    /**
     * @variant warning
     */
    [`& .${snackbarClasses.warning}`]: {
      ...baseStyles.toastColor,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.vars.palette.warning.main,
        backgroundColor: varAlpha(theme.vars.palette.warning.mainChannel, 0.08),
      },
    },
    /**
     * @variant info
     */
    [`& .${snackbarClasses.info}`]: {
      ...baseStyles.toastColor,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.vars.palette.info.main,
        backgroundColor: varAlpha(theme.vars.palette.info.mainChannel, 0.08),
      },
    },
  };
});
