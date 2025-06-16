import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ShadowsView } from 'src/sections/_examples/foundation/shadows-view';

// ----------------------------------------------------------------------

const metadata = { title: `Shadows | Foundations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ShadowsView />
    </>
  );
}
