import type { BoxProps } from '@mui/material/Box';
import type { RatingProps } from '@mui/material/Rating';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';

import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFRatingProps = RatingProps & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxProps;
    helperText?: FormHelperTextProps;
  };
};

export function RHFRating({ name, helperText, slotProps, ...other }: RHFRatingProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box
          {...slotProps?.wrapper}
          sx={[
            { display: 'flex', flexDirection: 'column' },
            ...(Array.isArray(slotProps?.wrapper?.sx)
              ? (slotProps?.wrapper?.sx ?? [])
              : [slotProps?.wrapper?.sx]),
          ]}
        >
          <Rating
            {...field}
            onChange={(event, newValue) => field.onChange(Number(newValue))}
            {...other}
          />

          <HelperText
            {...slotProps?.helperText}
            disableGutters
            errorMessage={error?.message}
            helperText={helperText}
          />
        </Box>
      )}
    />
  );
}
