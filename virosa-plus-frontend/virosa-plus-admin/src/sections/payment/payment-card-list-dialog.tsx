import type { IPaymentCard } from 'src/types/common';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { SearchNotFound } from 'src/components/search-not-found';

import { PaymentCardItem } from './payment-card-item';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  list: IPaymentCard[];
  onClose: () => void;
  selected: (selectedId: string) => boolean;
  onSelect: (card: IPaymentCard | null) => void;
};

export function PaymentCardListDialog({ open, list, onClose, selected, onSelect }: Props) {
  const [searchCard, setSearchCard] = useState('');

  const dataFiltered = applyFilter({
    inputData: list,
    query: searchCard,
  });

  const notFound = !dataFiltered.length && !!searchCard;

  const handleSearchAddress = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCard(event.target.value);
  }, []);

  const handleSelectCard = useCallback(
    (card: IPaymentCard | null) => {
      onSelect(card);
      setSearchCard('');
      onClose();
    },
    [onClose, onSelect]
  );

  const renderList = () => (
    <Stack spacing={2.5} sx={{ p: 3 }}>
      {dataFiltered.map((card) => (
        <PaymentCardItem
          key={card.id}
          card={card}
          onClick={() => handleSelectCard(card)}
          sx={[
            (theme) => ({
              cursor: 'pointer',
              ...(selected(card.id) && {
                boxShadow: `0 0 0 2px ${theme.vars.palette.text.primary}`,
              }),
            }),
          ]}
        />
      ))}
    </Stack>
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Box
        sx={{
          p: 3,
          pr: 1.5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cards
        </Typography>

        <Button
          size="small"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ alignSelf: 'flex-end' }}
        >
          New
        </Button>
      </Box>

      <Stack sx={{ px: 3 }}>
        <TextField
          value={searchCard}
          onChange={handleSearchAddress}
          placeholder="Search..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      {notFound ? (
        <SearchNotFound query={searchCard} sx={{ px: 3, pt: 5, pb: 10 }} />
      ) : (
        renderList()
      )}
    </Dialog>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  query: string;
  inputData: IPaymentCard[];
};

function applyFilter({ inputData, query }: ApplyFilterProps) {
  if (!query) return inputData;

  return inputData.filter(({ cardNumber }) =>
    [cardNumber].some((field) => field?.toLowerCase().includes(query.toLowerCase()))
  );
}
