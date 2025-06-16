import type { IOrderItem } from 'src/types/order';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';

import { paths } from 'src/routes/paths';

import { ORDER_STATUS_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { OrderDetailsItems } from '../order-details-items';
import { OrderDetailsToolbar } from '../order-details-toolbar';
import { OrderDetailsHistory } from '../order-details-history';
import { OrderDetailsPayment } from '../order-details-payment';
import { OrderDetailsCustomer } from '../order-details-customer';
import { OrderDetailsDelivery } from '../order-details-delivery';
import { OrderDetailsShipping } from '../order-details-shipping';

// ----------------------------------------------------------------------

type Props = {
  order?: IOrderItem;
};

export function OrderDetailsView({ order }: Props) {
  const [status, setStatus] = useState(order?.status);

  const handleChangeStatus = useCallback((newValue: string) => {
    setStatus(newValue);
  }, []);

  return (
    <DashboardContent>
      <OrderDetailsToolbar
        status={status}
        createdAt={order?.createdAt}
        orderNumber={order?.orderNumber}
        backHref={paths.dashboard.order.root}
        onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{ gap: 3, display: 'flex', flexDirection: { xs: 'column-reverse', md: 'column' } }}
          >
            <OrderDetailsItems
              items={order?.items}
              taxes={order?.taxes}
              shipping={order?.shipping}
              discount={order?.discount}
              subtotal={order?.subtotal}
              totalAmount={order?.totalAmount}
            />

            <OrderDetailsHistory history={order?.history} />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <OrderDetailsCustomer customer={order?.customer} />

            <Divider sx={{ borderStyle: 'dashed' }} />
            <OrderDetailsDelivery delivery={order?.delivery} />

            <Divider sx={{ borderStyle: 'dashed' }} />
            <OrderDetailsShipping shippingAddress={order?.shippingAddress} />

            <Divider sx={{ borderStyle: 'dashed' }} />
            <OrderDetailsPayment payment={order?.payment} />
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
