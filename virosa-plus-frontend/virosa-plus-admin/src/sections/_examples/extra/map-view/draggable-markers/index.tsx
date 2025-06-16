import type { MapProps } from 'src/components/map';
import type { MarkerDragEvent } from 'react-map-gl';

import { useState, useCallback } from 'react';

import { Map, MapMarker, MapControls } from 'src/components/map';

import { MapControlPanel } from './control-panel';

// ----------------------------------------------------------------------

export function MapDraggableMarkers({ sx, ...other }: MapProps) {
  const [marker, setMarker] = useState({ latitude: 40, longitude: -100 });

  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((prevEvents) => ({ ...prevEvents, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((prevEvents) => ({ ...prevEvents, onDrag: event.lngLat }));

    setMarker({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((prevEvents) => ({ ...prevEvents, onDragEnd: event.lngLat }));
  }, []);

  return (
    <Map initialViewState={{ latitude: 40, longitude: -100, zoom: 3.5 }} sx={sx} {...other}>
      <MapControls />

      <MapMarker
        longitude={marker.longitude}
        latitude={marker.latitude}
        anchor="bottom"
        draggable
        onDragStart={onMarkerDragStart}
        onDrag={onMarkerDrag}
        onDragEnd={onMarkerDragEnd}
      />

      <MapControlPanel events={events} />
    </Map>
  );
}
