import Portal from '@mui/material/Portal';

import { Iconify } from '../iconify';
import { SnackbarRoot } from './styles';
import { snackbarClasses } from './classes';

// ----------------------------------------------------------------------

export function Snackbar() {
  return (
    <Portal>
      <SnackbarRoot
        expand
        gap={12}
        closeButton
        offset={16}
        visibleToasts={4}
        position="top-right"
        className={snackbarClasses.root}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: snackbarClasses.toast,
            icon: snackbarClasses.icon,
            // content
            content: snackbarClasses.content,
            title: snackbarClasses.title,
            description: snackbarClasses.description,
            // button
            actionButton: snackbarClasses.actionButton,
            cancelButton: snackbarClasses.cancelButton,
            closeButton: snackbarClasses.closeButton,
            // state
            default: snackbarClasses.default,
            info: snackbarClasses.info,
            error: snackbarClasses.error,
            success: snackbarClasses.success,
            warning: snackbarClasses.warning,
          },
        }}
        icons={{
          loading: <span className={snackbarClasses.loadingIcon} />,
          info: <Iconify className={snackbarClasses.iconSvg} icon="solar:info-circle-bold" />,
          success: <Iconify className={snackbarClasses.iconSvg} icon="solar:check-circle-bold" />,
          warning: (
            <Iconify className={snackbarClasses.iconSvg} icon="solar:danger-triangle-bold" />
          ),
          error: <Iconify className={snackbarClasses.iconSvg} icon="solar:danger-bold" />,
        }}
      />
    </Portal>
  );
}
