import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { WalktourView } from 'src/sections/_examples/extra/walktour-view';

// ----------------------------------------------------------------------

const metadata = { title: `Walktour | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <WalktourView />
    </>
  );
}
