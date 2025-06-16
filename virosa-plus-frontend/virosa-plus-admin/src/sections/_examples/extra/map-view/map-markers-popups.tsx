import type { MapProps } from 'src/components/map';

import { useState } from 'react';

import Box from '@mui/material/Box';

import { Image } from 'src/components/image';
import { FlagIcon } from 'src/components/flag-icon';
import { Map, MapPopup, MapMarker, MapControls } from 'src/components/map';

// ----------------------------------------------------------------------

type CountryProps = {
  name: string;
  capital: string;
  latlng: number[];
  photoUrl: string;
  timezones: string[];
  country_code: string;
};

type Props = MapProps & {
  data: CountryProps[];
};

export function MapMarkersPopups({ data, sx, ...other }: Props) {
  const [popupInfo, setPopupInfo] = useState<CountryProps | null>(null);

  return (
    <Map initialViewState={{ zoom: 2 }} sx={sx} {...other}>
      <MapControls />

      {data.map((city, index) => (
        <MapMarker
          key={`marker-${index}`}
          latitude={city.latlng[0]}
          longitude={city.latlng[1]}
          onClick={(event) => {
            event.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        />
      ))}

      {popupInfo && (
        <MapPopup
          latitude={popupInfo.latlng[0]}
          longitude={popupInfo.latlng[1]}
          onClose={() => setPopupInfo(null)}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                mb: 1,
                gap: 0.75,
                display: 'flex',
                alignItems: 'center',
                typography: 'subtitle2',
              }}
            >
              <FlagIcon code={popupInfo.country_code} />
              {popupInfo.name}
            </Box>

            <Box component="span" sx={{ typography: 'caption' }}>
              Timezones: {popupInfo.timezones}
            </Box>

            <Box component="span" sx={{ typography: 'caption' }}>
              Lat: {popupInfo.latlng[0]}
            </Box>

            <Box component="span" sx={{ typography: 'caption' }}>
              Long: {popupInfo.latlng[1]}
            </Box>

            <Image
              alt={popupInfo.name}
              src={popupInfo.photoUrl}
              ratio="4/3"
              sx={{ mt: 1, borderRadius: 1 }}
            />
          </Box>
        </MapPopup>
      )}
    </Map>
  );
}
