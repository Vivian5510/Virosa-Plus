import type { IProductFilters } from 'src/types/product';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  filters: UseSetStateReturn<IProductFilters>;
};

export function ProductFiltersResult({ filters, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveGender = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.gender.filter((item) => item !== inputValue);

      updateFilters({ gender: newValue });
    },
    [updateFilters, currentFilters.gender]
  );

  const handleRemoveCategory = useCallback(() => {
    updateFilters({ category: 'all' });
  }, [updateFilters]);

  const handleRemoveColor = useCallback(
    (inputValue: string | string[]) => {
      const newValue = currentFilters.colors.filter((item: string) => item !== inputValue);

      updateFilters({ colors: newValue });
    },
    [updateFilters, currentFilters.colors]
  );

  const handleRemovePrice = useCallback(() => {
    updateFilters({ priceRange: [0, 200] });
  }, [updateFilters]);

  const handleRemoveRating = useCallback(() => {
    updateFilters({ rating: '' });
  }, [updateFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={() => resetFilters()} sx={sx}>
      <FiltersBlock label="Gender:" isShow={!!currentFilters.gender.length}>
        {currentFilters.gender.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveGender(item)} />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Category:" isShow={currentFilters.category !== 'all'}>
        <Chip {...chipProps} label={currentFilters.category} onDelete={handleRemoveCategory} />
      </FiltersBlock>

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
        label="Price:"
        isShow={currentFilters.priceRange[0] !== 0 || currentFilters.priceRange[1] !== 200}
      >
        <Chip
          {...chipProps}
          label={`$${currentFilters.priceRange[0]} - ${currentFilters.priceRange[1]}`}
          onDelete={handleRemovePrice}
        />
      </FiltersBlock>

      <FiltersBlock label="Rating:" isShow={!!currentFilters.rating}>
        <Chip {...chipProps} label={currentFilters.rating} onDelete={handleRemoveRating} />
      </FiltersBlock>
    </FiltersResult>
  );
}
