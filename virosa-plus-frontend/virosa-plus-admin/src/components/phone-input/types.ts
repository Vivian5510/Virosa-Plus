import type { Theme, SxProps } from '@mui/material/styles';
import type { TextFieldProps } from '@mui/material/TextField';
import type { Value, Country } from 'react-phone-number-input/input';

// ----------------------------------------------------------------------

export type PhoneInputProps = Omit<TextFieldProps, 'onChange' | 'ref'> & {
  value: string;
  country?: Country;
  disableSelect?: boolean;
  onChange: (newValue: Value) => void;
};

export type CountryListProps = {
  sx?: SxProps<Theme>;
  countryCode?: Country;
  searchCountry: string;
  countries: { label: string; code: string; phone: string }[];
  onClickCountry: (inputValue: Country) => void;
  onSearchCountry: (inputValue: string) => void;
};
