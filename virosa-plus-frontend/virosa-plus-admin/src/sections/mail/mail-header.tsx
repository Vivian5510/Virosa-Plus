import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  onOpenNav: () => void;
  onOpenMail?: () => void;
};

export function MailHeader({ onOpenNav, onOpenMail, sx, ...other }: Props) {
  return (
    <Box
      sx={[
        () => ({
          py: 1,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <IconButton onClick={onOpenNav}>
        <Iconify icon="fluent:mail-24-filled" />
      </IconButton>
      {onOpenMail && (
        <IconButton onClick={onOpenMail}>
          <Iconify icon="solar:chat-round-dots-bold" />
        </IconButton>
      )}
      <TextField
        fullWidth
        size="small"
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
        sx={{ ml: 2 }}
      />
    </Box>
  );
}
