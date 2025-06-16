import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SnackbarView } from 'src/sections/_examples/extra/snackbar-view';

// ----------------------------------------------------------------------

const metadata = { title: `Snackbar | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SnackbarView />
    </>
  );
}
