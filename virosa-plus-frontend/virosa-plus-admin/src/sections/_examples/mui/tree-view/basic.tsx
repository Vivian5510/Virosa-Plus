import type { TreeViewBaseItem } from '@mui/x-tree-view/models';

import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

// ----------------------------------------------------------------------

const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
  {
    id: 'grid',
    label: 'Data Grid',
    children: [
      { id: 'grid-community', label: '@mui/x-data-grid' },
      { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
      { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
    ],
  },
  {
    id: 'pickers',
    label: 'Date and Time Pickers',
    children: [
      { id: 'pickers-community', label: '@mui/x-date-pickers' },
      { id: 'pickers-pro', label: '@mui/x-date-pickers-pro' },
    ],
  },
];

export function BasicRichTree() {
  return (
    <RichTreeView items={MUI_X_PRODUCTS} sx={{ overflowX: 'hidden', minHeight: 240, width: 1 }} />
  );
}

export function BasicSimpleTree() {
  return (
    <SimpleTreeView sx={{ overflowX: 'hidden', minHeight: 240, width: 1 }}>
      <TreeItem itemId="grid" label="Data Grid">
        <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
        <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
        <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
      </TreeItem>
      <TreeItem itemId="pickers" label="Date and Time Pickers">
        <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
        <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
      </TreeItem>
    </SimpleTreeView>
  );
}
