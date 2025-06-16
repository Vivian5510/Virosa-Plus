import type { ITourItem } from 'src/types/tour';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';

import { TourItem } from './tour-item';

// ----------------------------------------------------------------------

type Props = {
  tours: ITourItem[];
};

export function TourList({ tours }: Props) {
  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {tours.map((tour) => (
          <TourItem
            key={tour.id}
            tour={tour}
            editHref={paths.dashboard.tour.edit(tour.id)}
            detailsHref={paths.dashboard.tour.details(tour.id)}
            onDelete={() => handleDelete(tour.id)}
          />
        ))}
      </Box>

      {tours.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
