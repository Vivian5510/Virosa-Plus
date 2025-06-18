import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { DirectoryView } from 'src/sections/directory/view';

// ----------------------------------------------------------------------

const metadata = { title: `目录管理 | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <DirectoryView />
    </>
  );
}
