import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ScrollProgressView } from 'src/sections/_examples/extra/scroll-progress-view';

// ----------------------------------------------------------------------

const metadata = { title: `Scroll progress | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ScrollProgressView />
    </>
  );
}
