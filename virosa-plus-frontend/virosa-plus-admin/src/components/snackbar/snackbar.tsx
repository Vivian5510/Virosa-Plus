import type { ReactNode } from 'react';
import type { AlertColor } from '@mui/material/Alert';

import { useState, useContext, useCallback, createContext } from 'react';
import { closeSnackbar, enqueueSnackbar as notiStackEnqueue } from 'notistack';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Portal from '@mui/material/Portal';

import type { ToastT, ToastPromiseMessages } from './types';

// ----------------------------------------------------------------------

export type SnackbarVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

export type SnackbarMessage = string;

export type SnackbarKey = string | number;

export type OptionsProps = {
  variant?: SnackbarVariant;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  autoHideDuration?: number;
  preventDuplicate?: boolean;
  sx?: any;
};

export type ToastFunction = {
  (message: string, options?: ToastT): SnackbarKey;
  success: (message: string, options?: ToastT) => SnackbarKey;
  error: (message: string, options?: ToastT) => SnackbarKey;
  info: (message: string, options?: ToastT) => SnackbarKey;
  warning: (message: string, options?: ToastT) => SnackbarKey;
  default: (message: string, options?: ToastT) => SnackbarKey;
  promise: <T>(promise: Promise<T>, messages: ToastPromiseMessages<T>) => Promise<T>;
  dismiss: (key?: SnackbarKey) => void;
};

export type SnackbarContextProps = {
  openSnackbar: (message: SnackbarMessage, options?: OptionsProps) => SnackbarKey;
  closeSnackbar: (key?: SnackbarKey) => void;
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsProps) => SnackbarKey;
};

// ----------------------------------------------------------------------

// 提供一个全局toast函数，使用notistack
export const toast: ToastFunction = Object.assign(
  (message: string, options?: ToastT) =>
    notiStackEnqueue(message, { variant: 'default', ...options }),
  {
    success: (message: string, options?: ToastT) =>
      notiStackEnqueue(message, { variant: 'success', ...options }),
    error: (message: string, options?: ToastT) =>
      notiStackEnqueue(message, { variant: 'error', ...options }),
    info: (message: string, options?: ToastT) =>
      notiStackEnqueue(message, { variant: 'info', ...options }),
    warning: (message: string, options?: ToastT) =>
      notiStackEnqueue(message, { variant: 'warning', ...options }),
    default: (message: string, options?: ToastT) =>
      notiStackEnqueue(message, { variant: 'default', ...options }),
    promise<T>(promise: Promise<T>, messages: ToastPromiseMessages<T>): Promise<T> {
      const id = notiStackEnqueue(messages.loading, {
        variant: 'info',
        persist: true,
        ...(messages.closeButton !== undefined
          ? { autoHideDuration: messages.closeButton ? undefined : 0 }
          : {}),
      });
      promise
        .then((result) => {
          const successMessage =
            typeof messages.success === 'function' ? messages.success(result) : messages.success;
          notiStackEnqueue(successMessage, { variant: 'success' });
        })
        .catch((error) => {
          const errorMessage =
            typeof messages.error === 'function' ? messages.error(error) : messages.error;
          notiStackEnqueue(errorMessage, { variant: 'error' });
        })
        .finally(() => {
          toast.dismiss(id);
        });
      return promise;
    },
    dismiss: (key?: SnackbarKey) => {
      if (key) {
        closeSnackbar(key);
      } else {
        closeSnackbar();
      }
    },
  }
);

export const SnackbarContext = createContext({} as SnackbarContextProps);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) throw new Error('useSnackbar must be use inside SnackbarProvider');

  return context;
};

// ----------------------------------------------------------------------

type SnackbarProviderProps = {
  children: React.ReactNode;
};

let snackbarId = 0;

type MessageItem = {
  key: SnackbarKey;
  message: SnackbarMessage;
  options?: OptionsProps;
};

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const handleClose = useCallback((key?: SnackbarKey) => {
    if (key) {
      setMessages((prev) => prev.filter((msg) => msg.key !== key));
    } else {
      setMessages([]);
    }
  }, []);

  const openSnackbar = useCallback(
    (message: SnackbarMessage, options?: OptionsProps) => {
      const key = snackbarId++;
      setMessages((prev) => [...prev, { key, message, options }]);

      // 自动隐藏
      if (options?.autoHideDuration !== 0) {
        setTimeout(() => {
          handleClose(key);
        }, options?.autoHideDuration || 3000);
      }

      return key;
    },
    [handleClose]
  );

  const enqueueSnackbar = openSnackbar;

  const mapVariantToSeverity = (variant?: SnackbarVariant): AlertColor => {
    if (!variant || variant === 'default') return 'info';
    return variant as AlertColor;
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
        closeSnackbar: handleClose,
        enqueueSnackbar,
      }}
    >
      {children}

      {messages.length > 0 && (
        <Portal>
          <Box
            sx={{
              position: 'fixed',
              zIndex: 9999,
              right: 16,
              bottom: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {messages.map(({ key, message, options }) => (
              <Alert
                key={key}
                severity={mapVariantToSeverity(options?.variant)}
                onClose={() => handleClose(key)}
                sx={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  ...options?.sx,
                  ...(options?.anchorOrigin?.vertical === 'top' && {
                    top: 16,
                    bottom: 'auto',
                  }),
                  ...(options?.anchorOrigin?.horizontal === 'left' && {
                    left: 16,
                    right: 'auto',
                  }),
                  ...(options?.anchorOrigin?.horizontal === 'center' && {
                    left: '50%',
                    right: 'auto',
                    transform: 'translateX(-50%)',
                  }),
                }}
              >
                {message}
              </Alert>
            ))}
          </Box>
        </Portal>
      )}
    </SnackbarContext.Provider>
  );
}

// ----------------------------------------------------------------------

type Props = {
  message: ReactNode;
  onClose: VoidFunction;
  variant?: SnackbarVariant;
  className?: string;
};

export function Snackbar({ message, variant = 'default', onClose, className }: Props) {
  return (
    <Alert
      severity={variant === 'default' ? 'info' : (variant as AlertColor)}
      onClose={onClose}
      className={className}
    >
      {message}
    </Alert>
  );
}
