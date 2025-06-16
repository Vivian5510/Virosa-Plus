import type { IProductReview } from 'src/types/product';

import { sumBy } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

import { ProductReviewList } from './product-review-list';
import { ProductReviewNewForm } from './product-review-new-form';

// ----------------------------------------------------------------------

type Props = {
  totalRatings?: number;
  totalReviews?: number;
  reviews?: IProductReview[];
  ratings?: { name: string; starCount: number; reviewCount: number }[];
};

export function ProductDetailsReview({
  totalRatings,
  totalReviews,
  ratings = [],
  reviews = [],
}: Props) {
  const review = useBoolean();

  const total = sumBy(ratings, (star) => star.starCount);

  const renderSummary = () => (
    <Stack spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="subtitle2">Average rating</Typography>

      <Typography variant="h2">
        {totalRatings}
        /5
      </Typography>

      <Rating readOnly value={totalRatings} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(totalReviews)} reviews)
      </Typography>
    </Stack>
  );

  const renderProgress = () => (
    <Stack
      spacing={1.5}
      sx={[
        (theme) => ({
          py: 5,
          px: { xs: 3, md: 5 },
          borderLeft: { md: `dashed 1px ${theme.vars.palette.divider}` },
          borderRight: { md: `dashed 1px ${theme.vars.palette.divider}` },
        }),
      ]}
    >
      {ratings
        .slice(0)
        .reverse()
        .map((rating) => (
          <Box key={rating.name} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2" component="span" sx={{ width: 42 }}>
              {rating.name}
            </Typography>

            <LinearProgress
              color="inherit"
              variant="determinate"
              value={(rating.starCount / total) * 100}
              sx={{ mx: 2, flexGrow: 1 }}
            />

            <Typography
              variant="body2"
              component="span"
              sx={{ minWidth: 48, color: 'text.secondary' }}
            >
              {fShortenNumber(rating.reviewCount)}
            </Typography>
          </Box>
        ))}
    </Stack>
  );

  const renderReviewButton = () => (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button
        size="large"
        variant="soft"
        color="inherit"
        onClick={review.onTrue}
        startIcon={<Iconify icon="solar:pen-bold" />}
      >
        Write your review
      </Button>
    </Stack>
  );

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          py: { xs: 5, md: 0 },
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {renderSummary()}
        {renderProgress()}
        {renderReviewButton()}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />
      <ProductReviewList reviews={reviews} />
      <ProductReviewNewForm open={review.value} onClose={review.onFalse} />
    </>
  );
}
