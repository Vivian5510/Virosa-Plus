import type { TableHeadCellProps } from 'src/components/table';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

// ----------------------------------------------------------------------

type RowData = {
  name: string;
  calories: number;
  fat: number;
  nested: {
    protein: number;
  };
};

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'name', label: 'Dessert (100g serving)', align: 'left' },
  { id: 'calories', label: 'Calories', align: 'center' },
  { id: 'fat', label: 'Fat (g)', align: 'center' },
  { id: 'nested.protein', label: 'Protein (g)', align: 'center' },
];

const TABLE_DATA: RowData[] = [
  { name: 'Cupcake', calories: 305, fat: 3.7, nested: { protein: 4.3 } },
  { name: 'Donut', calories: 452, fat: 25, nested: { protein: 4.9 } },
  { name: 'Eclair', calories: 262, fat: 16, nested: { protein: 6 } },
  { name: 'Frozen yoghurt', calories: 159, fat: 6, nested: { protein: 4 } },
  { name: 'Gingerbread', calories: 356, fat: 16, nested: { protein: 3.9 } },
  { name: 'Honeycomb', calories: 408, fat: 3.2, nested: { protein: 6.5 } },
  { name: 'Ice cream sandwich', calories: 237, fat: 9, nested: { protein: 4.3 } },
  { name: 'Jelly Bean', calories: 375, fat: 0, nested: { protein: 0 } },
  { name: 'KitKat', calories: 518, fat: 26, nested: { protein: 7 } },
  { name: 'Lollipop', calories: 392, fat: 0.2, nested: { protein: 0 } },
  { name: 'Marshmallow', calories: 318, fat: 0, nested: { protein: 2 } },
  { name: 'Nougat', calories: 360, fat: 19, nested: { protein: 37 } },
];

// ----------------------------------------------------------------------

export function SortingSelectingTable() {
  const table = useTable({ defaultOrderBy: 'nested.protein' });

  const [tableData, setTableData] = useState<RowData[]>([]);

  useEffect(() => {
    setTableData(TABLE_DATA);
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
  });

  return (
    <>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Title
        </Typography>

        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={tableData.length}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              tableData.map((row) => row.name)
            )
          }
          action={
            <Tooltip title="Delete">
              <IconButton color="primary">
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
        />

        <Scrollbar sx={{ minHeight: 332 }}>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headCells={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.name)
                )
              }
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <TableRow
                    hover
                    key={row.name}
                    onClick={() => table.onSelectRow(row.name)}
                    selected={table.selected.includes(row.name)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={table.selected.includes(row.name)}
                        inputProps={{
                          id: `${row.name}-checkbox`,
                          'aria-label': `${row.name} checkbox`,
                        }}
                      />
                    </TableCell>
                    <TableCell> {row.name} </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.nested.protein}</TableCell>
                  </TableRow>
                ))}

              <TableEmptyRows
                height={table.dense ? 34 : 34 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>

      <TablePaginationCustom
        page={table.page}
        dense={table.dense}
        count={dataFiltered.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: RowData[];
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
