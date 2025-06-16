import type { Theme, SxProps } from '@mui/material/styles';
import type { MapRef, MapProps as ReactMapProps } from 'react-map-gl';

import { forwardRef } from 'react';
import ReactMap from 'react-map-gl';

import { styled } from '@mui/material/styles';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export type MapProps = ReactMapProps & { sx?: SxProps<Theme> };

export const Map = forwardRef<MapRef, MapProps>((props, ref) => {
  const { sx, ...other } = props;

  return (
    <MapRoot sx={sx}>
      <ReactMap ref={ref} mapboxAccessToken={CONFIG.mapboxApiKey} {...other} />
    </MapRoot>
  );
});

// ----------------------------------------------------------------------

const MapRoot = styled('div')({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});
