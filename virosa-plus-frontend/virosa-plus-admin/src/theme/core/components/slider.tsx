import type { Theme, Components } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { sliderClasses } from '@mui/material/Slider';

// ----------------------------------------------------------------------

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../../extend-theme-types.d.ts}
 */

export type SliderExtendColor = {
  inherit: true;
};

// ----------------------------------------------------------------------

const SIZE = {
  rail: { small: 6, medium: 10 },
  thumb: { small: 16, medium: 20 },
  mark: { small: 4, medium: 6 },
};

const MuiSlider: Components<Theme>['MuiSlider'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { size: 'small' },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      variants: [
        /** @color inherit */
        {
          props: ({ ownerState }) => ownerState.color === 'inherit',
          style: () => ({
            [`& .${sliderClasses.markActive}`]: {
              ...theme.applyStyles('dark', {
                backgroundColor: varAlpha(theme.vars.palette.grey['800Channel'], 0.48),
              }),
            },
          }),
        },
        /** @state disabled */
        {
          props: ({ ownerState }) => !!ownerState.disabled,
          style: () => ({
            [`&.${sliderClasses.disabled}`]: {
              color: varAlpha(
                theme.vars.palette.grey['500Channel'],
                theme.vars.palette.action.disabledOpacity
              ),
            },
          }),
        },
      ],
      [`& .${sliderClasses.thumb}`]: {
        borderWidth: 1,
        borderStyle: 'solid',
        width: SIZE.thumb.medium,
        height: SIZE.thumb.medium,
        boxShadow: theme.vars.customShadows.z1,
        color: theme.vars.palette.common.white,
        borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        '&::before': {
          opacity: 0.4,
          boxShadow: 'none',
          width: 'calc(100% - 4px)',
          height: 'calc(100% - 4px)',
          backgroundImage: `linear-gradient(180deg, ${theme.vars.palette.grey[500]}, transparent)`,
          ...theme.applyStyles('dark', {
            opacity: 0.8,
          }),
        },
      },
    }),
    rail: ({ theme }) => ({
      opacity: 0.12,
      height: SIZE.rail.medium,
      backgroundColor: theme.vars.palette.grey[500],
    }),
    track: { height: SIZE.rail.medium },
    mark: ({ style, theme }) => ({
      width: 1,
      height: SIZE.mark.medium,
      backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.48),
      // start mark
      '&[data-index="0"]': { display: 'none' },
      // end mark
      ...(style?.left === '100%' && { display: 'none' }),
    }),
    markActive: ({ theme }) => ({
      backgroundColor: varAlpha(theme.vars.palette.common.whiteChannel, 0.64),
    }),
    markLabel: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(13),
      color: theme.vars.palette.text.disabled,
    }),
    valueLabel: ({ theme }) => ({
      borderRadius: 8,
      backgroundColor: theme.vars.palette.grey[800],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.vars.palette.grey[700],
      }),
    }),
    sizeSmall: {
      [`& .${sliderClasses.thumb}`]: { width: SIZE.thumb.small, height: SIZE.thumb.small },
      [`& .${sliderClasses.rail}`]: { height: SIZE.rail.small },
      [`& .${sliderClasses.track}`]: { height: SIZE.rail.small },
      [`& .${sliderClasses.mark}`]: { height: SIZE.mark.small },
    },
  },
};

// ----------------------------------------------------------------------

export const slider = { MuiSlider };
