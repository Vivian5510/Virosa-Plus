import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { PermissionDeniedView } from 'src/sections/permission/view';

// ----------------------------------------------------------------------

const metadata = { title: `Permission | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PermissionDeniedView />
    </>
  );
}
