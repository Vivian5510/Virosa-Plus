import type { IJobFilters } from 'src/types/job';
import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CountrySelect } from 'src/components/country-select';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  canReset: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: UseSetStateReturn<IJobFilters>;
  options: {
    roles: string[];
    benefits: string[];
    experiences: string[];
    employmentTypes: string[];
  };
};

export function JobFilters({ open, canReset, onOpen, onClose, filters, options }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleFilterEmploymentTypes = useCallback(
    (newValue: string) => {
      const checked = currentFilters.employmentTypes.includes(newValue)
        ? currentFilters.employmentTypes.filter((value) => value !== newValue)
        : [...currentFilters.employmentTypes, newValue];

      updateFilters({ employmentTypes: checked });
    },
    [updateFilters, currentFilters.employmentTypes]
  );

  const handleFilterExperience = useCallback(
    (newValue: string) => {
      updateFilters({ experience: newValue });
    },
    [updateFilters]
  );

  const handleFilterRoles = useCallback(
    (newValue: string[]) => {
      updateFilters({ roles: newValue });
    },
    [updateFilters]
  );

  const handleFilterLocations = useCallback(
    (newValue: string[]) => {
      updateFilters({ locations: newValue });
    },
    [updateFilters]
  );

  const handleFilterBenefits = useCallback(
    (newValue: string) => {
      const checked = currentFilters.benefits.includes(newValue)
        ? currentFilters.benefits.filter((value) => value !== newValue)
        : [...currentFilters.benefits, newValue];

      updateFilters({ benefits: checked });
    },
    [updateFilters, currentFilters.benefits]
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

  const renderEmploymentTypes = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Employment types
      </Typography>
      {options.employmentTypes.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={currentFilters.employmentTypes.includes(option)}
              onClick={() => handleFilterEmploymentTypes(option)}
            />
          }
          label={option}
        />
      ))}
    </Box>
  );

  const renderExperience = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Experience
      </Typography>
      {options.experiences.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Radio
              checked={option === currentFilters.experience}
              onClick={() => handleFilterExperience(option)}
            />
          }
          label={option}
          sx={{ ...(option === 'all' && { textTransform: 'capitalize' }) }}
        />
      ))}
    </Box>
  );

  const renderRoles = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Roles
      </Typography>
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={options.roles.map((option) => option)}
        getOptionLabel={(option) => option}
        value={currentFilters.roles}
        onChange={(event, newValue) => handleFilterRoles(newValue)}
        renderInput={(params) => <TextField placeholder="Select Roles" {...params} />}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {option}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option}
              label={option}
              size="small"
              variant="soft"
            />
          ))
        }
      />
    </Box>
  );

  const renderLocations = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Locations
      </Typography>

      <CountrySelect
        id="multiple-locations"
        multiple
        fullWidth
        placeholder={currentFilters.locations.length ? '+ Locations' : 'Select Locations'}
        value={currentFilters.locations}
        onChange={(event, newValue) => handleFilterLocations(newValue)}
      />
    </Box>
  );

  const renderBenefits = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Benefits
      </Typography>
      {options.benefits.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={currentFilters.benefits.includes(option)}
              onClick={() => handleFilterBenefits(option)}
            />
          }
          label={option}
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
            {renderEmploymentTypes()}
            {renderExperience()}
            {renderRoles()}
            {renderLocations()}
            {renderBenefits()}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
