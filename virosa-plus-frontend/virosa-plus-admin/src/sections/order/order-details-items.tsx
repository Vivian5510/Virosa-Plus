import type { CardProps } from '@mui/material/Card';
import type { IOrderProductItem } from 'src/types/order';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = CardProps & {
  taxes?: number;
  shipping?: number;
  discount?: number;
  subtotal?: number;
  totalAmount?: number;
  items?: IOrderProductItem[];
};

export function OrderDetailsItems({
  sx,
  taxes,
  shipping,
  discount,
  subtotal,
  items = [],
  totalAmount,
  ...other
}: Props) {
  const renderTotal = () => (
    <Box
      sx={{
        p: 3,
        gap: 2,
        display: 'flex',
        textAlign: 'right',
        typography: 'body2',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ color: 'text.secondary' }}>Shipping</Box>
        <Box sx={{ width: 160, ...(shipping && { color: 'error.main' }) }}>
          {shipping ? `- ${fCurrency(shipping)}` : '-'}
        </Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box sx={{ width: 160, ...(discount && { color: 'error.main' }) }}>
          {discount ? `- ${fCurrency(discount)}` : '-'}
        </Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ color: 'text.secondary' }}>Taxes</Box>

        <Box sx={{ width: 160 }}>{taxes ? fCurrency(taxes) : '-'}</Box>
      </Box>

      <Box sx={{ display: 'flex', typography: 'subtitle1' }}>
        <div>Total</div>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Box>
    </Box>
  );

  return (
    <Card sx={sx} {...other}>
      <CardHeader
        title="Details"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />

      <Scrollbar>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={[
              (theme) => ({
                p: 3,
                minWidth: 640,
                display: 'flex',
                alignItems: 'center',
                borderBottom: `dashed 2px ${theme.vars.palette.background.neutral}`,
              }),
            ]}
          >
            <Avatar src={item.coverUrl} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} />

            <ListItemText
              primary={item.name}
              secondary={item.sku}
              slotProps={{
                primary: { sx: { typography: 'body2' } },
                secondary: {
                  sx: { mt: 0.5, color: 'text.disabled' },
                },
              }}
            />

            <Box sx={{ typography: 'body2' }}>x{item.quantity}</Box>

            <Box sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}>
              {fCurrency(item.price)}
            </Box>
          </Box>
        ))}
      </Scrollbar>

      {renderTotal()}
    </Card>
  );
}
