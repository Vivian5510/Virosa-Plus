import type { SelectChangeEvent } from '@mui/material/Select';

import { useState, useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// ----------------------------------------------------------------------

const ITEMS = Array.from({ length: 100 }, (_, index) => index + 1);

export function PaginationItems() {
  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState<number>(12);

  const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  }, []);

  return (
    <Stack spacing={8} sx={{ width: 1, alignItems: 'center' }}>
      <Box
        sx={{
          gap: 2,
          width: 1,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        }}
      >
        {ITEMS.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map(
          (item) => (
            <Card
              key={item}
              sx={[
                (theme) => ({
                  py: 3,
                  typography: 'h3',
                  borderRadius: 1.5,
                  textAlign: 'center',
                  color: varAlpha(theme.vars.palette.text.disabledChannel, 0.48),
                }),
              ]}
            >
              {item}
            </Card>
          )
        )}
      </Box>

      <Box
        sx={{
          width: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pagination
          page={page}
          shape="circular"
          count={Math.ceil(ITEMS.length / rowsPerPage)}
          onChange={handleChangePage}
        />

        <FormControl size="small" sx={{ width: 120 }}>
          <InputLabel htmlFor="demo-pagination-select">Items per page</InputLabel>
          <Select
            value={String(rowsPerPage)}
            label="Item per page"
            onChange={handleChangeRowsPerPage}
            inputProps={{ id: 'demo-pagination-select' }}
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}
