import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { TooltipView } from 'src/sections/_examples/mui/tooltip-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tooltip | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TooltipView />
    </>
  );
}
