import type { Theme, SxProps } from '@mui/material/styles';

import { BasicTable } from './basic';
import { CollapsibleTable } from './collapsible';
import { PaginationWithApi } from './pagination-with-api';
import { SortingSelectingTable } from './sorting-selecting';
import { ComponentBox, ComponentLayout } from '../../layout';
import { GroupingFixedHeaderTable } from './grouping-fixed-header';
import { TablePaginationWithApi } from './table-pagination-with-api';

// ----------------------------------------------------------------------

const componentBoxStyles: SxProps<Theme> = {
  p: 0,
  overflow: 'hidden',
  alignItems: 'unset',
  flexDirection: 'column',
  bgcolor: 'background.paper',
};

const DEMO_COMPONENTS = [
  {
    name: 'Basic Table',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <BasicTable />
      </ComponentBox>
    ),
  },
  {
    name: 'Sorting & selecting',
    component: (
      <ComponentBox sx={{ ...componentBoxStyles, gap: 0 }}>
        <SortingSelectingTable />
      </ComponentBox>
    ),
  },
  {
    name: 'Grouping & fixed header',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <GroupingFixedHeaderTable />
      </ComponentBox>
    ),
  },
  {
    name: 'Collapsible table',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <CollapsibleTable />
      </ComponentBox>
    ),
  },
  {
    name: 'Pagination with API',
    component: (
      <ComponentBox sx={{ ...componentBoxStyles, gap: 0 }}>
        <PaginationWithApi />
      </ComponentBox>
    ),
  },
  {
    name: 'Table pagination with API',
    component: (
      <ComponentBox sx={{ ...componentBoxStyles, gap: 0 }}>
        <TablePaginationWithApi />
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function TableView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Table',
        moreLinks: ['https://mui.com/material-ui/react-table/'],
      }}
    />
  );
}
