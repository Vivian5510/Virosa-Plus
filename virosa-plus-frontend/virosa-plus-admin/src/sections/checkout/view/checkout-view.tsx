import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CheckoutCart } from '../checkout-cart';
import { useCheckoutContext } from '../context';
import { CheckoutSteps } from '../checkout-steps';
import { CheckoutPayment } from '../checkout-payment';
import { CheckoutOrderComplete } from '../checkout-order-complete';
import { CheckoutBillingAddress } from '../checkout-billing-address';

// ----------------------------------------------------------------------

export function CheckoutView() {
  const { steps, activeStep, completed, onResetCart } = useCheckoutContext();

  return (
    <Container sx={{ mb: 10 }}>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Checkout
      </Typography>

      <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutSteps steps={steps} activeStep={activeStep ?? 0} />
        </Grid>
      </Grid>

      <>
        {activeStep === 0 && <CheckoutCart />}

        {activeStep === 1 && <CheckoutBillingAddress />}

        {activeStep === 2 && <CheckoutPayment />}

        {completed && (
          <CheckoutOrderComplete open onResetCart={onResetCart} onDownloadPDF={() => {}} />
        )}
      </>
    </Container>
  );
}
