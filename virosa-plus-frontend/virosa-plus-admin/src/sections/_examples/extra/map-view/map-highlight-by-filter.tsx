import type { Theme } from '@mui/material/styles';
import type { MapProps } from 'src/components/map';
import type { FillLayer, MapLayerMouseEvent } from 'react-map-gl';

import { Layer, Source } from 'react-map-gl';
import { useMemo, useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Map, MapPopup, MapControls } from 'src/components/map';

// ----------------------------------------------------------------------

const countiesLayer = (theme: Theme): Omit<FillLayer, 'source'> => ({
  id: 'counties',
  type: 'fill',
  'source-layer': 'original',
  paint: {
    'fill-outline-color': theme.palette.grey[900],
    'fill-color': theme.palette.grey[900],
    'fill-opacity': 0.12,
  },
});

const highlightLayer = (theme: Theme): FillLayer => ({
  id: 'counties-highlighted',
  type: 'fill',
  source: 'counties',
  'source-layer': 'original',
  paint: {
    'fill-outline-color': theme.palette.error.main,
    'fill-color': theme.palette.error.main,
    'fill-opacity': 0.48,
  },
});

export function MapHighlightByFilter({ sx, ...other }: MapProps) {
  const theme = useTheme();

  const [hoverInfo, setHoverInfo] = useState<{
    countyName: string;
    longitude: number;
    latitude: number;
  } | null>(null);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const county = event.features && event.features[0];

    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      countyName: county && county.properties?.COUNTY,
    });
  }, []);

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || '';

  const filter: any = useMemo(() => ['in', 'COUNTY', selectedCounty], [selectedCounty]);

  return (
    <Map
      initialViewState={{ latitude: 38.88, longitude: -98, zoom: 3 }}
      minZoom={2}
      onMouseMove={onHover}
      interactiveLayerIds={['counties']}
      sx={sx}
      {...other}
    >
      <MapControls />

      <Source type="vector" url="mapbox://mapbox.82pkq93d">
        <Layer beforeId="waterway-label" {...countiesLayer(theme)} />
        <Layer beforeId="waterway-label" {...highlightLayer(theme)} filter={filter} />
      </Source>

      {selectedCounty && hoverInfo && (
        <MapPopup longitude={hoverInfo.longitude} latitude={hoverInfo.latitude} closeButton={false}>
          <Typography variant="body2">{selectedCounty}</Typography>
        </MapPopup>
      )}
    </Map>
  );
}
