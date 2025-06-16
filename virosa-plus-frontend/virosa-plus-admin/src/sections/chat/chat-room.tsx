import type { BoxProps } from '@mui/material/Box';
import type { IChatParticipant, IChatConversation } from 'src/types/chat';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { Scrollbar } from 'src/components/scrollbar';

import { ChatRoomGroup } from './chat-room-group';
import { ChatRoomSkeleton } from './chat-skeleton';
import { ChatRoomSingle } from './chat-room-single';
import { ChatRoomAttachments } from './chat-room-attachments';

import type { UseNavCollapseReturn } from './hooks/use-collapse-nav';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const NAV_DRAWER_WIDTH = 320;

type Props = BoxProps & {
  loading: boolean;
  participants: IChatParticipant[];
  collapseNav: UseNavCollapseReturn;
  messages: IChatConversation['messages'];
};

export function ChatRoom({ collapseNav, participants, messages, loading, sx, ...other }: Props) {
  const { collapseDesktop, openMobile, onCloseMobile } = collapseNav;

  const isGroup = participants.length > 1;

  const attachments = messages.map((msg) => msg.attachments).flat(1) || [];

  const renderContent = () =>
    loading ? (
      <ChatRoomSkeleton />
    ) : (
      <Scrollbar>
        <div>
          {isGroup ? (
            <ChatRoomGroup participants={participants} />
          ) : (
            <ChatRoomSingle participant={participants[0]} />
          )}

          <ChatRoomAttachments attachments={attachments} />
        </div>
      </Scrollbar>
    );

  return (
    <>
      <Box
        sx={[
          (theme) => ({
            minHeight: 0,
            flex: '1 1 auto',
            width: NAV_WIDTH,
            flexDirection: 'column',
            display: { xs: 'none', lg: 'flex' },
            borderLeft: `solid 1px ${theme.vars.palette.divider}`,
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.shorter,
            }),
            ...(collapseDesktop && { width: 0 }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {!collapseDesktop && renderContent()}
      </Box>

      <Drawer
        anchor="right"
        open={openMobile}
        onClose={onCloseMobile}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: NAV_DRAWER_WIDTH } }}
      >
        {renderContent()}
      </Drawer>
    </>
  );
}
