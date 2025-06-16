import AutoScroll from 'embla-carousel-auto-scroll';

import Box from '@mui/material/Box';

import { Carousel, useCarousel, CarouselProgressBar } from 'src/components/carousel';

import { IndexLabel, PlayButton } from './elements';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export function CarouselAutoScroll({ data }: Props) {
  const carousel = useCarousel({ loop: true }, [AutoScroll({ playOnInit: false })]);

  return (
    <>
      <PlayButton
        isPlaying={carousel.autoScroll.isPlaying}
        onClick={carousel.autoScroll.onTogglePlay}
      />

      <Box sx={{ position: 'relative' }}>
        <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
          {data.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
          ))}
        </Carousel>

        <CarouselProgressBar
          {...carousel.progress}
          sx={{
            top: 20,
            right: 20,
            color: 'info.light',
            position: 'absolute',
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
    <Box sx={{ position: 'relative' }}>
      <IndexLabel index={index + 1} />

      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{ objectFit: 'cover', aspectRatio: { xs: '4/3', sm: '16/10' } }}
      />
    </Box>
  );
}
