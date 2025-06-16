import type { IDateValue } from 'src/types/common';
import type { RatingProps } from '@mui/material/Rating';
import type {
  GridColDef,
  GridSlotProps,
  GridFilterItem,
  GridFilterOperator,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
  GridFilterInputValueProps,
} from '@mui/x-data-grid';

import { useRef, useMemo, useState, useImperativeHandle } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { fPercent } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

// ----------------------------------------------------------------------

const baseColumns: GridColDef[] = [
  { field: 'id', headerName: 'Id', filterable: false },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 160,
    hideable: false,
    renderCell: (params) => (
      <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar alt={params.row.name} sx={{ width: 36, height: 36 }}>
          {params.row.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography component="span" variant="body2" noWrap>
          {params.row.name}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 160,
    editable: true,
    renderCell: (params) => (
      <Link color="inherit" noWrap>
        {params.row.email}
      </Link>
    ),
  },
  {
    type: 'string',
    field: 'lastLogin',
    headerName: 'Last login',
    align: 'right',
    headerAlign: 'right',
    width: 120,
    renderCell: (params) => (
      <Box
        sx={{
          gap: 0.5,
          height: 1,
          lineHeight: 1,
          display: 'flex',
          textAlign: 'right',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box component="span">{fDate(params.row.lastLogin)}</Box>

        <Box component="span" sx={{ color: 'text.secondary', typography: 'caption' }}>
          {fTime(params.row.lastLogin)}
        </Box>
      </Box>
    ),
  },
  {
    type: 'number',
    field: 'rating',
    headerName: 'Rating',
    width: 140,
    renderCell: (params) => (
      <Rating size="small" value={params.row.rating} precision={0.5} readOnly />
    ),
  },
  {
    type: 'singleSelect',
    field: 'status',
    headerName: 'Status',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    editable: true,
    valueOptions: ['online', 'always', 'busy'],
    renderCell: (params) => (
      <Label
        variant="soft"
        color={
          (params.row.status === 'busy' && 'error') ||
          (params.row.status === 'always' && 'warning') ||
          'success'
        }
      >
        {params.row.status}
      </Label>
    ),
  },
  {
    type: 'boolean',
    field: 'isAdmin',
    align: 'center',
    headerAlign: 'center',
    width: 80,
    renderCell: (params) =>
      params.row.isAdmin ? (
        <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'primary.main' }} />
      ) : (
        '-'
      ),
  },
  {
    type: 'number',
    field: 'performance',
    headerName: 'Performance',
    align: 'center',
    headerAlign: 'center',
    width: 160,
    renderCell: (params) => (
      <Box
        sx={{
          px: 1,
          gap: 1,
          width: 1,
          height: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <LinearProgress
          value={params.row.performance}
          variant="determinate"
          color={
            (params.row.performance < 30 && 'error') ||
            (params.row.performance > 30 && params.row.performance < 70 && 'warning') ||
            'primary'
          }
          sx={{ width: 1, height: 6 }}
        />
        <Typography variant="caption" sx={{ width: 80 }}>
          {fPercent(params.row.performance)}
        </Typography>
      </Box>
    ),
  },
  {
    type: 'actions',
    field: 'actions',
    headerName: 'Actions',
    align: 'right',
    headerAlign: 'right',
    width: 80,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    getActions: (params) => [
      <GridActionsCellItem
        showInMenu
        icon={<Iconify icon="solar:eye-bold" />}
        label="View"
        onClick={() => console.info('VIEW', params.row.id)}
      />,
      <GridActionsCellItem
        showInMenu
        icon={<Iconify icon="solar:pen-bold" />}
        label="Edit"
        onClick={() => console.info('EDIT', params.row.id)}
      />,
      <GridActionsCellItem
        showInMenu
        icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        label="Delete"
        onClick={() => console.info('DELETE', params.row.id)}
        sx={{ color: 'error.main' }}
      />,
    ],
  },
];

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    age: number;
    name: string;
    email: string;
    rating: number;
    status: string;
    isAdmin: boolean;
    lastName: string;
    firstName: string;
    performance: number;
    lastLogin: IDateValue;
  }[];
};

const HIDE_COLUMNS = { id: false };

const HIDE_COLUMNS_TOGGLABLE = ['id', 'actions'];

export function DataGridCustom({ data: rows }: Props) {
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  const columns = useMemo(
    () =>
      baseColumns.map((col) =>
        col.field === 'rating' ? { ...col, filterOperators: ratingOnlyOperators } : col
      ),
    []
  );

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const selected = rows.filter((row) => selectedRows.includes(row.id)).map((_row) => _row.id);

  console.info('SELECTED ROWS', selected);

  return (
    <DataGrid
      checkboxSelection
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      onRowSelectionModelChange={(newSelectionModel) => {
        setSelectedRows(newSelectionModel);
      }}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      pageSizeOptions={[5, 10, 20, 50, { value: -1, label: 'All' }]}
      slots={{
        toolbar: CustomToolbar,
        noRowsOverlay: () => <EmptyContent />,
        noResultsOverlay: () => <EmptyContent title="No results found" />,
      }}
      slotProps={{
        panel: { anchorEl: filterButtonEl },
        toolbar: { setFilterButtonEl, showQuickFilter: true },
        columnsManagement: { getTogglableColumns },
      }}
      sx={{
        [`& .${gridClasses.cell}`]: {
          alignItems: 'center',
          display: 'inline-flex',
        },
      }}
    />
  );
}

// ----------------------------------------------------------------------

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }
}

function CustomToolbar({ setFilterButtonEl }: GridSlotProps['toolbar']) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

// ----------------------------------------------------------------------

function RatingInputValue({ item, applyValue, focusElementRef }: GridFilterInputValueProps) {
  const ratingRef: React.Ref<any> = useRef(null);

  useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      ratingRef.current.querySelector(`input[value="${Number(item.value) || ''}"]`).focus();
    },
  }));

  const handleFilter: RatingProps['onChange'] = (event, newValue) => {
    applyValue({ ...item, value: newValue });
  };

  return (
    <Rating
      ref={ratingRef}
      precision={0.5}
      value={Number(item.value)}
      onChange={handleFilter}
      name="custom-rating-filter-operator"
      sx={{ ml: 2 }}
    />
  );
}

const ratingOnlyOperators: GridFilterOperator[] = [
  {
    label: 'Above',
    value: 'above',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null;
      }

      return (params): boolean => Number(params.value) >= Number(filterItem.value);
    },
    InputComponent: RatingInputValue,
    InputComponentProps: { type: 'number' },
    getValueAsString: (value: number) => `${value} Stars`,
  },
];
