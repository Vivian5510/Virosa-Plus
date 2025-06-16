import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

export const itemClasses = {
  item: createClasses('dnd__item'),
  itemWrap: createClasses('dnd__item__wrap'),
  removeBtn: createClasses('dnd__remove__btn'),
  state: {
    sorting: '--sorting',
    dragging: '--dragging',
    dragOverlay: '--drag-overlay',
  },
};
