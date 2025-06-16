import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AnimateView } from 'src/sections/_examples/extra/animate-view';

// ----------------------------------------------------------------------

const metadata = { title: `Animate | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AnimateView />
    </>
  );
}
