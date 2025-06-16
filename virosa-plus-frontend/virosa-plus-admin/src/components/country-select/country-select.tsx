import type { TextFieldProps } from '@mui/material/TextField';
import type {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderGetTagProps,
} from '@mui/material/Autocomplete';

import { useMemo, useCallback } from 'react';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { filledInputClasses } from '@mui/material/FilledInput';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import { countries } from 'src/assets/data';

import { FlagIcon, flagIconClasses } from 'src/components/flag-icon';

// ----------------------------------------------------------------------

type Value = string;

export type AutocompleteBaseProps = Omit<
  AutocompleteProps<any, boolean, boolean, boolean>,
  'options' | 'renderOption' | 'renderInput' | 'renderTags' | 'getOptionLabel'
>;

export type CountrySelectProps = AutocompleteBaseProps & {
  label?: string;
  error?: boolean;
  placeholder?: string;
  hiddenLabel?: boolean;
  getValue?: 'label' | 'code';
  helperText?: React.ReactNode;
  variant?: TextFieldProps['variant'];
};

export function CountrySelect({
  id,
  label,
  error,
  variant,
  multiple,
  helperText,
  hiddenLabel,
  placeholder,
  getValue = 'label',
  ...other
}: CountrySelectProps) {
  const options = useMemo(
    () => countries.map((country) => (getValue === 'label' ? country.label : country.code)),
    [getValue]
  );

  const getCountry = useCallback((inputValue: string) => {
    const country = countries.find(
      (op) => op.label === inputValue || op.code === inputValue || op.phone === inputValue
    );
    return {
      code: country?.code || '',
      label: country?.label || '',
      phone: country?.phone || '',
    };
  }, []);

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement>, option: Value) => {
      const country = getCountry(option);

      return (
        <li {...props} key={country.label}>
          <FlagIcon
            key={country.label}
            code={country.code}
            sx={{
              mr: 1,
              width: 22,
              height: 22,
              borderRadius: '50%',
            }}
          />
          {country.label} ({country.code}) +{country.phone}
        </li>
      );
    },
    [getCountry]
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      const country = getCountry(params.inputProps.value as Value);

      const baseField = {
        ...params,
        label,
        variant,
        placeholder,
        helperText,
        hiddenLabel,
        error: !!error,
        inputProps: { ...params.inputProps, autoComplete: 'new-password' },
      };

      if (multiple) {
        return <TextField {...baseField} />;
      }

      return (
        <TextField
          {...baseField}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" sx={{ ...(!country.code && { display: 'none' }) }}>
                  <FlagIcon
                    key={country.label}
                    code={country.code}
                    sx={{ width: 22, height: 22, borderRadius: '50%' }}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            [`& .${outlinedInputClasses.root}`]: {
              [`& .${flagIconClasses.root}`]: { ml: 0.5, mr: -0.5 },
            },
            [`& .${filledInputClasses.root}`]: {
              [`& .${flagIconClasses.root}`]: { ml: 0.5, mr: -0.5, mt: hiddenLabel ? 0 : -2 },
            },
          }}
        />
      );
    },
    [getCountry, label, variant, placeholder, helperText, hiddenLabel, error, multiple]
  );

  const renderTags = useCallback(
    (selected: Value[], getTagProps: AutocompleteRenderGetTagProps) =>
      selected.map((option, index) => {
        const country = getCountry(option);

        return (
          <Chip
            {...getTagProps({ index })}
            key={country.label}
            label={country.label}
            size="small"
            variant="soft"
            icon={
              <FlagIcon
                key={country.label}
                code={country.code}
                sx={{ width: 16, height: 16, borderRadius: '50%' }}
              />
            }
          />
        );
      }),
    [getCountry]
  );

  const getOptionLabel = useCallback(
    (option: Value) => {
      if (getValue === 'code') {
        const country = countries.find((op) => op.code === option);
        return country?.label ?? '';
      }
      return option;
    },
    [getValue]
  );

  return (
    <Autocomplete
      id={`${id}-country-select`}
      multiple={multiple}
      options={options}
      autoHighlight={!multiple}
      disableCloseOnSelect={multiple}
      renderOption={renderOption}
      renderInput={renderInput}
      renderTags={multiple ? renderTags : undefined}
      getOptionLabel={getOptionLabel}
      {...other}
    />
  );
}
