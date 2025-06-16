import Box from '@mui/material/Box';

import {
  Carousel,
  useCarousel,
  carouselClasses,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
  CarouselArrowFloatButtons,
  CarouselArrowNumberButtons,
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

export function CarouselCustoms({ data }: Props) {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '20px',
    slidesToShow: { xs: 1, sm: 2 },
  });

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Carousel carousel={carousel} sx={{ maxWidth: 640 }}>
          {data.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
          ))}
        </Carousel>

        <CarouselArrowFloatButtons
          {...carousel.arrows}
          options={carousel.options}
          slotProps={{
            prevBtn: {
              sx: { left: 24 },
              svgIcon: (
                <path d="M20 11.25a.75.75 0 0 1 0 1.5h-9.25V18a.75.75 0 0 1-1.28.53l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.28.53v5.25z" />
              ),
            },
            nextBtn: {
              sx: { right: 24 },
              svgIcon: (
                <path d="M4 11.25a.75.75 0 0 0 0 1.5h9.25V18a.75.75 0 0 0 1.28.53l6-6a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.28.53v5.25z" />
              ),
            },
          }}
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
        />
      </Box>

      <Box
        sx={{
          p: 5,
          mt: 5,
          gap: 3,
          display: 'flex',
          borderRadius: 2,
          alignItems: 'center',
          flexDirection: 'column',
          bgcolor: 'background.neutral',
        }}
      >
        <CarouselArrowBasicButtons
          {...carousel.arrows}
          options={carousel.options}
          sx={{ color: 'secondary.main' }}
        />

        <CarouselArrowNumberButtons
          {...carousel.arrows}
          options={carousel.options}
          totalSlides={carousel.dots.dotCount}
          selectedIndex={carousel.dots.selectedIndex + 1}
          slotProps={{
            prevBtn: {
              svgIcon: (
                <path
                  fill="currentColor"
                  d="M20 11.25a.75.75 0 0 1 0 1.5h-9.25V18a.75.75 0 0 1-1.28.53l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.28.53v5.25z"
                />
              ),
            },
            nextBtn: {
              svgIcon: (
                <path
                  fill="currentColor"
                  d="M4 11.25a.75.75 0 0 0 0 1.5h9.25V18a.75.75 0 0 0 1.28.53l6-6a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.28.53v5.25z"
                />
              ),
            },
          }}
          sx={{ bgcolor: 'info.main', color: 'info.contrastText' }}
        />

        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
          sx={{ color: 'primary.main' }}
        />

        <CarouselDotButtons
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
          sx={{ color: 'info.main' }}
        />

        <CarouselDotButtons
          variant="number"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
          sx={{
            [`& .${carouselClasses.dots.itemSelected}`]: {
              bgcolor: 'warning.main',
              color: 'warning.contrastText',
            },
          }}
        />
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  index: number;
  item: Props['data'][number];
};

function CarouselItem({ item, index }: CarouselItemProps) {
  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <IndexLabel index={index + 1} />

      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{ aspectRatio: '4/3', objectFit: 'cover' }}
      />
    </Box>
  );
}
