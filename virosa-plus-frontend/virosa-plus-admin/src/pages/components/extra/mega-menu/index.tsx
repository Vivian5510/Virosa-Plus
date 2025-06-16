import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { MegaMenuView } from 'src/sections/_examples/extra/mega-menu-view';

// ----------------------------------------------------------------------

const metadata = { title: `Mega menu | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MegaMenuView />
    </>
  );
}
