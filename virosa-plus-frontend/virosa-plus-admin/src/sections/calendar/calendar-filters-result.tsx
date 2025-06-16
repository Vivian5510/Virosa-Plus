import type { ICalendarFilters } from 'src/types/calendar';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  filters: UseSetStateReturn<ICalendarFilters>;
};

export function CalendarFiltersResult({ filters, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveColor = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.colors.filter((item) => item !== inputValue);

      updateFilters({ colors: newValue });
    },
    [updateFilters, currentFilters.colors]
  );

  const handleRemoveDate = useCallback(() => {
    updateFilters({ startDate: null, endDate: null });
  }, [updateFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={() => resetFilters()} sx={sx}>
      <FiltersBlock label="Colors:" isShow={!!currentFilters.colors.length}>
        {currentFilters.colors.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={
              <Box
                sx={[
                  (theme) => ({
                    ml: -0.5,
                    width: 18,
                    height: 18,
                    bgcolor: item,
                    borderRadius: '50%',
                    border: `solid 1px ${varAlpha(theme.vars.palette.common.whiteChannel, 0.24)}`,
                  }),
                ]}
              />
            }
            onDelete={() => handleRemoveColor(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock
        label="Date:"
        isShow={Boolean(currentFilters.startDate && currentFilters.endDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(currentFilters.startDate, currentFilters.endDate)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}
