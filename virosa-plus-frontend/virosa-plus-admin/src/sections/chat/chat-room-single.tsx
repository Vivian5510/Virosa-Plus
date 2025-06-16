import type { IChatParticipant } from 'src/types/chat';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { CollapseButton } from './styles';

// ----------------------------------------------------------------------

type Props = {
  participant: IChatParticipant;
};

export function ChatRoomSingle({ participant }: Props) {
  const collapse = useBoolean(true);

  const renderInfo = () => (
    <Stack alignItems="center" sx={{ py: 5 }}>
      <Avatar
        alt={participant?.name}
        src={participant?.avatarUrl}
        sx={{ width: 96, height: 96, mb: 2 }}
      />
      <Typography variant="subtitle1">{participant?.name}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
        {participant?.role}
      </Typography>
    </Stack>
  );

  const renderContact = () => (
    <Stack spacing={2} sx={{ px: 2, py: 2.5 }}>
      {[
        { icon: 'mingcute:location-fill', value: participant?.address },
        { icon: 'solar:phone-bold', value: participant?.phoneNumber },
        { icon: 'fluent:mail-24-filled', value: participant?.email },
      ].map((item) => (
        <Box
          key={item.icon}
          sx={{
            gap: 1,
            display: 'flex',
            typography: 'body2',
            wordBreak: 'break-all',
          }}
        >
          <Iconify icon={item.icon} sx={{ flexShrink: 0, color: 'text.disabled' }} />
          {item.value}
        </Box>
      ))}
    </Stack>
  );

  return (
    <>
      {renderInfo()}

      <CollapseButton selected={collapse.value} onClick={collapse.onToggle}>
        Information
      </CollapseButton>

      <Collapse in={collapse.value}>{renderContact()}</Collapse>
    </>
  );
}
