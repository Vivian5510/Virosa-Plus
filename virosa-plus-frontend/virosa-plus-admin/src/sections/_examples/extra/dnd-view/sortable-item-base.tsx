import type { Transform } from '@dnd-kit/utilities';
import type { Theme, SxProps } from '@mui/material/styles';
import type { UniqueIdentifier, DraggableSyntheticListeners } from '@dnd-kit/core';

import { memo, useEffect, forwardRef } from 'react';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

import { itemClasses } from './classes';

// ----------------------------------------------------------------------

type ItemBaseProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
  item: UniqueIdentifier;
  onRemove?: () => void;
  stateProps?: {
    sorting?: boolean;
    dragging?: boolean;
    dragOverlay?: boolean;
    transition?: string | null;
    transform?: Transform | null;
    listeners?: DraggableSyntheticListeners;
    handleProps?: any;
  };
};

const ItemBase = forwardRef<HTMLLIElement, ItemBaseProps>((props, ref) => {
  const { item, stateProps, onRemove, sx, ...other } = props;

  useEffect(() => {
    if (!stateProps?.dragOverlay) {
      return;
    }

    document.body.style.cursor = 'grabbing';

    // eslint-disable-next-line consistent-return
    return () => {
      document.body.style.cursor = '';
    };
  }, [stateProps?.dragOverlay]);

  const renderActions = () => (
    <ItemActions>
      <IconButton
        disableRipple
        disableFocusRipple
        disableTouchRipple
        size="small"
        onClick={onRemove}
        className={itemClasses.removeBtn}
      >
        <Iconify icon="solar:close-circle-bold" />
      </IconButton>

      <IconButton
        disableRipple
        disableFocusRipple
        disableTouchRipple
        {...stateProps?.handleProps}
        {...stateProps?.listeners}
        size="small"
      >
        <Iconify icon="nimbus:drag-dots" />
      </IconButton>
    </ItemActions>
  );

  return (
    <ListWrap
      ref={ref}
      className={mergeClasses([itemClasses.itemWrap], {
        [itemClasses.state.sorting]: stateProps?.sorting,
        [itemClasses.state.dragging]: stateProps?.dragging,
        [itemClasses.state.dragOverlay]: stateProps?.dragOverlay,
      })}
      sx={[
        {
          ...(!!stateProps?.transition && { transition: stateProps.transition }),
          ...(!!stateProps?.transform && {
            '--translate-x': `${Math.round(stateProps.transform.x)}px`,
            '--translate-y': `${Math.round(stateProps.transform.y)}px`,
            '--scale-x': `${stateProps.transform.scaleX}`,
            '--scale-y': `${stateProps.transform.scaleY}`,
          }),
        },
      ]}
    >
      <ItemRoot
        className={mergeClasses([itemClasses.item], {
          [itemClasses.state.sorting]: stateProps?.sorting,
          [itemClasses.state.dragging]: stateProps?.dragging,
          [itemClasses.state.dragOverlay]: stateProps?.dragOverlay,
        })}
        data-cypress="draggable-item"
        sx={sx}
        {...other}
      >
        {item}
        {renderActions()}
      </ItemRoot>
    </ListWrap>
  );
});

export default memo(ItemBase);

// ----------------------------------------------------------------------

const ListWrap = styled('li')({
  flexShrink: 0,
  display: 'flex',
  transform:
    'translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1))',
  transformOrigin: '0 0',
  touchAction: 'manipulation',
  [`&.${itemClasses.state.dragOverlay}`]: { zIndex: 999 },
});

const ItemRoot = styled('div')(({ theme }) => ({
  ...theme.typography.h2,
  width: '100%',
  outline: 'none',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  transformOrigin: '50% 50%',
  touchAction: 'manipulation',
  padding: theme.spacing(5, 0),
  WebkitTapHighlightColor: 'transparent',
  borderRadius: theme.shape.borderRadius * 2,
  transition: theme.transitions.create(['box-shadow']),
  color: varAlpha(theme.vars.palette.text.disabledChannel, 0.24),
  backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
  border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
  ...theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.grey[900],
  }),
  '&:hover': {
    [`& .${itemClasses.removeBtn}`]: {
      opacity: 0.48,
    },
  },
  [`& .${itemClasses.removeBtn}`]: {
    opacity: 0,
    transition: theme.transitions.create(['opacity']),
  },
  [`&.${itemClasses.state.dragOverlay}`]: {
    backdropFilter: `blur(6px)`,
    boxShadow: theme.vars.customShadows.z20,
    color: theme.vars.palette.text.primary,
    backgroundColor: varAlpha(theme.vars.palette.common.whiteChannel, 0.48),
    ...theme.applyStyles('dark', {
      backgroundColor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
    }),
  },
  [`&.${itemClasses.state.dragging}`]: {
    opacity: 0.24,
    backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
  },
}));

const ItemActions = styled('div')({
  top: 6,
  right: 6,
  zIndex: 9,
  display: 'flex',
  position: 'absolute',
});
