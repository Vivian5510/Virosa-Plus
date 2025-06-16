import type { ICheckoutItem, CheckoutContextValue } from 'src/types/checkout';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';
import { NumberInput } from 'src/components/number-input';

// ----------------------------------------------------------------------

type Props = {
  row: ICheckoutItem;
  onDeleteCartItem: CheckoutContextValue['onDeleteCartItem'];
  onChangeItemQuantity: CheckoutContextValue['onChangeItemQuantity'];
};

export function CheckoutCartProduct({ row, onDeleteCartItem, onChangeItemQuantity }: Props) {
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            alt={row.name}
            src={row.coverUrl}
            sx={{ width: 64, height: 64 }}
          />

          <Stack spacing={0.5}>
            <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
              {row.name}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                typography: 'body2',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              size: <Label sx={{ ml: 0.5 }}> {row.size} </Label>
              <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
              <ColorPreview colors={row.colors} />
            </Box>
          </Stack>
        </Box>
      </TableCell>

      <TableCell>{fCurrency(row.price)}</TableCell>

      <TableCell>
        <Box sx={{ width: 100, textAlign: 'right' }}>
          <NumberInput
            hideDivider
            value={row.quantity}
            onChange={(event, quantity: number) => onChangeItemQuantity(row.id, quantity)}
            max={row.available}
          />

          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
            available: {row.available}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">{fCurrency(row.price * row.quantity)}</TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton onClick={() => onDeleteCartItem(row.id)}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
