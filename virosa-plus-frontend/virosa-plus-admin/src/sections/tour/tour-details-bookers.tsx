import type { ITourBooker } from 'src/types/tour';
import type { BoxProps } from '@mui/material/Box';

import { useState, useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  bookers?: ITourBooker[];
};

export function TourDetailsBookers({ bookers, sx, ...other }: Props) {
  const [approved, setApproved] = useState<string[]>([]);

  const handleClick = useCallback(
    (item: string) => {
      const selected = approved.includes(item)
        ? approved.filter((value) => value !== item)
        : [...approved, item];

      setApproved(selected);
    },
    [approved]
  );

  return (
    <>
      <Box
        sx={[
          {
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {bookers?.map((booker) => (
          <BookerItem
            key={booker.id}
            booker={booker}
            selected={approved.includes(booker.id)}
            onSelected={() => handleClick(booker.id)}
          />
        ))}
      </Box>

      <Pagination count={10} sx={{ mt: { xs: 5, md: 8 }, mx: 'auto' }} />
    </>
  );
}

// ----------------------------------------------------------------------

type BookerItemProps = {
  selected: boolean;
  booker: ITourBooker;
  onSelected: () => void;
};

function BookerItem({ booker, selected, onSelected }: BookerItemProps) {
  const renderActions = () => (
    <Box sx={{ mt: 2, gap: 1, display: 'flex' }}>
      <IconButton
        size="small"
        color="error"
        sx={[
          (theme) => ({
            borderRadius: 1,
            bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
            '&:hover': { bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.16) },
          }),
        ]}
      >
        <Iconify width={18} icon="solar:phone-bold" />
      </IconButton>

      <IconButton
        size="small"
        color="info"
        sx={[
          (theme) => ({
            borderRadius: 1,
            bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.08),
            '&:hover': { bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.16) },
          }),
        ]}
      >
        <Iconify width={18} icon="solar:chat-round-dots-bold" />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        sx={[
          (theme) => ({
            borderRadius: 1,
            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
            '&:hover': { bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16) },
          }),
        ]}
      >
        <Iconify width={18} icon="fluent:mail-24-filled" />
      </IconButton>
    </Box>
  );

  return (
    <Card key={booker.id} sx={{ p: 3, gap: 2, display: 'flex' }}>
      <Avatar alt={booker.name} src={booker.avatarUrl} sx={{ width: 48, height: 48 }} />

      <Box sx={{ minWidth: 0, flex: '1 1 auto' }}>
        <ListItemText
          primary={booker.name}
          secondary={
            <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
              <Iconify icon="solar:users-group-rounded-bold" width={16} />
              {booker.guests} guests
            </Box>
          }
          slotProps={{
            primary: { noWrap: true },
            secondary: {
              sx: { mt: 0.5, typography: 'caption', color: 'text.disabled' },
            },
          }}
        />

        {renderActions()}
      </Box>

      <Button
        size="small"
        variant={selected ? 'text' : 'outlined'}
        color={selected ? 'success' : 'inherit'}
        startIcon={
          selected ? <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} /> : null
        }
        onClick={onSelected}
      >
        {selected ? 'Approved' : 'Approve'}
      </Button>
    </Card>
  );
}
