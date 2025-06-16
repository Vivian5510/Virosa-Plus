import type { IProductTableFilters } from 'src/types/product';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useState, useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { usePopover } from 'minimal-shared/hooks';

import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  filters: UseSetStateReturn<IProductTableFilters>;
  options: {
    stocks: { value: string; label: string }[];
    publishs: { value: string; label: string }[];
  };
};

export function ProductTableToolbar({ filters, options }: Props) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const [stock, setStock] = useState(currentFilters.stock);
  const [publish, setPublish] = useState(currentFilters.publish);

  const handleChangeStock = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setStock(typeof value === 'string' ? value.split(',') : value);
  }, []);

  const handleChangePublish = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setPublish(typeof value === 'string' ? value.split(',') : value);
  }, []);

  const handleFilterStock = useCallback(() => {
    updateFilters({ stock });
  }, [updateFilters, stock]);

  const handleFilterPublish = useCallback(() => {
    updateFilters({ publish });
  }, [publish, updateFilters]);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="filter-stock-select">Stock</InputLabel>

        <Select
          multiple
          value={stock}
          onChange={handleChangeStock}
          onClose={handleFilterStock}
          input={<OutlinedInput label="Stock" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          inputProps={{ id: 'filter-stock-select' }}
          sx={{ textTransform: 'capitalize' }}
        >
          {options.stocks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox disableRipple size="small" checked={stock.includes(option.value)} />
              {option.label}
            </MenuItem>
          ))}
          <MenuItem
            onClick={handleFilterStock}
            sx={[
              (theme) => ({
                justifyContent: 'center',
                fontWeight: theme.typography.button,
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
              }),
            ]}
          >
            Apply
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="filter-publish-select">Publish</InputLabel>
        <Select
          multiple
          value={publish}
          onChange={handleChangePublish}
          onClose={handleFilterPublish}
          input={<OutlinedInput label="Publish" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          inputProps={{ id: 'filter-publish-select' }}
          sx={{ textTransform: 'capitalize' }}
        >
          {options.publishs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox disableRipple size="small" checked={publish.includes(option.value)} />
              {option.label}
            </MenuItem>
          ))}

          <MenuItem
            disableGutters
            disableTouchRipple
            onClick={handleFilterPublish}
            sx={[
              (theme) => ({
                justifyContent: 'center',
                fontWeight: theme.typography.button,
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
              }),
            ]}
          >
            Apply
          </MenuItem>
        </Select>
      </FormControl>

      {renderMenuActions()}
    </>
  );
}
