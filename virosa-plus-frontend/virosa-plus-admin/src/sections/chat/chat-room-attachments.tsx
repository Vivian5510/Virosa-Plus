import type { IChatAttachment } from 'src/types/chat';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';

import { fDateTime } from 'src/utils/format-time';

import { FileThumbnail } from 'src/components/file-thumbnail';

import { CollapseButton } from './styles';

// ----------------------------------------------------------------------

type Props = {
  attachments: IChatAttachment[];
};

export function ChatRoomAttachments({ attachments }: Props) {
  const collapse = useBoolean(true);

  const totalAttachments = attachments.length;

  const renderList = () =>
    attachments.map((attachment, index) => (
      <Box key={attachment.name + index} sx={{ gap: 1.5, display: 'flex', alignItems: 'center' }}>
        <FileThumbnail
          imageView
          file={attachment.preview}
          onDownload={() => console.info('DOWNLOAD')}
          slotProps={{ icon: { sx: { width: 24, height: 24 } } }}
          sx={{ width: 40, height: 40, bgcolor: 'background.neutral' }}
        />

        <ListItemText
          primary={attachment.name}
          secondary={fDateTime(attachment.createdAt)}
          slotProps={{
            primary: { noWrap: true, sx: { typography: 'body2' } },
            secondary: {
              noWrap: true,
              sx: {
                mt: 0.25,
                typography: 'caption',
                color: 'text.disabled',
              },
            },
          }}
        />
      </Box>
    ));

  return (
    <>
      <CollapseButton
        selected={collapse.value}
        disabled={!totalAttachments}
        onClick={collapse.onToggle}
      >
        {`Attachments (${totalAttachments})`}
      </CollapseButton>

      {!!totalAttachments && (
        <Collapse in={collapse.value}>
          <Stack spacing={2} sx={{ p: 2 }}>
            {renderList()}
          </Stack>
        </Collapse>
      )}
    </>
  );
}
