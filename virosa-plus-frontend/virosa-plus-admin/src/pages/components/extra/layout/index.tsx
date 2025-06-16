import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { LayoutView } from 'src/sections/_examples/extra/layout-view';

// ----------------------------------------------------------------------

const metadata = { title: `Layout | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <LayoutView />
    </>
  );
}
