import type { IProductReview } from 'src/types/product';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  review: IProductReview;
};

export function ProductReviewItem({ review }: Props) {
  const renderInfo = () => (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        width: { md: 240 },
        alignItems: 'center',
        textAlign: { md: 'center' },
        flexDirection: { xs: 'row', md: 'column' },
      }}
    >
      <Avatar
        src={review.avatarUrl}
        sx={{ width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 } }}
      />

      <ListItemText
        primary={review.name}
        secondary={fDate(review.postedAt)}
        slotProps={{
          primary: { noWrap: true },
          secondary: {
            noWrap: true,
            sx: { mt: 0.5, typography: 'caption' },
          },
        }}
      />
    </Box>
  );

  const renderContent = () => (
    <Stack spacing={1} flexGrow={1}>
      <Rating size="small" value={review.rating} precision={0.1} readOnly />

      {review.isPurchased && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'success.main',
            typography: 'caption',
          }}
        >
          <Iconify icon="ic:round-verified" width={16} sx={{ mr: 0.5 }} />
          Verified purchase
        </Box>
      )}

      <Typography variant="body2">{review.comment}</Typography>

      {!!review.attachments?.length && (
        <Box
          sx={{
            pt: 1,
            gap: 1,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {review.attachments.map((attachment) => (
            <Box
              key={attachment}
              component="img"
              alt={attachment}
              src={attachment}
              sx={{ width: 64, height: 64, borderRadius: 1.5 }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ gap: 2, pt: 1.5, display: 'flex' }}>
        <ButtonBase disableRipple sx={{ gap: 0.5, typography: 'caption' }}>
          <Iconify icon="solar:like-outline" width={16} />
          123
        </ButtonBase>

        <ButtonBase disableRipple sx={{ gap: 0.5, typography: 'caption' }}>
          <Iconify icon="solar:dislike-outline" width={16} />
          34
        </ButtonBase>
      </Box>
    </Stack>
  );

  return (
    <Box
      sx={{
        mt: 5,
        gap: 2,
        display: 'flex',
        px: { xs: 2.5, md: 0 },
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {renderInfo()}
      {renderContent()}
    </Box>
  );
}
