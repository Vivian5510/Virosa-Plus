import type { IMailLabel } from 'src/types/mail';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { EmptyContent } from 'src/components/empty-content';

import { MailNavItem } from './mail-nav-item';
import { MailNavItemSkeleton } from './mail-skeleton';

// ----------------------------------------------------------------------

type Props = {
  isEmpty: boolean;
  openNav: boolean;
  loading: boolean;
  labels: IMailLabel[];
  selectedLabelId: string;
  onCloseNav: () => void;
  onToggleCompose: () => void;
  onClickLabel: (labelId: string) => void;
};

export function MailNav({
  isEmpty,
  loading,
  labels,
  openNav,
  onCloseNav,
  onClickLabel,
  selectedLabelId,
  onToggleCompose,
}: Props) {
  const renderLoading = () => (
    <Stack sx={{ flex: '1 1 auto', px: { xs: 2.5, md: 1.5 } }}>
      <MailNavItemSkeleton />
    </Stack>
  );

  const renderEmpty = () => (
    <Stack sx={{ flex: '1 1 auto', px: { xs: 2.5, md: 1.5 } }}>
      <EmptyContent
        title="No labels"
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
          <Box component="ul" sx={{ pb: 1.5, px: { xs: 1.5, md: 0.5 } }}>
            {labels.map((label) => (
              <MailNavItem
                key={label.id}
                label={label}
                selected={selectedLabelId === label.id}
                onClickNavItem={() => onClickLabel(label.id)}
              />
            ))}
          </Box>
        </nav>
      </Scrollbar>
    );

  const renderContent = () => (
    <>
      <Box sx={(theme) => ({ p: { xs: 2.5, md: theme.spacing(2, 1.5) } })}>
        <Button
          fullWidth
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="solar:pen-bold" />}
          onClick={onToggleCompose}
        >
          Compose
        </Button>
      </Box>

      {loading ? renderLoading() : renderList()}
    </>
  );

  return (
    <>
      {renderContent()}

      <Drawer
        open={openNav}
        onClose={onCloseNav}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 280 } }}
      >
        {renderContent()}
      </Drawer>
    </>
  );
}
