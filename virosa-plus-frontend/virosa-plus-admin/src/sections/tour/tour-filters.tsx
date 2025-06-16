import type { IDatePickerControl } from 'src/types/common';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { ITourGuide, ITourFilters } from 'src/types/tour';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CountrySelect } from 'src/components/country-select';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  canReset: boolean;
  dateError: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: UseSetStateReturn<ITourFilters>;
  options: {
    services: string[];
    tourGuides: ITourGuide[];
  };
};

export function TourFilters({
  open,
  onOpen,
  onClose,
  filters,
  options,
  canReset,
  dateError,
}: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleFilterServices = useCallback(
    (newValue: string) => {
      const checked = currentFilters.services.includes(newValue)
        ? currentFilters.services.filter((value) => value !== newValue)
        : [...currentFilters.services, newValue];

      updateFilters({ services: checked });
    },
    [updateFilters, currentFilters.services]
  );

  const handleFilterStartDate = useCallback(
    (newValue: IDatePickerControl) => {
      updateFilters({ startDate: newValue });
    },
    [updateFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue: IDatePickerControl) => {
      updateFilters({ endDate: newValue });
    },
    [updateFilters]
  );

  const handleFilterDestination = useCallback(
    (newValue: string[]) => {
      updateFilters({ destination: newValue });
    },
    [updateFilters]
  );

  const handleFilterTourGuide = useCallback(
    (newValue: ITourGuide[]) => {
      updateFilters({ tourGuides: newValue });
    },
    [updateFilters]
  );

  const renderHead = () => (
    <>
      <Box
        sx={{
          py: 2,
          pr: 1,
          pl: 2.5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filters
        </Typography>

        <Tooltip title="Reset">
          <IconButton onClick={() => resetFilters()}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>
        </Tooltip>

        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </>
  );

  const renderDateRange = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Durations
      </Typography>

      <DatePicker
        label="Start date"
        value={currentFilters.startDate}
        onChange={handleFilterStartDate}
        sx={{ mb: 2.5 }}
      />

      <DatePicker
        label="End date"
        value={currentFilters.endDate}
        onChange={handleFilterEndDate}
        slotProps={{
          textField: {
            error: dateError,
            helperText: dateError ? 'End date must be later than start date' : null,
          },
        }}
      />
    </Box>
  );

  const renderDestination = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Destination
      </Typography>

      <CountrySelect
        id="multiple-destinations"
        multiple
        fullWidth
        placeholder={currentFilters.destination.length ? '+ Destination' : 'Select Destination'}
        value={currentFilters.destination}
        onChange={(event, newValue) => handleFilterDestination(newValue)}
      />
    </Box>
  );

  const renderTourGuide = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Tour guide
      </Typography>

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={options.tourGuides}
        value={currentFilters.tourGuides}
        onChange={(event, newValue) => handleFilterTourGuide(newValue)}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField placeholder="Select Tour Guides" {...params} />}
        renderOption={(props, tourGuide) => (
          <li {...props} key={tourGuide.id}>
            <Avatar
              key={tourGuide.id}
              alt={tourGuide.avatarUrl}
              src={tourGuide.avatarUrl}
              sx={{
                mr: 1,
                width: 24,
                height: 24,
                flexShrink: 0,
              }}
            />

            {tourGuide.name}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((tourGuide, index) => (
            <Chip
              {...getTagProps({ index })}
              key={tourGuide.id}
              size="small"
              variant="soft"
              label={tourGuide.name}
              avatar={<Avatar alt={tourGuide.name} src={tourGuide.avatarUrl} />}
            />
          ))
        }
      />
    </Box>
  );

  const renderServices = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Services
      </Typography>
      {options.services.map((option) => (
        <FormControlLabel
          key={option}
          label={option}
          control={
            <Checkbox
              checked={currentFilters.services.includes(option)}
              onClick={() => handleFilterServices(option)}
              inputProps={{
                id: `${option}-checkbox`,
              }}
            />
          }
        />
      ))}
    </Box>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        {renderHead()}

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderDateRange()}
            {renderDestination()}
            {renderTourGuide()}
            {renderServices()}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
