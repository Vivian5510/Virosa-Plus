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

export function CarouselThumbsX({ data }: Props) {
  const carousel = useCarousel({ thumbs: { slidesToShow: 'auto' } });

  return (
    <div>
      <Box sx={{ mb: 2.5, position: 'relative' }}>
        <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
          {data.map((item, index) => (
            <Box key={item.id} sx={{ position: 'relative' }}>
              <IndexLabel index={index + 1} />

              <Box
                component="img"
                alt={item.title}
                src={item.coverUrl}
                sx={{ objectFit: 'cover', aspectRatio: { xs: '4/3', sm: '16/10' } }}
              />
            </Box>
          ))}
        </Carousel>

        <CarouselArrowNumberButtons
          {...carousel.arrows}
          options={carousel.options}
          totalSlides={carousel.dots.dotCount}
          selectedIndex={carousel.dots.selectedIndex + 1}
          sx={{ right: 16, bottom: 16, position: 'absolute' }}
        />
      </Box>

      <CarouselThumbs
        ref={carousel.thumbs.thumbsRef}
        options={carousel.options?.thumbs}
        sx={{ width: { xs: 1, sm: 360 } }}
      >
        {data.map((item, index) => (
          <CarouselThumb
            key={item.id}
            index={index}
            src={item.coverUrl}
            selected={index === carousel.thumbs.selectedIndex}
            onClick={() => carousel.thumbs.onClickThumb(index)}
            sx={{ width: { xs: 48, sm: 64 }, height: { xs: 48, sm: 64 } }}
          />
        ))}
      </CarouselThumbs>
    </div>
  );
}
