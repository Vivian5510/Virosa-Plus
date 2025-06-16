import type { IMails } from 'src/types/mail';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { EmptyContent } from 'src/components/empty-content';

import { MailItem } from './mail-item';
import { MailItemSkeleton } from './mail-skeleton';

// ----------------------------------------------------------------------

type Props = {
  isEmpty: boolean;
  loading: boolean;
  openMail: boolean;
  mails: IMails;
  selectedMailId: string;
  selectedLabelId: string;
  onCloseMail: () => void;
  onClickMail: (id: string) => void;
};

export function MailList({
  isEmpty,
  loading,
  mails,
  openMail,
  onCloseMail,
  onClickMail,
  selectedMailId,
  selectedLabelId,
}: Props) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const renderLoading = () => (
    <Stack sx={{ px: 2, flex: '1 1 auto' }}>
      <MailItemSkeleton />
    </Stack>
  );

  const renderEmpty = () => (
    <Stack sx={{ px: 2, flex: '1 1 auto' }}>
      <EmptyContent
        title={`Nothing in ${selectedLabelId}`}
        description="This folder is empty"
        imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-folder-empty.svg`}
      />
    </Stack>
  );

  const renderList = () =>
    isEmpty ? (
      renderEmpty()
    ) : (
      <Scrollbar sx={{ flex: '1 1 0' }}>
        <nav>
          <Box
            component="ul"
            sx={{
              px: 2,
              pb: 1,
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {mails.allIds.map((mailId) => (
              <MailItem
                key={mailId}
                mail={mails.byId[mailId]}
                selected={selectedMailId === mailId}
                onClick={() => onClickMail(mailId)}
              />
            ))}
          </Box>
        </nav>
      </Scrollbar>
    );

  const renderContent = () => (
    <>
      <Stack sx={{ p: 2 }}>
        {mdUp ? (
          <TextField
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
        ) : (
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {selectedLabelId}
          </Typography>
        )}
      </Stack>

      {loading ? renderLoading() : renderList()}
    </>
  );

  return (
    <>
      {renderContent()}

      <Drawer
        open={openMail}
        onClose={onCloseMail}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        {renderContent()}
      </Drawer>
    </>
  );
}
