import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ColorsView } from 'src/sections/_examples/foundation/colors-view';

// ----------------------------------------------------------------------

const metadata = { title: `Colors | Foundations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ColorsView />
    </>
  );
}
