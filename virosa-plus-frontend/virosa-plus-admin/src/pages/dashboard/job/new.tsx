import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { JobCreateView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new job | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JobCreateView />
    </>
  );
}
