import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import { Image } from '../../image';
import { megaMenuClasses } from '../styles';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from '../../carousel';

import type { NavCarouselProps } from '../types';

// ----------------------------------------------------------------------

export function NavCarousel({ sx, slides, className, options, ...other }: NavCarouselProps) {
  const carousel = useCarousel({
    ...options,
    slidesToShow: options?.slidesToShow ?? 8,
    slidesToScroll: options?.slidesToScroll ?? 8,
  });

  return (
    <CarouselRoot
      className={mergeClasses([megaMenuClasses.carousel.root, className])}
      sx={sx}
      {...other}
    >
      <Carousel carousel={carousel}>
        {slides.map((item) => (
          <CarouselItemRoot
            key={item.name}
            href={item.path}
            color="inherit"
            underline="none"
            className={megaMenuClasses.carousel.item}
          >
            <Image alt={item.coverUrl} src={item.coverUrl} ratio="1/1" sx={{ borderRadius: 1 }} />
            <CarouselItemTitle>{item.name}</CarouselItemTitle>
          </CarouselItemRoot>
        ))}
      </Carousel>

      <CarouselFooter>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
          sx={{ color: 'primary.main' }}
        />
      </CarouselFooter>
    </CarouselRoot>
  );
}

// ----------------------------------------------------------------------

const CarouselRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(2),
}));

const CarouselFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  justifyContent: 'space-between',
}));

const CarouselItemRoot = styled(Link)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexDirection: 'column',
  padding: theme.spacing(0, 1),
  transition: theme.transitions.create('color'),
  '&:hover': { color: theme.vars.palette.primary.main },
}));

const CarouselItemTitle = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.caption }),
  fontWeight: theme.typography.fontWeightSemiBold,
}));
