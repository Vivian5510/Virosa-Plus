import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { GridView } from 'src/sections/_examples/foundation/grid-view';

// ----------------------------------------------------------------------

const metadata = { title: `Grid | Foundations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <GridView />
    </>
  );
}
