import Box from '@mui/material/Box';

import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export function CarouselYaxis({ data }: Props) {
  const carousel = useCarousel({ axis: 'y' });

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel
        carousel={carousel}
        sx={{ borderRadius: 2, overflow: 'hidden', height: { xs: 240, sm: 320, md: 480 } }}
      >
        {data.map((item, index) => (
          <CarouselItem key={item.id} index={index} item={item} />
        ))}
      </Carousel>

      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{
          top: 16,
          right: 16,
          position: 'absolute',
          color: 'warning.main',
        }}
      />

      <CarouselArrowBasicButtons
        {...carousel.arrows}
        options={carousel.options}
        slotProps={{ prevBtn: { sx: { p: 0.75 } }, nextBtn: { sx: { p: 0.75 } } }}
        sx={{
          p: 0.5,
          gap: 0.5,
          right: 16,
          bottom: 16,
          borderRadius: 1,
          position: 'absolute',
          bgcolor: 'common.white',
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  index: number;
  item: Props['data'][number];
};

function CarouselItem({ item, index }: CarouselItemProps) {
  return (
    <Box sx={{ position: 'relative', height: 1 }}>
      <IndexLabel index={index + 1} />

      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
      />
    </Box>
  );
}
