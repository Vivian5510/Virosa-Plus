import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { LabelView } from 'src/sections/_examples/extra/label-view';

// ----------------------------------------------------------------------

const metadata = { title: `Label | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <LabelView />
    </>
  );
}
