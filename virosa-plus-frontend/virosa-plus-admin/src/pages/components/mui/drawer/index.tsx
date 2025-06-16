import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { DrawerView } from 'src/sections/_examples/mui/drawer-view';

// ----------------------------------------------------------------------

const metadata = { title: `Drawer | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DrawerView />
    </>
  );
}
