import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { UtilitiesView } from 'src/sections/_examples/extra/utilities-view';

// ----------------------------------------------------------------------

const metadata = { title: `Utilities | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UtilitiesView />
    </>
  );
}
