import type {
  ScaleControlProps,
  GeolocateControlProps,
  FullscreenControlProps,
  NavigationControlProps,
} from 'react-map-gl';

import { ScaleControl, GeolocateControl, NavigationControl, FullscreenControl } from 'react-map-gl';

// ----------------------------------------------------------------------

export type MapControlsProps = {
  hideScale?: boolean;
  hideGeolocate?: boolean;
  hideFullscreen?: boolean;
  hideNavigation?: boolean;
  slotProps?: {
    scale?: ScaleControlProps;
    geolocate?: GeolocateControlProps;
    fullscreen?: FullscreenControlProps;
    navigation?: NavigationControlProps;
  };
};

export function MapControls({
  hideScale,
  hideGeolocate,
  hideFullscreen,
  hideNavigation,
  slotProps,
}: MapControlsProps) {
  return (
    <>
      {!hideGeolocate && (
        <GeolocateControl
          position="top-left"
          {...slotProps?.geolocate}
          positionOptions={{ enableHighAccuracy: true, ...slotProps?.geolocate?.positionOptions }}
        />
      )}
      {!hideFullscreen && <FullscreenControl position="top-left" {...slotProps?.fullscreen} />}
      {!hideScale && <ScaleControl position="bottom-left" {...slotProps?.scale} />}
      {!hideNavigation && <NavigationControl position="bottom-left" {...slotProps?.navigation} />}
    </>
  );
}
