import type { LngLat } from 'react-map-gl';

import Typography from '@mui/material/Typography';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

const EVENT_NAMES = ['onDragStart', 'onDrag', 'onDragEnd'] as const;

function round(value: number) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

// ----------------------------------------------------------------------

type MapControlPanel = {
  events: Record<string, LngLat>;
};

export function MapControlPanel({ events = {} }: MapControlPanel) {
  return (
    <ControlPanelRoot>
      {EVENT_NAMES.map((event) => {
        const lngLat = events[event];

        return (
          <div key={event}>
            <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
              {event}:
            </Typography>

            {lngLat ? (
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                {`${round(lngLat.lng)}, ${round(lngLat.lat)}`}
              </Typography>
            ) : (
              <Typography variant="body2" component="em" sx={{ color: 'error.main' }}>
                null
              </Typography>
            )}
          </div>
        );
      })}
    </ControlPanelRoot>
  );
}
