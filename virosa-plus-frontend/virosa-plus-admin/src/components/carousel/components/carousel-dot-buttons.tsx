import type { CSSObject } from '@mui/material/styles';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { carouselClasses } from '../classes';

import type { CarouselDotButtonsProps } from '../types';

// ----------------------------------------------------------------------

export function CarouselDotButtons({
  sx,
  gap,
  slotProps,
  className,
  onClickDot,
  scrollSnaps,
  selectedIndex,
  variant = 'circular',
  ...other
}: CarouselDotButtonsProps) {
  const GAPS = { rounded: gap ?? 2, circular: gap ?? 2, number: gap ?? 6 };

  const SIZES = {
    circular: slotProps?.dot?.size ?? 18,
    rounded: slotProps?.dot?.size ?? 18,
    number: slotProps?.dot?.size ?? 28,
  };

  return (
    <Box
      component="ul"
      className={mergeClasses([carouselClasses.dots.root, className])}
      sx={[
        () => ({
          gap: `${GAPS[variant]}px`,
          height: SIZES[variant],
          zIndex: 9,
          display: 'flex',
          '& > li': {
            display: 'inline-flex',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {scrollSnaps.map((_, index) => {
        const selected = index === selectedIndex;

        return (
          <li key={index}>
            <DotItem
              disableRipple
              aria-label={`dot-${index}`}
              variant={variant}
              selected={selected}
              className={mergeClasses(carouselClasses.dots.item, {
                [carouselClasses.dots.itemSelected]: selected,
              })}
              onClick={() => onClickDot(index)}
              sx={[
                () => ({
                  width: SIZES[variant],
                  height: SIZES[variant],
                }),
                ...(Array.isArray(slotProps?.dot?.sx)
                  ? (slotProps?.dot?.sx ?? [])
                  : [slotProps?.dot?.sx]),
              ]}
            >
              {variant === 'number' && index + 1}
            </DotItem>
          </li>
        );
      })}
    </Box>
  );
}

// ----------------------------------------------------------------------

type DotItemProps = Pick<CarouselDotButtonsProps, 'variant'> & {
  selected?: boolean;
};

const DotItem = styled(ButtonBase, {
  shouldForwardProp: (prop: string) => !['variant', 'selected', 'sx'].includes(prop),
})<DotItemProps>(({ selected, theme }) => {
  const dotStyles: CSSObject = {
    width: 8,
    height: 8,
    content: '""',
    opacity: 0.24,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create(['width', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
  };

  return {
    variants: [
      {
        props: { variant: 'circular' },
        style: { '&::before': { ...dotStyles, ...(selected && { opacity: 1 }) } },
      },
      {
        props: { variant: 'rounded' },
        style: {
          '&::before': {
            ...dotStyles,
            ...(selected && {
              opacity: 1,
              width: 'calc(100% - 4px)',
              borderRadius: theme.shape.borderRadius,
            }),
          },
        },
      },
      {
        props: { variant: 'number' },
        style: {
          ...theme.typography.caption,
          borderRadius: '50%',
          color: theme.vars.palette.text.disabled,
          border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
          ...(selected && {
            color: theme.vars.palette.common.white,
            backgroundColor: theme.vars.palette.text.primary,
            fontWeight: theme.typography.fontWeightSemiBold,
            ...theme.applyStyles('dark', {
              color: theme.vars.palette.grey[800],
            }),
          }),
        },
      },
    ],
  };
});
