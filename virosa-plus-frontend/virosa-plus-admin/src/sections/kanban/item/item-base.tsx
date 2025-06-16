import type { IKanbanTask } from 'src/types/kanban';
import type { Transform } from '@dnd-kit/utilities';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';

import { memo, useEffect, forwardRef } from 'react';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { Iconify } from 'src/components/iconify';
import { imageClasses } from 'src/components/image';

import { kanbanClasses } from '../classes';

// ----------------------------------------------------------------------

export type ItemBaseProps = React.ComponentProps<typeof ItemRoot> & {
  task: IKanbanTask;
  open?: boolean;
  stateProps?: {
    fadeIn?: boolean;
    sorting?: boolean;
    disabled?: boolean;
    dragging?: boolean;
    dragOverlay?: boolean;
    transition?: string | null;
    transform?: Transform | null;
    listeners?: DraggableSyntheticListeners;
  };
};

const ItemBase = forwardRef<HTMLLIElement, ItemBaseProps>((props, ref) => {
  const { task, open, stateProps, sx, ...other } = props;

  const { fadeIn, sorting, disabled, dragging, dragOverlay, transition, transform, listeners } =
    stateProps ?? {};

  useEffect(() => {
    if (!dragOverlay) {
      return;
    }

    document.body.style.cursor = 'grabbing';

    // eslint-disable-next-line consistent-return
    return () => {
      document.body.style.cursor = '';
    };
  }, [dragOverlay]);

  const renderPriority = () => (
    <Iconify
      icon={
        (task.priority === 'low' && 'solar:double-alt-arrow-down-bold-duotone') ||
        (task.priority === 'medium' && 'solar:double-alt-arrow-right-bold-duotone') ||
        'solar:double-alt-arrow-up-bold-duotone'
      }
      sx={{
        top: 4,
        right: 4,
        position: 'absolute',
        ...(task.priority === 'low' && { color: 'info.main' }),
        ...(task.priority === 'medium' && { color: 'warning.main' }),
        ...(task.priority === 'hight' && { color: 'error.main' }),
      }}
    />
  );

  const renderImage = () =>
    !!task?.attachments?.length && (
      <Box sx={[(theme) => ({ p: theme.spacing(1, 1, 0, 1) })]}>
        <ItemImage
          open={open}
          className={imageClasses.root}
          alt={task?.attachments?.[0]}
          src={task?.attachments?.[0]}
        />
      </Box>
    );

  const renderInfo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        {!!task?.comments?.length && (
          <>
            <Iconify width={16} icon="solar:chat-round-dots-bold" sx={{ mr: 0.25 }} />
            <Box component="span" sx={{ mr: 1 }}>
              {task?.comments?.length}
            </Box>
          </>
        )}

        {!!task?.attachments?.length && (
          <>
            <Iconify width={16} icon="eva:attach-2-fill" sx={{ mr: 0.25 }} />
            <Box component="span">{task?.attachments?.length}</Box>
          </>
        )}
      </Box>

      <AvatarGroup sx={{ [`& .${avatarGroupClasses.avatar}`]: { width: 24, height: 24 } }}>
        {task?.assignee?.map((user) => (
          <Avatar key={user.id} alt={user.name} src={user.avatarUrl} />
        ))}
      </AvatarGroup>
    </Box>
  );

  return (
    <ItemWrap
      ref={ref}
      className={mergeClasses([kanbanClasses.itemWrap], {
        [kanbanClasses.state.fadeIn]: fadeIn,
        [kanbanClasses.state.dragOverlay]: dragOverlay,
      })}
      style={{
        ...(!!transition && { transition }),
        ...(!!transform && {
          '--translate-x': `${Math.round(transform.x)}px`,
          '--translate-y': `${Math.round(transform.y)}px`,
          '--scale-x': `${transform.scaleX}`,
          '--scale-y': `${transform.scaleY}`,
        }),
      }}
    >
      <ItemRoot
        className={mergeClasses([kanbanClasses.item], {
          [kanbanClasses.state.sorting]: sorting,
          [kanbanClasses.state.dragging]: dragging,
          [kanbanClasses.state.disabled]: disabled,
          [kanbanClasses.state.dragOverlay]: dragOverlay,
        })}
        data-cypress="draggable-item"
        tabIndex={0}
        sx={sx}
        {...listeners}
        {...other}
      >
        {renderImage()}

        <ItemContent>
          {renderPriority()}
          {task.name}
          {renderInfo()}
        </ItemContent>
      </ItemRoot>
    </ItemWrap>
  );
});

export default memo(ItemBase);

// ----------------------------------------------------------------------

const ItemWrap = styled('li')(() => ({
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  display: 'flex',
  transform:
    'translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1))',
  transformOrigin: '0 0',
  touchAction: 'manipulation',
  [`&.${kanbanClasses.state.fadeIn}`]: {
    animation: 'fadeIn 500ms ease',
  },
  [`&.${kanbanClasses.state.dragOverlay}`]: {
    zIndex: 999,
  },
}));

const ItemRoot = styled('div')(({ theme }) => ({
  width: '100%',
  cursor: 'grab',
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  transformOrigin: '50% 50%',
  touchAction: 'manipulation',
  borderRadius: 'var(--item-radius)',
  WebkitTapHighlightColor: 'transparent',
  boxShadow: theme.vars.customShadows.z1,
  backgroundColor: theme.vars.palette.common.white,
  transition: theme.transitions.create(['box-shadow']),
  ...theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.grey[900],
  }),
  [`&.${kanbanClasses.state.disabled}`]: {},
  [`&.${kanbanClasses.state.sorting}`]: {},
  // When move item overlay
  [`&.${kanbanClasses.state.dragOverlay}`]: {
    backdropFilter: 'blur(6px)',
    boxShadow: theme.vars.customShadows.z20,
    backgroundColor: varAlpha(theme.vars.palette.common.whiteChannel, 0.48),
    ...theme.applyStyles('dark', {
      backgroundColor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
    }),
  },
  // Placeholder when dragging item
  [`&.${kanbanClasses.state.dragging}`]: {
    opacity: 0.2,
    filter: 'grayscale(1)',
  },
}));

const ItemContent = styled('div')(({ theme }) => ({
  ...theme.typography.subtitle2,
  position: 'relative',
  padding: theme.spacing(2.5, 2),
}));

const ItemImage = styled('img', {
  shouldForwardProp: (prop: string) => !['open', 'sx'].includes(prop),
})<Pick<ItemBaseProps, 'open'>>(({ theme }) => ({
  width: 320,
  height: 'auto',
  aspectRatio: '4/3',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius * 1.5,
  variants: [
    {
      props: { open: true },
      style: {
        opacity: 0.8,
      },
    },
  ],
}));
