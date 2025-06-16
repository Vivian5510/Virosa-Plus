import type { TreeViewBaseItem } from '@mui/x-tree-view/models';

import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { treeItemClasses, TreeItem as MuiTreeItem } from '@mui/x-tree-view/TreeItem';

// ----------------------------------------------------------------------

const TreeItem = styled(MuiTreeItem)(({ theme }) => ({
  color: theme.vars.palette.grey[800],
  ...theme.applyStyles('dark', {
    color: theme.vars.palette.grey[200],
  }),
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: { fontSize: '0.8rem', fontWeight: 500 },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.25),
    ...theme.applyStyles('dark', {
      color: theme.vars.palette.primary.contrastText,
      backgroundColor: theme.vars.palette.primary.dark,
    }),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${varAlpha(theme.vars.palette.text.primaryChannel, 0.4)}`,
  },
}));

// ----------------------------------------------------------------------

export function CustomStyling() {
  return (
    <RichTreeView
      aria-label="customized"
      defaultExpandedItems={['1']}
      sx={{ overflowX: 'hidden', minHeight: 240, width: 1 }}
      slots={{ item: TreeItem }}
      items={ITEMS}
    />
  );
}

// ----------------------------------------------------------------------

const ITEMS: TreeViewBaseItem[] = [
  {
    id: '1',
    label: 'Main',
    children: [
      { id: '2', label: 'Hello' },
      {
        id: '3',
        label: 'Subtree with children',
        children: [
          { id: '6', label: 'Hello' },
          {
            id: '7',
            label: 'Sub-subtree with children',
            children: [
              { id: '9', label: 'Child 1' },
              { id: '10', label: 'Child 2' },
              { id: '11', label: 'Child 3' },
            ],
          },
          { id: '8', label: 'Hello' },
        ],
      },
      { id: '4', label: 'World' },
      { id: '5', label: 'Something something' },
    ],
  },
];
