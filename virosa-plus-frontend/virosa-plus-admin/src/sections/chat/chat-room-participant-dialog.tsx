import type { IChatParticipant } from 'src/types/chat';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  participant: IChatParticipant;
};

export function ChatRoomParticipantDialog({ participant, open, onClose }: Props) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>

      <DialogContent sx={{ py: 5, px: 3, display: 'flex' }}>
        <Avatar
          alt={participant.name}
          src={participant.avatarUrl}
          sx={{ width: 96, height: 96, mr: 3 }}
        />

        <Stack spacing={1}>
          <Typography variant="caption" sx={{ color: 'primary.main' }}>
            {participant.role}
          </Typography>

          <Typography variant="subtitle1">{participant.name}</Typography>

          <Box sx={{ display: 'flex', typography: 'caption', color: 'text.disabled' }}>
            <Iconify
              icon="mingcute:location-fill"
              width={16}
              sx={{ flexShrink: 0, mr: 0.5, mt: '2px' }}
            />
            {participant.address}
          </Box>

          <Box sx={{ gap: 1, pt: 1.5, display: 'flex' }}>
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

            <IconButton
              size="small"
              color="secondary"
              sx={[
                (theme) => ({
                  borderRadius: 1,
                  bgcolor: varAlpha(theme.vars.palette.secondary.mainChannel, 0.08),
                  '&:hover': { bgcolor: varAlpha(theme.vars.palette.secondary.mainChannel, 0.16) },
                }),
              ]}
            >
              <Iconify width={18} icon="solar:videocamera-record-bold" />
            </IconButton>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
