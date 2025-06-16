import type { IFileFilters } from 'src/types/file';
import type { IDatePickerControl } from 'src/types/common';
import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardActionArea from '@mui/material/CardActionArea';
import InputAdornment from '@mui/material/InputAdornment';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { CustomPopover } from 'src/components/custom-popover';
import { CustomDateRangePicker } from 'src/components/custom-date-range-picker';

// ----------------------------------------------------------------------

type Props = {
  dateError: boolean;
  openDateRange: boolean;
  onResetPage: () => void;
  onOpenDateRange: () => void;
  onCloseDateRange: () => void;
  filters: UseSetStateReturn<IFileFilters>;
  options: {
    types: string[];
  };
};

export function FileManagerFilters({
  filters,
  options,
  dateError,
  onResetPage,
  openDateRange,
  onOpenDateRange,
  onCloseDateRange,
}: Props) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const displayLabel = currentFilters.type.length
    ? currentFilters.type.slice(0, 2).join(',')
    : 'All type';

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ name: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue: IDatePickerControl) => {
      onResetPage();
      updateFilters({ startDate: newValue });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue: IDatePickerControl) => {
      updateFilters({ endDate: newValue });
    },
    [updateFilters]
  );

  const handleFilterType = useCallback(
    (newValue: string) => {
      const checked = currentFilters.type.includes(newValue)
        ? currentFilters.type.filter((value) => value !== newValue)
        : [...currentFilters.type, newValue];

      updateFilters({ type: checked });
    },
    [updateFilters, currentFilters.type]
  );

  const handleResetType = useCallback(() => {
    menuActions.onClose();
    updateFilters({ type: [] });
  }, [menuActions, updateFilters]);

  const renderFilterName = () => (
    <TextField
      value={currentFilters.name}
      onChange={handleFilterName}
      placeholder="Search..."
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{ width: { xs: 1, md: 260 } }}
    />
  );

  const renderFilterType = () => (
    <>
      <Button
        color="inherit"
        onClick={menuActions.onOpen}
        endIcon={
          <Iconify
            icon={menuActions.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            sx={{ ml: -0.5 }}
          />
        }
      >
        {displayLabel}
        {currentFilters.type.length > 2 && (
          <Label color="info" sx={{ ml: 1 }}>
            +{currentFilters.type.length - 2}
          </Label>
        )}
      </Button>

      <CustomPopover
        open={menuActions.open}
        anchorEl={menuActions.anchorEl}
        onClose={menuActions.onClose}
        slotProps={{ paper: { sx: { p: 2.5 } } }}
      >
        <Stack spacing={2.5}>
          <Box
            sx={{
              gap: 1,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            }}
          >
            {options.types.map((type) => {
              const selected = currentFilters.type.includes(type);

              return (
                <CardActionArea
                  key={type}
                  onClick={() => handleFilterType(type)}
                  sx={[
                    (theme) => ({
                      p: 1,
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                      ...(selected && { bgcolor: 'action.selected' }),
                    }),
                  ]}
                >
                  <Box
                    sx={{
                      gap: 1,
                      display: 'flex',
                      alignItems: 'center',
                      typography: 'caption',
                      textTransform: 'capitalize',
                      ...(selected && { fontWeight: 'fontWeightSemiBold' }),
                    }}
                  >
                    <FileThumbnail file={type} sx={{ width: 24, height: 24 }} />
                    {type}
                  </Box>
                </CardActionArea>
              );
            })}
          </Box>

          <Box
            sx={{
              gap: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="outlined" color="inherit" onClick={handleResetType}>
              Clear
            </Button>

            <Button variant="contained" onClick={menuActions.onClose}>
              Apply
            </Button>
          </Box>
        </Stack>
      </CustomPopover>
    </>
  );

  const renderFilterDate = () => (
    <>
      <Button
        color="inherit"
        onClick={onOpenDateRange}
        endIcon={
          <Iconify
            icon={openDateRange ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            sx={{ ml: -0.5 }}
          />
        }
      >
        {!!currentFilters.startDate && !!currentFilters.endDate
          ? fDateRangeShortLabel(currentFilters.startDate, currentFilters.endDate)
          : 'Select date'}
      </Button>

      <CustomDateRangePicker
        variant="calendar"
        startDate={currentFilters.startDate}
        endDate={currentFilters.endDate}
        onChangeStartDate={handleFilterStartDate}
        onChangeEndDate={handleFilterEndDate}
        open={openDateRange}
        onClose={onCloseDateRange}
        selected={!!currentFilters.startDate && !!currentFilters.endDate}
        error={dateError}
      />
    </>
  );

  return (
    <Box
      sx={{
        gap: 1,
        width: 1,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-end', md: 'center' },
      }}
    >
      {renderFilterName()}

      <Box
        sx={{
          gap: 1,
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {renderFilterDate()}
        {renderFilterType()}
      </Box>
    </Box>
  );
}
