import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { ITourGuide, ITourFilters } from 'src/types/tour';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  filters: UseSetStateReturn<ITourFilters>;
};

export function TourFiltersResult({ filters, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveServices = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.services.filter((item) => item !== inputValue);

      updateFilters({ services: newValue });
    },
    [updateFilters, currentFilters.services]
  );

  const handleRemoveAvailable = useCallback(() => {
    updateFilters({ startDate: null, endDate: null });
  }, [updateFilters]);

  const handleRemoveTourGuide = useCallback(
    (inputValue: ITourGuide) => {
      const newValue = currentFilters.tourGuides.filter((item) => item.name !== inputValue.name);

      updateFilters({ tourGuides: newValue });
    },
    [updateFilters, currentFilters.tourGuides]
  );

  const handleRemoveDestination = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.destination.filter((item) => item !== inputValue);

      updateFilters({ destination: newValue });
    },
    [updateFilters, currentFilters.destination]
  );

  return (
    <FiltersResult totalResults={totalResults} onReset={() => resetFilters()} sx={sx}>
      <FiltersBlock
        label="Available:"
        isShow={Boolean(currentFilters.startDate && currentFilters.endDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(currentFilters.startDate, currentFilters.endDate)}
          onDelete={handleRemoveAvailable}
        />
      </FiltersBlock>

      <FiltersBlock label="Services:" isShow={!!currentFilters.services.length}>
        {currentFilters.services.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={item}
            onDelete={() => handleRemoveServices(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Tour guide:" isShow={!!currentFilters.tourGuides.length}>
        {currentFilters.tourGuides.map((item) => (
          <Chip
            {...chipProps}
            key={item.id}
            avatar={<Avatar alt={item.name} src={item.avatarUrl} />}
            label={item.name}
            onDelete={() => handleRemoveTourGuide(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Destination:" isShow={!!currentFilters.destination.length}>
        {currentFilters.destination.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={item}
            onDelete={() => handleRemoveDestination(item)}
          />
        ))}
      </FiltersBlock>
    </FiltersResult>
  );
}
