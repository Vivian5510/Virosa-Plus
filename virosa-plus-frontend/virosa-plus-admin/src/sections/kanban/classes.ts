import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

export const kanbanClasses = {
  item: createClasses('kanban__item'),
  column: createClasses('kanban__column'),
  itemWrap: createClasses('kanban__item__wrap'),
  columnList: createClasses('kanban__column_list'),
  state: {
    fadeIn: '--fade-in',
    sorting: '--sorting',
    dragging: '--dragging',
    disabled: '--disabled',
    dragOverlay: '--drag-overlay',
    overContainer: '--over-container',
  },
};
