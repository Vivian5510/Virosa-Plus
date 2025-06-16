import type { LightboxExternalProps } from 'yet-another-react-lightbox';

// ----------------------------------------------------------------------

export type LightBoxProps = LightboxExternalProps & {
  disableZoom?: boolean;
  disableVideo?: boolean;
  disableTotal?: boolean;
  disableCaptions?: boolean;
  disableSlideshow?: boolean;
  disableThumbnails?: boolean;
  disableFullscreen?: boolean;
  onGetCurrentIndex?: (index: number) => void;
};
