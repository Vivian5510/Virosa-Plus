import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { carouselClasses } from '../classes';

import type { CarouselThumbProps } from '../types';

// ----------------------------------------------------------------------

export function CarouselThumb({
  sx,
  src,
  index,
  selected,
  className,
  ...other
}: CarouselThumbProps) {
  return (
    <ThumbRoot
      selected={selected}
      className={mergeClasses([carouselClasses.thumbs.item, className])}
      sx={sx}
      {...other}
    >
      <img alt={`carousel-thumb-${index}`} src={src} className={carouselClasses.thumbs.image} />
    </ThumbRoot>
  );
}

// ----------------------------------------------------------------------

const ThumbRoot = styled(ButtonBase, {
  shouldForwardProp: (prop: string) => !['selected', 'sx'].includes(prop),
})<Pick<CarouselThumbProps, 'selected'>>(({ theme }) => ({
  width: 64,
  height: 64,
  opacity: 0.48,
  flexShrink: 0,
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius * 1.25,
  transition: theme.transitions.create(['opacity', 'box-shadow'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
  [`& .${carouselClasses.thumbs.image}`]: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  },
  variants: [
    {
      props: { selected: true },
      style: { opacity: 1, boxShadow: `0 0 0 2px ${theme.vars.palette.primary.main}` },
    },
  ],
}));
