import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import type { ICheckoutCardOption, ICheckoutPaymentOption } from 'src/types/checkout';

import { varAlpha } from 'minimal-shared/utils';
import { useBoolean } from 'minimal-shared/hooks';
import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormHelperText from '@mui/material/FormHelperText';

import { Iconify } from 'src/components/iconify';

import { PaymentNewCardForm } from '../payment/payment-new-card-form';

// ----------------------------------------------------------------------

type Props = CardProps & {
  name: string;
  options: {
    cards: ICheckoutCardOption[];
    payments: ICheckoutPaymentOption[];
  };
};

export function CheckoutPaymentMethods({ name, options, sx, ...other }: Props) {
  const { control } = useFormContext();

  const openForm = useBoolean();

  return (
    <>
      <Card sx={sx} {...other}>
        <CardHeader title="Payment" />

        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Box
              sx={{
                p: 3,
                gap: 2.5,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {options.payments.map((option) => {
                const isSelected = value === option.value;

                return (
                  <OptionItem
                    key={option.label}
                    option={option}
                    selected={isSelected}
                    onOpen={openForm.onTrue}
                    cardOptions={options.cards}
                    isCredit={isSelected && option.value === 'creditcard'}
                    onClick={() => onChange(option.value)}
                  />
                );
              })}

              {!!error && (
                <FormHelperText error sx={{ mt: 0, px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />
      </Card>
      <Dialog fullWidth maxWidth="xs" open={openForm.value} onClose={openForm.onFalse}>
        <DialogTitle> Add new card </DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }}>
          <PaymentNewCardForm />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={openForm.onFalse}>
            Cancel
          </Button>

          <Button color="inherit" variant="contained" onClick={openForm.onFalse}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

type OptionItemProps = BoxProps & {
  selected: boolean;
  isCredit: boolean;
  onOpen: () => void;
  option: ICheckoutPaymentOption;
  cardOptions: ICheckoutCardOption[];
};

function OptionItem({
  sx,
  option,
  onOpen,
  selected,
  isCredit,
  cardOptions,
  ...other
}: OptionItemProps) {
  return (
    <Box
      sx={[
        (theme) => ({
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
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            gap: 0.5,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            typography: 'subtitle1',
          }}
        >
          {option.label}
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            {option.description}
          </Box>
        </Box>

        <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
          {option.value === 'creditcard' && (
            <>
              <Iconify icon="logos:mastercard" width={24} />
              <Iconify icon="logos:visa" width={24} />
            </>
          )}
          {option.value === 'paypal' && <Iconify icon="logos:paypal" width={24} />}
          {option.value === 'cash' && <Iconify icon="solar:wad-of-money-bold" width={32} />}
        </Box>
      </Box>

      {isCredit && (
        <Box sx={{ px: 3 }}>
          <TextField select fullWidth label="Card" slotProps={{ select: { native: true } }}>
            {cardOptions.map((card) => (
              <option key={card.value} value={card.value}>
                {card.label}
              </option>
            ))}
          </TextField>

          <Button
            size="small"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
            onClick={onOpen}
            sx={{ my: 3 }}
          >
            Add new card
          </Button>
        </Box>
      )}
    </Box>
  );
}
