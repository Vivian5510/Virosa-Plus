import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filters: {
    name: string;
    parentId: string | number | null;
    type: string;
  };
  onFilters: (name: string, value: string | number | null) => void;
};

export default function DirectoryTableFilters({ filters, onFilters }: Props) {
  const openFilter = useBoolean();

  const handleFilterType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('type', event.target.value);
    },
    [onFilters]
  );

  const handleFilterParentId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value ? Number(event.target.value) : null;
      onFilters('parentId', value);
    },
    [onFilters]
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={openFilter.onTrue}
      >
        高级筛选
      </Button>

      <Drawer
        anchor="right"
        open={openFilter.value}
        onClose={openFilter.onFalse}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
          <Typography variant="h6">筛选</Typography>

          <IconButton onClick={openFilter.onFalse}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Stack spacing={3} sx={{ p: 2.5 }}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">节点类型</Typography>
            <RadioGroup value={filters.type} onChange={handleFilterType}>
              <FormControlLabel value="all" control={<Radio />} label="全部" />
              <FormControlLabel value="directory" control={<Radio />} label="目录" />
              <FormControlLabel value="file" control={<Radio />} label="文件" />
            </RadioGroup>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2">父目录ID</Typography>
            <TextField
              fullWidth
              value={filters.parentId || ''}
              onChange={handleFilterParentId}
              placeholder="输入父目录ID"
            />
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
