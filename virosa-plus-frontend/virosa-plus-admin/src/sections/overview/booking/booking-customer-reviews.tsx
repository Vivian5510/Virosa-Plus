import type { BoxProps } from '@mui/material/Box';
import type { IDateValue } from 'src/types/common';
import type { CardProps } from '@mui/material/Card';

import AutoHeight from 'embla-carousel-auto-height';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDateTime } from 'src/utils/format-time';

import { Carousel, useCarousel, CarouselArrowBasicButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
    rating: number;
    tags: string[];
    avatarUrl: string;
    description: string;
    postedAt: IDateValue;
  }[];
};

export function BookingCustomerReviews({ title, subheader, list, sx, ...other }: Props) {
  const carousel = useCarousel({ align: 'start' }, [AutoHeight()]);

  const customerInfo = list.find((_, index) => index === carousel.dots.selectedIndex);

  return (
    <Card sx={sx} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={<CarouselArrowBasicButtons {...carousel.arrows} />}
      />

      <Carousel carousel={carousel}>
        {list.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Carousel>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 3, gap: 2, display: 'flex' }}>
        <Button
          fullWidth
          color="error"
          variant="soft"
          onClick={() => console.info('ACCEPT', customerInfo?.id)}
        >
          Reject
        </Button>

        <Button
          fullWidth
          color="inherit"
          variant="contained"
          onClick={() => console.info('REJECT', customerInfo?.id)}
        >
          Accept
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: Props['list'][number];
};

function Item({ item, sx, ...other }: ItemProps) {
  return (
    <Box
      sx={[
        {
          p: 3,
          gap: 2,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar alt={item.name} src={item.avatarUrl} sx={{ width: 48, height: 48 }} />

        <ListItemText
          primary={item.name}
          secondary={`Posted ${fDateTime(item.postedAt)}`}
          slotProps={{
            secondary: {
              sx: { mt: 0.5, typography: 'caption', color: 'text.disabled' },
            },
          }}
        />
      </Box>

      <Rating value={item.rating} size="small" readOnly precision={0.5} />

      <Typography variant="body2">{item.description}</Typography>

      <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
        {item.tags.map((tag) => (
          <Chip size="small" variant="soft" key={tag} label={tag} />
        ))}
      </Box>
    </Box>
  );
}
