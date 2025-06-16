import type { MapProps } from 'src/components/map';

import { useState, useCallback } from 'react';

import { Map, MapControls } from 'src/components/map';

import { MapControlPanel } from './control-panel';

// ----------------------------------------------------------------------

type Props = MapProps & { themes: { [key: string]: string } };

export function MapChangeTheme({ themes, sx, ...other }: Props) {
  const [selectTheme, setSelectTheme] = useState('outdoors');

  const handleChangeTheme = useCallback((value: string) => setSelectTheme(value), []);

  return (
    <Map
      initialViewState={{
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle={themes?.[selectTheme]}
      sx={sx}
      {...other}
    >
      <MapControls />

      <MapControlPanel themes={themes} value={selectTheme} onChangeTheme={handleChangeTheme} />
    </Map>
  );
}
