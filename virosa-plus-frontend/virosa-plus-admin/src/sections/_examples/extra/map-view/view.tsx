import type { MapProps } from 'src/components/map';
import type { Theme, SxProps } from '@mui/material/styles';

import { cities as CITIES } from 'src/_mock/_map/cities';
import { countries as COUNTRIES } from 'src/_mock/_map/countries';

import { MapHeatmap } from './heatmap';
import { MapClusters } from './map-clusters';
import { MapInteraction } from './interaction';
import { MapSideBySide } from './side-by-side';
import { ComponentLayout } from '../../layout';
import { MapChangeTheme } from './change-theme';
import { MapMarkersPopups } from './map-markers-popups';
import { MapDraggableMarkers } from './draggable-markers';
import { MapViewportAnimation } from './viewport-animation';
import { MapGeoJSONAnimation } from './map-geo-json-animation';
import { MapHighlightByFilter } from './map-highlight-by-filter';

// ----------------------------------------------------------------------

const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};

const baseSettings: MapProps = {
  minZoom: 1,
};

const mapStyles: SxProps<Theme> = {
  height: 480,
  borderRadius: 1,
};

const DEMO_COMPONENTS = [
  {
    name: 'Change theme',
    component: <MapChangeTheme {...baseSettings} themes={THEMES} sx={mapStyles} />,
  },
  {
    name: 'Markers & popups',
    component: (
      <MapMarkersPopups {...baseSettings} data={COUNTRIES} mapStyle={THEMES.light} sx={mapStyles} />
    ),
  },
  {
    name: 'Draggable markers',
    component: <MapDraggableMarkers {...baseSettings} mapStyle={THEMES.light} sx={mapStyles} />,
  },
  {
    name: 'Geojson animation',
    component: (
      <MapGeoJSONAnimation {...baseSettings} mapStyle={THEMES.satelliteStreets} sx={mapStyles} />
    ),
  },
  {
    name: 'Clusters',
    component: <MapClusters {...baseSettings} mapStyle={THEMES.light} sx={mapStyles} />,
  },
  {
    name: 'Interaction',
    component: <MapInteraction {...baseSettings} mapStyle={THEMES.light} sx={mapStyles} />,
  },
  {
    name: 'Viewport animation',
    component: (
      <MapViewportAnimation
        {...baseSettings}
        data={CITIES.filter((city) => city.state === 'Texas')}
        mapStyle={THEMES.light}
        sx={mapStyles}
      />
    ),
  },
  {
    name: 'Highlight by filter',
    component: <MapHighlightByFilter {...baseSettings} mapStyle={THEMES.light} sx={mapStyles} />,
  },
  {
    name: 'Heatmap',
    component: <MapHeatmap {...baseSettings} mapStyle={THEMES.light} sx={mapStyles} />,
  },
  {
    name: 'Side by side',
    component: <MapSideBySide {...baseSettings} sx={mapStyles} />,
  },
];

// ----------------------------------------------------------------------

export function MapView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Map',
        moreLinks: [
          'http://visgl.github.io/react-map-gl',
          'http://visgl.github.io/react-map-gl/examples',
        ],
      }}
    />
  );
}
