import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { TabsView } from 'src/sections/_examples/mui/tabs-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tabs | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TabsView />
    </>
  );
}
