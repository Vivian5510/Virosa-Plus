import type { DialogProps } from '@mui/material/Dialog';
import type { CheckoutContextValue } from 'src/types/checkout';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { OrderCompleteIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  onDownloadPDF: () => void;
  onResetCart: CheckoutContextValue['onResetCart'];
};

export function CheckoutOrderComplete({ onResetCart, onDownloadPDF, ...other }: Props) {
  return (
    <Dialog
      fullWidth
      fullScreen
      PaperProps={{
        sx: {
          width: { md: `calc(100% - 48px)` },
          height: { md: `calc(100% - 48px)` },
        },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 5,
          gap: 5,
          m: 'auto',
          maxWidth: 480,
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          px: { xs: 2, sm: 0 },
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">Thank you for your purchase!</Typography>

        <OrderCompleteIllustration />

        <Typography>
          Thanks for placing order
          <br />
          <br />
          <Link>01dc1370-3df6-11eb-b378-0242ac130002</Link>
          <br />
          <br />
          We will send you a notification within 5 days when it ships.
          <br /> If you have any question or queries then fell to get in contact us. <br />
          All the best,
        </Typography>

        <Divider sx={{ width: 1, borderStyle: 'dashed' }} />

        <Box
          sx={{
            gap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            component={RouterLink}
            href={paths.product.root}
            size="large"
            color="inherit"
            variant="outlined"
            onClick={onResetCart}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Continue shopping
          </Button>

          <Button
            size="large"
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-download-fill" />}
            onClick={onDownloadPDF}
          >
            Download as PDF
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
