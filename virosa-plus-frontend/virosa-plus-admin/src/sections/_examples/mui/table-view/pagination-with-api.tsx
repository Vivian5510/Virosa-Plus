import type { BoxProps } from '@mui/material/Box';
import type { TableHeadCellProps } from 'src/components/table';

import useSWR from 'swr';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';

import { fetcher } from 'src/lib/axios';

import { Iconify } from 'src/components/iconify';
import { TableSkeleton, TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

type Product = {
  id: string;
  name: string;
  category: string;
};

export type ApiResponse = {
  products: Product[];
  totalPages: number;
  totalItems: number;
  categoryOptions: string[];
};

export const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'id', label: 'Id', width: 140 },
  { id: 'name', label: 'Name', width: 240 },
  { id: 'category', label: 'Category' },
  { id: '', label: 'Action', align: 'right', width: 80 },
];

// ----------------------------------------------------------------------

export function PaginationWithApi() {
  const [page, setPage] = useState<number>(1);

  const perPage = 5;

  const endpoint = `/api/pagination?page=${page}&perPage=${perPage}`;
  const { data, isLoading } = useSWR<ApiResponse>(endpoint, fetcher, {
    keepPreviousData: true,
  });

  return (
    <>
      <DataInfo
        endpoint={endpoint}
        totalItems={data?.totalItems ?? 0}
        totalPages={data?.totalPages ?? 0}
      />

      <Table>
        <TableHeadCustom headCells={TABLE_HEAD} />

        <TableBody>
          {isLoading ? (
            <TableSkeleton rowCount={perPage} cellCount={TABLE_HEAD.length} sx={{ height: 69 }} />
          ) : (
            data?.products.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Divider />

      <Pagination
        color="primary"
        page={page}
        count={data?.totalPages}
        onChange={(event, newPage) => setPage(newPage)}
        sx={{
          py: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type DataInfoProps = BoxProps & {
  endpoint: string;
  totalItems: number;
  totalPages: number;
};

export function DataInfo({ endpoint, totalItems, totalPages, sx, ...other }: DataInfoProps) {
  return (
    <Box
      sx={[
        () => ({
          p: 3,
          gap: 1,
          display: 'flex',
          typography: 'body2',
          '& span': { display: 'flex' },
          '& strong': { fontWeight: 'fontWeightSemiBold' },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <strong>endpoint:</strong>
        <Box component="span" sx={{ color: 'primary.main' }}>
          {endpoint}
        </Box>
      </Box>

      <span>
        <strong>Items: </strong> {totalItems}
      </span>
      <span>
        <strong>Pages: </strong> {totalPages}
      </span>
    </Box>
  );
}
