import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { MapView } from 'src/sections/_examples/extra/map-view';

// ----------------------------------------------------------------------

const metadata = { title: `Map | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MapView />
    </>
  );
}
