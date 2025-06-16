import type { Variants } from 'framer-motion';

import {
  varFade,
  varZoom,
  varFlip,
  varSlide,
  varScale,
  varBgPan,
  varBounce,
  varRotate,
  varBgColor,
  varBgKenburns,
} from 'src/components/animate';

// ----------------------------------------------------------------------

export function getVariant(variant = 'slideInUp', distance = 160): Variants {
  const variants: Record<string, Variants> = {
    // Slide
    slideInUp: varSlide('inUp', { distance }),
    slideInDown: varSlide('inDown', { distance }),
    slideInLeft: varSlide('inLeft', { distance }),
    slideInRight: varSlide('inRight', { distance }),
    slideOutUp: varSlide('outUp', { distance }),
    slideOutDown: varSlide('outDown', { distance }),
    slideOutLeft: varSlide('outLeft', { distance }),
    slideOutRight: varSlide('outRight', { distance }),
    // Fade
    fadeIn: varFade('in'),
    fadeInUp: varFade('inUp', { distance }),
    fadeInDown: varFade('inDown', { distance }),
    fadeInLeft: varFade('inLeft', { distance }),
    fadeInRight: varFade('inRight', { distance }),
    fadeOut: varFade('out', { distance }),
    fadeOutUp: varFade('outUp', { distance }),
    fadeOutDown: varFade('outDown', { distance }),
    fadeOutLeft: varFade('outLeft', { distance }),
    fadeOutRight: varFade('outRight', { distance }),
    // Zoom
    zoomIn: varZoom('in', { distance: 80 }),
    zoomInUp: varZoom('inUp', { distance: 80 }),
    zoomInDown: varZoom('inDown', { distance: 80 }),
    zoomInLeft: varZoom('inLeft', { distance: 240 }),
    zoomInRight: varZoom('inRight', { distance: 240 }),
    zoomOut: varZoom('out'),
    zoomOutLeft: varZoom('outLeft'),
    zoomOutRight: varZoom('outRight'),
    zoomOutUp: varZoom('outUp'),
    zoomOutDown: varZoom('outDown'),
    // Bounce
    bounceIn: varBounce('in'),
    bounceInUp: varBounce('inUp', { transition: { duration: 0.8 } }),
    bounceInDown: varBounce('inDown', { transition: { duration: 0.8 } }),
    bounceInLeft: varBounce('inLeft', { transition: { duration: 0.8 } }),
    bounceInRight: varBounce('inRight', { transition: { duration: 0.8 } }),
    bounceOut: varBounce('out'),
    bounceOutUp: varBounce('outUp', { transition: { duration: 1 } }),
    bounceOutDown: varBounce('outDown', { transition: { duration: 1 } }),
    bounceOutLeft: varBounce('outLeft', { transition: { duration: 1 } }),
    bounceOutRight: varBounce('outRight', { transition: { duration: 1 } }),
    // Flip
    flipInX: varFlip('inX'),
    flipInY: varFlip('inY'),
    flipOutX: varFlip('outX'),
    flipOutY: varFlip('outY'),
    // Scale
    scaleInX: varScale('inX'),
    scaleInY: varScale('inY'),
    scaleOutX: varScale('outX'),
    scaleOutY: varScale('outY'),
    // Rotate
    rotateIn: varRotate('in'),
    rotateOut: varRotate('out'),
    // Background
    kenburnsTop: varBgKenburns('top'),
    kenburnsBottom: varBgKenburns('bottom'),
    kenburnsLeft: varBgKenburns('left'),
    kenburnsRight: varBgKenburns('right'),
    panTop: varBgPan('top', ['#ee7752', '#23d5ab']),
    panBottom: varBgPan('bottom', ['#ee7752', '#23a6d5', '#23d5ab']),
    panLeft: varBgPan('left', ['#ee7752', '#e73c7e', '#23d5ab']),
    panRight: varBgPan('right', ['#ee7752', '#e73c7e', '#23a6d5', '#23d5ab']),
    color2x: varBgColor(['#19dcea', '#b22cff']),
    color3x: varBgColor(['#19dcea', '#b22cff', '#ea2222'], {
      transition: { duration: 3, ease: 'backIn' },
    }),
    color4x: varBgColor(['#19dcea', '#b22cff', '#ea2222', '#f5be10'], {
      transition: { duration: 4, ease: 'backInOut' },
    }),
    color5x: varBgColor(['#19dcea', '#b22cff', '#ea2222', '#f5be10', '#3bd80d'], {
      transition: { duration: 5, ease: 'easeInOut' },
    }),
  };

  return variants[variant];
}
