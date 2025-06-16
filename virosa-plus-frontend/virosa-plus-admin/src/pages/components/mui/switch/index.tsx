import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SwitchView } from 'src/sections/_examples/mui/switch-view';

// ----------------------------------------------------------------------

const metadata = { title: `Switch | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SwitchView />
    </>
  );
}
