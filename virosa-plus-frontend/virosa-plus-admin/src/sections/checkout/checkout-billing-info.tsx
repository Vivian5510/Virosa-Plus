import type { CardProps } from '@mui/material/Card';
import type { CheckoutContextValue } from 'src/types/checkout';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  loading: CheckoutContextValue['loading'];
  checkoutState: CheckoutContextValue['state'];
  onChangeStep: CheckoutContextValue['onChangeStep'];
};

export function CheckoutBillingInfo({ checkoutState, onChangeStep, loading, sx, ...other }: Props) {
  const { billing } = checkoutState;

  const renderLoading = () => (
    <Box sx={{ height: 104, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 120 }} />
    </Box>
  );

  return (
    <Card sx={[{ mb: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <CardHeader
        title="Address"
        action={
          <Button
            size="small"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={() => onChangeStep('back')}
          >
            Edit
          </Button>
        }
      />

      <Stack spacing={1} sx={{ p: 3 }}>
        {loading ? (
          renderLoading()
        ) : (
          <>
            <Box sx={{ typography: 'subtitle2' }}>
              {`${billing?.name} `}
              <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
                ({billing?.addressType})
              </Box>
            </Box>

            <Box sx={{ color: 'text.secondary', typography: 'body2' }}>{billing?.fullAddress}</Box>
            <Box sx={{ color: 'text.secondary', typography: 'body2' }}>{billing?.phoneNumber}</Box>
          </>
        )}
      </Stack>
    </Card>
  );
}
