import type { IAddressItem } from 'src/types/common';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

import { _addressBooks } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from './context';
import { CheckoutSummary } from './checkout-summary';
import { AddressItem, AddressNewForm } from '../address';

// ----------------------------------------------------------------------

export function CheckoutBillingAddress() {
  const { onChangeStep, onCreateBillingAddress, state: checkoutState } = useCheckoutContext();

  const addressForm = useBoolean();

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {_addressBooks.slice(0, 4).map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              action={
                <Box sx={{ flexShrink: 0, display: 'flex', flexWrap: 'wrap' }}>
                  {!address.primary && (
                    <Button size="small" color="error" sx={{ mr: 1 }}>
                      Delete
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      onChangeStep('next');
                      onCreateBillingAddress(address);
                    }}
                  >
                    Deliver to this address
                  </Button>
                </Box>
              }
              sx={[
                (theme) => ({
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: theme.vars.customShadows.card,
                }),
              ]}
            />
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={() => onChangeStep('back')}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={addressForm.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New address
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CheckoutSummary checkoutState={checkoutState} />
        </Grid>
      </Grid>

      <AddressNewForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        onCreate={(address: IAddressItem) => {
          onChangeStep('next');
          onCreateBillingAddress(address);
        }}
      />
    </>
  );
}
