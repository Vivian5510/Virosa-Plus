import type { Theme, SxProps } from '@mui/material/styles';

import { useState, useCallback } from 'react';

import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';

import { PaginationItems } from './pagination-items';
import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['standard', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const SIZES = ['small', 'medium', 'large'] as const;

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
};

// ----------------------------------------------------------------------

export function PaginationView() {
  const [page, setPage] = useState(2);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const DEMO_COMPONENTS = [
    {
      name: 'Circular',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          <Pagination shape="circular" count={10} variant="text" />
          <Pagination shape="circular" count={10} variant="text" disabled />
          <Pagination shape="circular" count={10} variant="outlined" />
          <Pagination shape="circular" count={10} variant="outlined" disabled />
          <Pagination shape="circular" count={10} variant="soft" />
          <Pagination shape="circular" count={10} variant="soft" disabled />
        </ComponentBox>
      ),
    },
    {
      name: 'Rounded',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          <Pagination shape="rounded" count={10} variant="text" />
          <Pagination shape="rounded" count={10} variant="text" disabled />
          <Pagination shape="rounded" count={10} variant="outlined" />
          <Pagination shape="rounded" count={10} variant="outlined" disabled />
          <Pagination shape="rounded" count={10} variant="soft" />
          <Pagination shape="rounded" count={10} variant="soft" disabled />
        </ComponentBox>
      ),
    },
    {
      name: 'Colors',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          {COLORS.map((color) => (
            <Pagination key={color} color={color} count={10} variant="text" />
          ))}

          {COLORS.map((color) => (
            <Pagination key={color} color={color} count={10} variant="outlined" />
          ))}

          {COLORS.map((color) => (
            <Pagination key={color} color={color} count={10} variant="soft" />
          ))}
        </ComponentBox>
      ),
    },
    {
      name: 'Sizes',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          {SIZES.map((size) => (
            <Pagination count={10} key={size} size={size} />
          ))}
        </ComponentBox>
      ),
    },
    {
      name: 'Buttons',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          <Pagination count={10} showFirstButton showLastButton />
          <Pagination count={10} hidePrevButton hideNextButton />
        </ComponentBox>
      ),
    },
    {
      name: 'Ranges',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          <Pagination count={11} defaultPage={6} siblingCount={0} />
          <Pagination count={11} defaultPage={6} />
          <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
          <Pagination count={11} defaultPage={6} boundaryCount={2} />
        </ComponentBox>
      ),
    },
    {
      name: 'Table',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Items',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          <PaginationItems />
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Pagination',
        moreLinks: ['https://mui.com/material-ui/react-pagination/'],
      }}
    />
  );
}
