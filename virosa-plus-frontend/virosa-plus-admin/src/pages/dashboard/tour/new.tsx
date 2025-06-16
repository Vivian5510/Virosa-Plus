import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { TourCreateView } from 'src/sections/tour/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new tour | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TourCreateView />
    </>
  );
}
