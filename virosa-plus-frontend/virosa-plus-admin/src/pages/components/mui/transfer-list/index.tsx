import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { TransferListView } from 'src/sections/_examples/mui/transfer-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Transfer list | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransferListView />
    </>
  );
}
