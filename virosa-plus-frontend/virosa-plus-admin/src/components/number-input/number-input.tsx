import type { BoxProps } from '@mui/material/Box';
import type { InputBaseProps } from '@mui/material/InputBase';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';

import { varAlpha } from 'minimal-shared/utils';
import { useId, forwardRef, useCallback } from 'react';

import Box from '@mui/material/Box';

import { Iconify } from 'src/components/iconify';

import {
  HelperText,
  CaptionText,
  CenteredInput,
  CounterButton,
  InputContainer,
  NumberInputRoot,
} from './styles';

// ----------------------------------------------------------------------

type NumberInputSlotProps = {
  wrapper?: BoxProps;
  input?: InputBaseProps;
  button?: ButtonBaseProps;
  inputWrapper?: React.ComponentProps<typeof InputContainer>;
  captionText?: React.ComponentProps<typeof CaptionText>;
  helperText?: FormHelperTextProps;
};

type EventHandler =
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
  | React.ChangeEvent<HTMLInputElement>;

export type NumberInputProps = Omit<React.ComponentProps<typeof NumberInputRoot>, 'onChange'> & {
  min?: number;
  max?: number;
  error?: boolean;
  disabled?: boolean;
  value?: number | null;
  hideDivider?: boolean;
  hideButtons?: boolean;
  disableInput?: boolean;
  helperText?: React.ReactNode;
  captionText?: React.ReactNode;
  slotProps?: NumberInputSlotProps;
  onChange?: (event: EventHandler, value: number) => void;
};

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>((props, ref) => {
  const {
    sx,
    error,
    value,
    onChange,
    disabled,
    slotProps,
    helperText,
    captionText,
    hideDivider,
    hideButtons,
    disableInput,
    min = 0,
    max = 9999,
    ...other
  } = props;

  const id = useId();

  const currentValue = value ?? 0;

  const isDecrementDisabled = currentValue <= min || disabled;
  const isIncrementDisabled = currentValue >= max || disabled;

  const handleDecrement = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!isDecrementDisabled) {
        onChange?.(event, currentValue - 1);
      }
    },
    [isDecrementDisabled, onChange, currentValue]
  );

  const handleIncrement = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!isIncrementDisabled) {
        onChange?.(event, currentValue + 1);
      }
    },
    [isIncrementDisabled, onChange, currentValue]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const transformedValue = transformNumberOnChange(event.target.value, { min, max });
      onChange?.(event, transformedValue);
    },
    [max, min, onChange]
  );

  return (
    <Box {...slotProps?.wrapper}>
      <NumberInputRoot
        ref={ref}
        sx={[
          (theme) => ({
            '--border-color': varAlpha(theme.vars.palette.grey['500Channel'], 0.2),
            '--vertical-divider-color': hideDivider
              ? 'transparent'
              : varAlpha(theme.vars.palette.grey['500Channel'], 0.2),
            '--input-background':
              !disabled && error
                ? varAlpha(theme.vars.palette.error.mainChannel, 0.08)
                : varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {!hideButtons && (
          <CounterButton
            disabled={isDecrementDisabled}
            onClick={handleDecrement}
            {...slotProps?.button}
          >
            <Iconify width={16} icon="mingcute:minimize-line" />
          </CounterButton>
        )}

        <InputContainer {...slotProps?.inputWrapper}>
          <CenteredInput
            name={id}
            disabled={disabled || disableInput}
            value={currentValue}
            onChange={handleChange}
            {...slotProps?.input}
          />

          {captionText && <CaptionText {...slotProps?.captionText}>{captionText}</CaptionText>}
        </InputContainer>

        {!hideButtons && (
          <CounterButton
            disabled={isIncrementDisabled}
            onClick={handleIncrement}
            {...slotProps?.button}
          >
            <Iconify width={16} icon="mingcute:add-line" />
          </CounterButton>
        )}
      </NumberInputRoot>

      {helperText && (
        <HelperText error={error} {...slotProps?.helperText}>
          {helperText}
        </HelperText>
      )}
    </Box>
  );
});

// ----------------------------------------------------------------------

export function transformNumberOnChange(
  value: string,
  options?: { min?: number; max?: number }
): number {
  const { min = 0, max = 9999 } = options ?? {};

  if (!value || value.trim() === '') {
    return 0;
  }

  const numericValue = Number(value.trim());

  if (!Number.isNaN(numericValue)) {
    // Clamp the value between min and max
    return Math.min(Math.max(numericValue, min), max);
  }

  return 0;
}
