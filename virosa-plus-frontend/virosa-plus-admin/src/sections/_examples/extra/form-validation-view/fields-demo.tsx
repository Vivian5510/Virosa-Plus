import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { today } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { FieldsSchema } from './schema';
import { ComponentBox } from '../../layout';
import { ValuesPreview } from './components/values-preview';
import { FormGrid, FormActions, FieldContainer, componentBoxStyles } from './components';

import type { FieldsSchemaType } from './schema';

// ----------------------------------------------------------------------

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

const defaultValues: FieldsSchemaType = {
  email: '',
  fullName: '',
  // handle number with 0, null, undefined
  age: null,
  price: undefined,
  quantity: 0,
  // phone and code
  code: '',
  phoneNumber: '',
  // password
  password: '',
  confirmPassword: '',
  // date
  startDate: today(),
  endDate: null,
  // country
  singleCountry: '',
  multiCountry: [],
  // select
  singleSelect: '',
  multiSelect: [],
  autocomplete: null,
};

type Props = {
  debug: boolean;
  onCloseDebug: () => void;
};

export function FieldsDemo({ debug, onCloseDebug }: Props) {
  const showPassword = useBoolean();

  const methods = useForm<FieldsSchemaType>({
    resolver: zodResolver(FieldsSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderBase = () => (
    <>
      <FieldContainer>
        <Field.Text name="fullName" label="Full name" helperText="Helper text" />
      </FieldContainer>

      <FieldContainer>
        <Field.Text name="email" label="Email address" />
      </FieldContainer>

      <FieldContainer>
        <Field.Text name="age" label="Age" type="number" />
      </FieldContainer>

      <FieldContainer>
        <Field.Text
          name="price"
          label="Price"
          placeholder="0.00"
          type="number"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    $
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />
      </FieldContainer>

      <FieldContainer label="RHFNumberInput" sx={{ alignItems: 'flex-start' }}>
        <Field.NumberInput
          name="quantity"
          helperText={
            <>
              <Iconify width={16} icon="solar:info-circle-bold" />
              Helper text
            </>
          }
          sx={{ maxWidth: 120 }}
        />
      </FieldContainer>
    </>
  );

  const renderPassword = () => (
    <>
      <FieldContainer>
        <Field.Text
          name="password"
          label="Password"
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FieldContainer>

      <FieldContainer>
        <Field.Text
          name="confirmPassword"
          label="Confirm password"
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FieldContainer>
    </>
  );

  const renderDate = () => (
    <>
      <FieldContainer label="RHFDatePicker">
        <Field.DatePicker name="startDate" label="Start date" />
      </FieldContainer>
      <FieldContainer label="RHFDatePicker">
        <Field.DatePicker name="endDate" label="End date" />
      </FieldContainer>
    </>
  );

  const renderPhoneAndOtp = () => (
    <>
      <FieldContainer label="RHFPhone">
        <Field.Phone name="phoneNumber" label="Phone number" country="US" />
      </FieldContainer>

      <FieldContainer label="RHFCode">
        <Field.Code
          name="code"
          gap={1}
          autoFocus={false}
          slotProps={{
            textfield: {
              variant: 'standard',
              disabled: false,
            },
          }}
        />
      </FieldContainer>
    </>
  );

  const renderCountry = () => (
    <>
      <FieldContainer label="RHFAutocomplete">
        <Field.CountrySelect
          fullWidth
          name="singleCountry"
          label="Single country"
          placeholder="Choose a country"
        />
      </FieldContainer>

      <FieldContainer label="RHFAutocomplete">
        <Field.CountrySelect
          multiple
          fullWidth
          limitTags={3}
          name="multiCountry"
          label="Multi country"
          placeholder="Choose a country"
          helperText="Helper text"
        />
      </FieldContainer>
    </>
  );

  const renderSelect = () => (
    <>
      <FieldContainer label="RHFSelect">
        <Field.Select name="singleSelect" label="Single select">
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
      </FieldContainer>

      <FieldContainer label="RHFMultiSelect">
        <Field.MultiSelect
          chip
          checkbox
          name="multiSelect"
          label="Multi select"
          options={OPTIONS}
        />
      </FieldContainer>

      <FieldContainer label="RHFAutocomplete">
        <Field.Autocomplete
          name="autocomplete"
          label="Autocomplete"
          options={OPTIONS}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />
      </FieldContainer>
    </>
  );

  return (
    <>
      {isSubmitting && (
        <Backdrop open sx={[(theme) => ({ zIndex: theme.zIndex.modal + 1 })]}>
          <CircularProgress color="warning" />
        </Backdrop>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {debug && <ValuesPreview onCloseDebug={onCloseDebug} />}

        <FormActions
          loading={isSubmitting}
          disabled={Object.keys(errors).length === 0}
          onReset={() => reset()}
        />

        <FormGrid>
          <ComponentBox title="Base" sx={componentBoxStyles}>
            {renderBase()}
          </ComponentBox>

          <ComponentBox title="Password" sx={componentBoxStyles}>
            {renderPassword()}
          </ComponentBox>

          <ComponentBox title="Date" sx={componentBoxStyles}>
            {renderDate()}
          </ComponentBox>

          <ComponentBox title="Country" sx={componentBoxStyles}>
            {renderCountry()}
          </ComponentBox>

          <ComponentBox title="Phone & OTP" sx={componentBoxStyles}>
            {renderPhoneAndOtp()}
          </ComponentBox>

          <ComponentBox title="Select" sx={componentBoxStyles}>
            {renderSelect()}
          </ComponentBox>
        </FormGrid>
      </Form>
    </>
  );
}
