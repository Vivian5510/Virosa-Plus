import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { MenuView } from 'src/sections/_examples/mui/menu-view';

// ----------------------------------------------------------------------

const metadata = { title: `Menu | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MenuView />
    </>
  );
}
