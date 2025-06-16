import type { Theme, SxProps } from '@mui/material/styles';

import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Map, MapPopup, MapMarker, MapControls } from 'src/components/map';

// ----------------------------------------------------------------------

type ContactMapProps = {
  sx?: SxProps<Theme>;
  contacts: {
    latlng: number[];
    address: string;
    phoneNumber: string;
  }[];
};

export function ContactMap({ contacts, sx }: ContactMapProps) {
  const theme = useTheme();

  const [popupInfo, setPopupInfo] = useState<ContactMapProps['contacts'][0] | null>(null);

  return (
    <Map
      initialViewState={{ latitude: 12, longitude: 42, zoom: 2 }}
      mapStyle={`mapbox://styles/mapbox/${theme.palette.mode === 'light' ? 'light' : 'dark'}-v10`}
      sx={[
        () => ({
          borderRadius: 1.5,
          height: { xs: 320, md: 560 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <MapControls hideGeolocate />

      {contacts.map((country, index) => (
        <MapMarker
          key={`marker-${index}`}
          latitude={country.latlng[0]}
          longitude={country.latlng[1]}
          onClick={(event) => {
            event.originalEvent.stopPropagation();
            setPopupInfo(country);
          }}
        />
      ))}

      {popupInfo && (
        <MapPopup
          longitude={popupInfo.latlng[1]}
          latitude={popupInfo.latlng[0]}
          onClose={() => setPopupInfo(null)}
        >
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Address
          </Typography>

          <Typography component="div" variant="caption">
            {popupInfo.address}
          </Typography>

          <Typography
            component="div"
            variant="caption"
            sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
          >
            <Iconify icon="solar:phone-bold" width={14} sx={{ mr: 0.5 }} />
            {popupInfo.phoneNumber}
          </Typography>
        </MapPopup>
      )}
    </Map>
  );
}
