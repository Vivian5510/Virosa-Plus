import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { TypographyView } from 'src/sections/_examples/foundation/typography-view';

// ----------------------------------------------------------------------

const metadata = { title: `Typography | Foundations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TypographyView />
    </>
  );
}
