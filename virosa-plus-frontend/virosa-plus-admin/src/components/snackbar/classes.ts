import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

export const snackbarClasses = {
  root: createClasses('snackbar__root'),
  toast: createClasses('snackbar__toast'),
  title: createClasses('snackbar__title'),
  icon: createClasses('snackbar__icon'),
  iconSvg: createClasses('snackbar__icon__svg'),
  content: createClasses('snackbar__content'),
  description: createClasses('snackbar__description'),
  actionButton: createClasses('snackbar__action__button'),
  cancelButton: createClasses('snackbar__cancel__button'),
  closeButton: createClasses('snackbar__close_button'),
  loadingIcon: createClasses('snackbar__loading_icon'),
  /********/
  default: createClasses('snackbar__default'),
  error: createClasses('snackbar__error'),
  success: createClasses('snackbar__success'),
  warning: createClasses('snackbar__warning'),
  info: createClasses('snackbar__info'),
  /********/
  loader: 'sonner-loader',
  loaderVisible: '&[data-visible="true"]',
  closeBtnVisible: '[data-close-button="true"]',
};
