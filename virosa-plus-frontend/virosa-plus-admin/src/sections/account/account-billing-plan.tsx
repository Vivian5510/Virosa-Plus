import type { IPaymentCard, IAddressItem } from 'src/types/common';

import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';

import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { AddressListDialog } from '../address';
import { PaymentCardListDialog } from '../payment/payment-card-list-dialog';

// ----------------------------------------------------------------------

type Props = {
  cardList: IPaymentCard[];
  addressBook: IAddressItem[];
  plans: {
    price: number;
    primary: boolean;
    subscription: string;
  }[];
};

export function AccountBillingPlan({ cardList, addressBook, plans }: Props) {
  const openAddress = useBoolean();

  const openCards = useBoolean();

  const primaryCard = cardList.find((card) => card.primary) || null;
  const primaryAddress = addressBook.find((address) => address.primary) || null;

  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedCard, setSelectedCard] = useState<IPaymentCard | null>(primaryCard);
  const [selectedAddress, setSelectedAddress] = useState<IAddressItem | null>(primaryAddress);

  const handleSelectPlan = useCallback(
    (newValue: string) => {
      const currentPlan = plans.find((plan) => plan.primary);
      if (currentPlan?.subscription !== newValue) {
        setSelectedPlan(newValue);
      }
    },
    [plans]
  );

  const handleSelectAddress = useCallback((newValue: IAddressItem | null) => {
    setSelectedAddress(newValue);
  }, []);

  const handleSelectCard = useCallback((newValue: IPaymentCard | null) => {
    setSelectedCard(newValue);
  }, []);

  const renderPlans = () =>
    plans.map((plan) => (
      <Grid key={plan.subscription} size={{ xs: 12, md: 4 }}>
        <Paper
          variant="outlined"
          onClick={() => handleSelectPlan(plan.subscription)}
          sx={[
            (theme) => ({
              p: 2.5,
              borderRadius: 1.5,
              cursor: 'pointer',
              position: 'relative',
              ...(plan.primary && { opacity: 0.48, cursor: 'default' }),
              ...(plan.subscription === selectedPlan && {
                boxShadow: `0 0 0 2px ${theme.vars.palette.text.primary}`,
              }),
            }),
          ]}
        >
          {plan.primary && (
            <Label
              color="info"
              startIcon={<Iconify icon="eva:star-fill" />}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              Current
            </Label>
          )}

          {plan.subscription === 'basic' && <PlanFreeIcon />}
          {plan.subscription === 'starter' && <PlanStarterIcon />}
          {plan.subscription === 'premium' && <PlanPremiumIcon />}

          <Box
            sx={{
              typography: 'subtitle2',
              mt: 2,
              mb: 0.5,
              textTransform: 'capitalize',
            }}
          >
            {plan.subscription}
          </Box>

          <Box sx={{ display: 'flex', typography: 'h4', alignItems: 'center' }}>
            {plan.price || 'Free'}

            {!!plan.price && (
              <Box component="span" sx={{ typography: 'body2', color: 'text.disabled', ml: 0.5 }}>
                /mo
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>
    ));

  return (
    <>
      <Card>
        <CardHeader title="Plan" />

        <Grid container spacing={2} sx={{ p: 3 }}>
          {renderPlans()}
        </Grid>

        <Stack spacing={2} sx={{ p: 3, pt: 0, typography: 'body2' }}>
          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid sx={{ color: 'text.secondary' }} size={{ xs: 12, md: 4 }}>
              Plan
            </Grid>

            <Grid
              sx={{ typography: 'subtitle2', textTransform: 'capitalize' }}
              size={{ xs: 12, md: 8 }}
            >
              {selectedPlan || '-'}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid sx={{ color: 'text.secondary' }} size={{ xs: 12, md: 4 }}>
              Billing name
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Button
                onClick={openAddress.onTrue}
                endIcon={<Iconify width={16} icon="eva:arrow-ios-downward-fill" />}
                sx={{ typography: 'subtitle2', p: 0, borderRadius: 0 }}
              >
                {selectedAddress?.name}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid sx={{ color: 'text.secondary' }} size={{ xs: 12, md: 4 }}>
              Billing address
            </Grid>

            <Grid sx={{ color: 'text.secondary' }} size={{ xs: 12, md: 8 }}>
              {selectedAddress?.fullAddress}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid sx={{ color: 'text.secondary' }} size={{ xs: 12, md: 4 }}>
              Billing phone number
            </Grid>

            <Grid sx={{ color: 'text.secondary' }} size={{ xs: 12, md: 8 }}>
              {selectedAddress?.phoneNumber}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 0.5, md: 2 }}>
            <Grid sx={{ color: 'text.secondary' }} size={{ xs: 12, md: 4 }}>
              Payment method
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Button
                onClick={openCards.onTrue}
                endIcon={<Iconify width={16} icon="eva:arrow-ios-downward-fill" />}
                sx={{ typography: 'subtitle2', p: 0, borderRadius: 0 }}
              >
                {selectedCard?.cardNumber}
              </Button>
            </Grid>
          </Grid>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          sx={{
            p: 3,
            gap: 1.5,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="outlined">Cancel plan</Button>
          <Button variant="contained">Upgrade plan</Button>
        </Box>
      </Card>

      <PaymentCardListDialog
        list={cardList}
        open={openCards.value}
        onClose={openCards.onFalse}
        selected={(selectedId: string) => selectedCard?.id === selectedId}
        onSelect={handleSelectCard}
      />

      <AddressListDialog
        list={addressBook}
        open={openAddress.value}
        onClose={openAddress.onFalse}
        selected={(selectedId: string) => selectedAddress?.id === selectedId}
        onSelect={handleSelectAddress}
        action={
          <Button
            size="small"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ alignSelf: 'flex-end' }}
          >
            New
          </Button>
        }
      />
    </>
  );
}
