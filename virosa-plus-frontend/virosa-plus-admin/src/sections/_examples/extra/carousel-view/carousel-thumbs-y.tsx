import Box from '@mui/material/Box';

import {
  Carousel,
  useCarousel,
  CarouselThumb,
  CarouselThumbs,
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

export function CarouselThumbsY({ data }: Props) {
  const carousel = useCarousel({
    thumbs: { axis: 'y', slideSpacing: '8px', slidesToShow: 'auto' },
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
        {data.map((item, index) => (
          <Box key={item.id} sx={{ position: 'relative' }}>
            <IndexLabel index={index + 1} />

            <Box
              component="img"
              alt={item.title}
              src={item.coverUrl}
              sx={{ objectFit: 'cover', aspectRatio: { xs: '3/4', sm: '16/10' } }}
            />
          </Box>
        ))}
      </Carousel>

      <CarouselArrowNumberButtons
        {...carousel.arrows}
        options={carousel.options}
        totalSlides={carousel.dots.dotCount}
        selectedIndex={carousel.dots.selectedIndex + 1}
        sx={{ left: 16, bottom: 16, position: 'absolute' }}
      />

      <Box
        sx={{
          p: 0.5,
          right: 8,
          top: '50%',
          borderRadius: 1.25,
          position: 'absolute',
          bgcolor: 'background.paper',
          transform: 'translateY(-50%)',
        }}
      >
        <CarouselThumbs
          ref={carousel.thumbs.thumbsRef}
          options={carousel.options?.thumbs}
          sx={{ height: { xs: 200, md: 280 } }}
        >
          {data.map((item, index) => (
            <CarouselThumb
              key={item.id}
              index={index}
              src={item.coverUrl}
              selected={index === carousel.thumbs.selectedIndex}
              onClick={() => carousel.thumbs.onClickThumb(index)}
              sx={{ width: 48, height: 48 }}
            />
          ))}
        </CarouselThumbs>
      </Box>
    </Box>
  );
}
