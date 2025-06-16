import type { IUserAccountBillingHistory } from 'src/types/user';
import type { IPaymentCard, IAddressItem } from 'src/types/common';

import Grid from '@mui/material/Grid2';

import { AccountBillingPlan } from './account-billing-plan';
import { AccountBillingPayment } from './account-billing-payment';
import { AccountBillingHistory } from './account-billing-history';
import { AccountBillingAddress } from './account-billing-address';

// ----------------------------------------------------------------------

type Props = {
  plans: {
    subscription: string;
    price: number;
    primary: boolean;
  }[];
  cards: IPaymentCard[];
  addressBook: IAddressItem[];
  invoices: IUserAccountBillingHistory[];
};

export function AccountBilling({ cards, plans, invoices, addressBook }: Props) {
  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: 8 }}>
        <AccountBillingPlan plans={plans} cardList={cards} addressBook={addressBook} />
        <AccountBillingPayment cards={cards} />
        <AccountBillingAddress addressBook={addressBook} />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AccountBillingHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
