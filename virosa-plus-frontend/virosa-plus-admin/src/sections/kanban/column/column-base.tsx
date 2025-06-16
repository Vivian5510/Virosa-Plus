import type { CSSObject } from '@mui/material/styles';

import { memo, forwardRef } from 'react';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { kanbanClasses } from '../classes';

// ----------------------------------------------------------------------

type ColumnBaseProps = React.ComponentProps<typeof ColumnBaseRoot> & {
  slots?: {
    header?: React.ReactNode;
    main?: React.ReactNode;
    action?: React.ReactNode;
  };
  stateProps?: {
    overContainer?: boolean;
    dragOverlay?: boolean;
    dragging?: boolean;
    handleProps?: any;
  };
};

const ColumnBase = forwardRef<HTMLDivElement, ColumnBaseProps>((props, ref) => {
  const { slots, stateProps, sx, ...other } = props;

  return (
    <ColumnBaseRoot
      ref={ref}
      className={mergeClasses([kanbanClasses.column], {
        [kanbanClasses.state.dragging]: stateProps?.dragging,
        [kanbanClasses.state.dragOverlay]: stateProps?.dragOverlay,
        [kanbanClasses.state.overContainer]: stateProps?.overContainer,
      })}
      sx={sx}
      {...other}
    >
      {slots?.header && slots.header}

      {slots?.action && slots?.action}

      {slots?.main && (
        <ColumnBaseList className={kanbanClasses.columnList}>{slots.main}</ColumnBaseList>
      )}
    </ColumnBaseRoot>
  );
});

export default memo(ColumnBase);

// ----------------------------------------------------------------------

const ColumnBaseRoot = styled('div')(({ theme }) => {
  const backgroundStyles: Record<'default' | 'over', CSSObject> = {
    default: {
      top: 0,
      left: 0,
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      borderRadius: 'inherit',
      backgroundColor: 'transparent',
      transition: theme.transitions.create(['background-color']),
    },
    over: {
      backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
      ...theme.applyStyles('dark', {
        backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
      }),
    },
  };

  return {
    flexShrink: 0,
    borderWidth: 1,
    height: '100%',
    display: 'flex',
    position: 'relative',
    borderStyle: 'solid',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
    borderColor: 'transparent',
    width: 'var(--column-width)',
    padding: 'var(--column-padding)',
    borderRadius: 'var(--column-radius)',
    backgroundColor: theme.vars.palette.background.neutral,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.vars.palette.grey[800],
    }),
    '&::before': backgroundStyles.default,
    // When move card to this column
    [`&.${kanbanClasses.state.overContainer}`]: {
      '&::before': backgroundStyles.over,
    },
    // When move column overlay
    [`&.${kanbanClasses.state.dragOverlay}`]: {
      backdropFilter: `blur(6px)`,
      borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
      backgroundColor: varAlpha(theme.vars.palette.background.neutralChannel, 0.48),
      ...theme.applyStyles('dark', {
        backgroundColor: varAlpha(theme.vars.palette.grey['800Channel'], 0.48),
      }),
    },
    // Placeholder when dragging column
    [`&.${kanbanClasses.state.dragging}`]: {
      opacity: 0,
    },
  };
});

const ColumnBaseList = styled('ul')(() => ({
  minHeight: 80,
  display: 'flex',
  gap: 'var(--item-gap)',
  flexDirection: 'column',
}));
