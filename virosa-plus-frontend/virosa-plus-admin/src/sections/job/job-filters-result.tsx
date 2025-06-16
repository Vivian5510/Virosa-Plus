import type { IJobFilters } from 'src/types/job';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  filters: UseSetStateReturn<IJobFilters>;
};

export function JobFiltersResult({ filters, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveEmploymentTypes = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.employmentTypes.filter((item) => item !== inputValue);
      updateFilters({ employmentTypes: newValue });
    },
    [updateFilters, currentFilters.employmentTypes]
  );

  const handleRemoveExperience = useCallback(() => {
    updateFilters({ experience: 'all' });
  }, [updateFilters]);

  const handleRemoveRoles = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.roles.filter((item) => item !== inputValue);
      updateFilters({ roles: newValue });
    },
    [updateFilters, currentFilters.roles]
  );

  const handleRemoveLocations = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.locations.filter((item) => item !== inputValue);
      updateFilters({ locations: newValue });
    },
    [updateFilters, currentFilters.locations]
  );

  const handleRemoveBenefits = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.benefits.filter((item) => item !== inputValue);
      updateFilters({ benefits: newValue });
    },
    [updateFilters, currentFilters.benefits]
  );

  return (
    <FiltersResult totalResults={totalResults} onReset={() => resetFilters()} sx={sx}>
      <FiltersBlock label="Employment types:" isShow={!!currentFilters.employmentTypes.length}>
        {currentFilters.employmentTypes.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={item}
            onDelete={() => handleRemoveEmploymentTypes(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Experience:" isShow={currentFilters.experience !== 'all'}>
        <Chip {...chipProps} label={currentFilters.experience} onDelete={handleRemoveExperience} />
      </FiltersBlock>

      <FiltersBlock label="Roles:" isShow={!!currentFilters.roles.length}>
        {currentFilters.roles.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveRoles(item)} />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Locations:" isShow={!!currentFilters.locations.length}>
        {currentFilters.locations.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={item}
            onDelete={() => handleRemoveLocations(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Benefits:" isShow={!!currentFilters.benefits.length}>
        {currentFilters.benefits.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={item}
            onDelete={() => handleRemoveBenefits(item)}
          />
        ))}
      </FiltersBlock>
    </FiltersResult>
  );
}
