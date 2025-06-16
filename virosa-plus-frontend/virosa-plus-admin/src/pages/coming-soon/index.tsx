import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ComingSoonView } from 'src/sections/coming-soon/view';

// ----------------------------------------------------------------------

const metadata = { title: `Coming soon - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ComingSoonView />
    </>
  );
}
