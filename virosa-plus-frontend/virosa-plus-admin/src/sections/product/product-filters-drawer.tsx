import type { IProductFilters } from 'src/types/product';
import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { inputBaseClasses } from '@mui/material/InputBase';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ColorPicker } from 'src/components/color-utils';
import { NumberInput } from 'src/components/number-input';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  canReset: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: UseSetStateReturn<IProductFilters>;
  options: {
    colors: string[];
    ratings: string[];
    categories: string[];
    genders: { value: string; label: string }[];
  };
};

const MAX_AMOUNT = 200;

const marksLabel = Array.from({ length: 21 }, (_, index) => {
  const value = index * 10;
  const firstValue = index === 0 ? `$${value}` : `${value}`;

  return {
    value,
    label: index % 4 ? '' : firstValue,
  };
});

export function ProductFiltersDrawer({ open, onOpen, onClose, canReset, filters, options }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleFilterGender = useCallback(
    (newValue: string) => {
      const checked = currentFilters.gender.includes(newValue)
        ? currentFilters.gender.filter((value) => value !== newValue)
        : [...currentFilters.gender, newValue];

      updateFilters({ gender: checked });
    },
    [updateFilters, currentFilters.gender]
  );

  const handleFilterCategory = useCallback(
    (newValue: string) => {
      updateFilters({ category: newValue });
    },
    [updateFilters]
  );

  const handleFilterColors = useCallback(
    (newValue: string[]) => {
      updateFilters({ colors: newValue });
    },
    [updateFilters]
  );

  const handleFilterPriceRange = useCallback(
    (event: Event, newValue: number | number[]) => {
      updateFilters({ priceRange: newValue as number[] });
    },
    [updateFilters]
  );

  const handleFilterRating = useCallback(
    (newValue: string) => {
      updateFilters({ rating: newValue });
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

  const renderGender = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Gender
      </Typography>
      {options.genders.map((option) => (
        <FormControlLabel
          key={option.value}
          label={option.label}
          control={
            <Checkbox
              checked={currentFilters.gender.includes(option.label)}
              onClick={() => handleFilterGender(option.label)}
              inputProps={{ id: `${option.value}-checkbox` }}
            />
          }
        />
      ))}
    </Box>
  );

  const renderCategory = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Category
      </Typography>
      {options.categories.map((option) => (
        <FormControlLabel
          key={option}
          label={option}
          control={
            <Radio
              checked={option === currentFilters.category}
              onClick={() => handleFilterCategory(option)}
              inputProps={{ id: `${option}-radio` }}
            />
          }
          sx={{ ...(option === 'all' && { textTransform: 'capitalize' }) }}
        />
      ))}
    </Box>
  );

  const renderColor = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Color
      </Typography>

      <ColorPicker
        options={options.colors}
        value={currentFilters.colors}
        onChange={(colors) => handleFilterColors(colors as string[])}
        limit={6}
      />
    </Box>
  );

  const renderPrice = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2">Price</Typography>

      <Box sx={{ my: 2, gap: 5, display: 'flex' }}>
        <InputRange type="min" value={currentFilters.priceRange} onChange={updateFilters} />
        <InputRange type="max" value={currentFilters.priceRange} onChange={updateFilters} />
      </Box>

      <Slider
        value={currentFilters.priceRange}
        onChange={handleFilterPriceRange}
        step={10}
        min={0}
        max={MAX_AMOUNT}
        marks={marksLabel}
        getAriaValueText={(value) => `$${value}`}
        valueLabelFormat={(value) => `$${value}`}
        sx={{ alignSelf: 'center', width: `calc(100% - 24px)` }}
      />
    </Box>
  );

  const renderRating = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Rating
      </Typography>

      {options.ratings.map((item, index) => (
        <Box
          key={item}
          onClick={() => handleFilterRating(item)}
          sx={{
            mb: 1,
            gap: 1,
            ml: -1,
            p: 0.5,
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            typography: 'body2',
            alignItems: 'center',
            '&:hover': { opacity: 0.48 },
            ...(currentFilters.rating === item && { bgcolor: 'action.selected' }),
          }}
        >
          <Rating readOnly value={4 - index} /> & Up
        </Box>
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
            {renderGender()}
            {renderCategory()}
            {renderColor()}
            {renderPrice()}
            {renderRating()}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

type InputRangeProps = {
  value: number[];
  type: 'min' | 'max';
  onChange: UseSetStateReturn<IProductFilters>['setState'];
};

function InputRange({ type, value, onChange: onFilters }: InputRangeProps) {
  const minValue = value[0];
  const maxValue = value[1];

  const handleBlur = useCallback(() => {
    const newMin = Math.max(0, Math.min(minValue, MAX_AMOUNT));
    const newMax = Math.max(0, Math.min(maxValue, MAX_AMOUNT));

    if (newMin !== minValue || newMax !== maxValue) {
      onFilters({ priceRange: [newMin, newMax] });
    }
  }, [minValue, maxValue, onFilters]);

  return (
    <Box sx={{ width: 1, display: 'flex', alignItems: 'center' }}>
      <Typography
        variant="caption"
        sx={{
          flexGrow: 1,
          color: 'text.disabled',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightSemiBold',
        }}
      >
        {`${type} ($)`}
      </Typography>

      <NumberInput
        hideButtons
        max={MAX_AMOUNT}
        value={type === 'min' ? minValue : maxValue}
        onChange={(event, newValue) =>
          onFilters({ priceRange: type === 'min' ? [newValue, maxValue] : [minValue, newValue] })
        }
        onBlur={handleBlur}
        sx={{ maxWidth: 64 }}
        slotProps={{
          input: {
            sx: {
              [`& .${inputBaseClasses.input}`]: {
                pr: 1,
                textAlign: 'right',
              },
            },
          },
        }}
      />
    </Box>
  );
}
