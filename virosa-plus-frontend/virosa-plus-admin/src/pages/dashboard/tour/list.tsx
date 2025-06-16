import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { TourListView } from 'src/sections/tour/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TourListView />
    </>
  );
}
