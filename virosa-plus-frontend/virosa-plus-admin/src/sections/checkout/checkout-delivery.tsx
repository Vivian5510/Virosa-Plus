import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import type { CheckoutContextValue, ICheckoutDeliveryOption } from 'src/types/checkout';

import { varAlpha } from 'minimal-shared/utils';
import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  name: string;
  options: ICheckoutDeliveryOption[];
  onApplyShipping: CheckoutContextValue['onApplyShipping'];
};

export function CheckoutDelivery({ name, options, onApplyShipping, sx, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Card sx={sx} {...other}>
      <CardHeader title="Delivery" />
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Box
            sx={{
              p: 3,
              rowGap: 2.5,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            {options.map((option) => (
              <OptionItem
                key={option.label}
                option={option}
                selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  onApplyShipping(option.value);
                }}
              />
            ))}
          </Box>
        )}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type OptionItemProps = BoxProps & {
  selected: boolean;
  option: ICheckoutDeliveryOption;
};

function OptionItem({ option, selected, sx, ...other }: OptionItemProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          p: 2.5,
          gap: 2,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: 1.5,
          border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
          transition: theme.transitions.create(['box-shadow'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
          ...(selected && { boxShadow: `0 0 0 2px ${theme.vars.palette.text.primary}` }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify
        width={28}
        icon={
          (option.label === 'Standard' && 'carbon:delivery') ||
          (option.label === 'Express' && 'carbon:rocket') ||
          'carbon:bicycle'
        }
      />
      <Box sx={{ flex: '1 1 auto' }}>
        <Box
          sx={{
            mb: 0.5,
            display: 'flex',
            typography: 'h6',
            alignItems: 'center',
          }}
        >
          <Box component="span" sx={{ flexGrow: 1, typography: 'subtitle1' }}>
            {option.label}
          </Box>

          {`$${option.value}`}
        </Box>

        <Box
          component="span"
          sx={{ display: 'flex', typography: 'body2', color: 'text.secondary' }}
        >
          {option.description}
        </Box>
      </Box>
    </Box>
  );
}
