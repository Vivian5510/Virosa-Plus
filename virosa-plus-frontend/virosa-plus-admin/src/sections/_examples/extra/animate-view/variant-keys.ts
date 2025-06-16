// ----------------------------------------------------------------------

export type VariantOption = {
  type: string;
  values: string[];
};

const SLIDE_VALUES = [
  'slideInUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideOutUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
];
const FADE_VALUES = [
  'fadeIn',
  'fadeInUp',
  'fadeInDown',
  'fadeInLeft',
  'fadeInRight',
  'fadeOut',
  'fadeOutUp',
  'fadeOutDown',
  'fadeOutLeft',
  'fadeOutRight',
];
const ZOOM_VALUES = [
  'zoomIn',
  'zoomInUp',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomOut',
  'zoomOutUp',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
];
const BOUNCE_VALUES = [
  'bounceIn',
  'bounceInUp',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceOut',
  'bounceOutUp',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
];
const FLIP_VALUES = ['flipInX', 'flipInY', 'flipOutX', 'flipOutY'];
const SCALE_VALUES = ['scaleInX', 'scaleInY', 'scaleOutX', 'scaleOutY'];
const ROTATE_VALUES = ['rotateIn', 'rotateOut'];
const KENBURNS_VALUES = ['kenburnsTop', 'kenburnsBottom', 'kenburnsLeft', 'kenburnsRight'];
const PAN_VALUES = ['panTop', 'panBottom', 'panLeft', 'panRight'];
const COLOR_VALUES = ['color2x', 'color3x', 'color4x', 'color5x'];

export const inviewOptions: VariantOption[] = [
  { type: 'slide', values: SLIDE_VALUES },
  { type: 'fade', values: FADE_VALUES },
  { type: 'zoom', values: ZOOM_VALUES },
  { type: 'bounce', values: BOUNCE_VALUES },
  { type: 'flip', values: FLIP_VALUES },
  { type: 'scale', values: SCALE_VALUES },
  { type: 'rotate', values: ROTATE_VALUES },
];

export const scrollOptions: VariantOption[] = [
  { type: 'slide', values: SLIDE_VALUES.slice(0, 4) },
  { type: 'fade', values: FADE_VALUES.slice(0, 5) },
  { type: 'zoom', values: ZOOM_VALUES.slice(0, 5) },
  { type: 'bounce', values: BOUNCE_VALUES.slice(0, 5) },
  { type: 'flip', values: FLIP_VALUES.slice(0, 2) },
  { type: 'scale', values: SCALE_VALUES.slice(0, 2) },
  { type: 'rotate', values: ROTATE_VALUES.slice(0, 1) },
];

export const backgroundOptions: VariantOption[] = [
  { type: 'kenburns', values: KENBURNS_VALUES },
  { type: 'pan', values: PAN_VALUES },
  { type: 'color change', values: COLOR_VALUES },
];
