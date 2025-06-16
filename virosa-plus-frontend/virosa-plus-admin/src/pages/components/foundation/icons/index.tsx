import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { IconsView } from 'src/sections/_examples/foundation/icons-view';

// ----------------------------------------------------------------------

const metadata = { title: `Icons | Foundations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <IconsView />
    </>
  );
}
