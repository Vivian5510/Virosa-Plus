import { _userPlans, _userPayment, _userInvoices, _userAddressBook } from 'src/_mock';

import { AccountBilling } from '../account-billing';

// ----------------------------------------------------------------------

export function AccountBillingView() {
  return (
    <AccountBilling
      plans={_userPlans}
      cards={_userPayment}
      invoices={_userInvoices}
      addressBook={_userAddressBook}
    />
  );
}
