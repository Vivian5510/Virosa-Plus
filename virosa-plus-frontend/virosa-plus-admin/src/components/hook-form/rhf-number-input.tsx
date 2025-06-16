import { Controller, useFormContext } from 'react-hook-form';

import { NumberInput } from '../number-input';

import type { NumberInputProps } from '../number-input';

// ----------------------------------------------------------------------

export type RHFNumberInputProps = NumberInputProps & {
  name: string;
};

export function RHFNumberInput({ name, helperText, ...other }: RHFNumberInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <NumberInput
          {...field}
          onChange={(event, value) => field.onChange(value)}
          {...other}
          error={!!error}
          helperText={error?.message ?? helperText}
        />
      )}
    />
  );
}
