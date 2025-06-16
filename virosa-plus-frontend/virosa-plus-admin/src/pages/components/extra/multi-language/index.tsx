import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { MultiLanguageView } from 'src/sections/_examples/extra/multi-language-view';

// ----------------------------------------------------------------------

const metadata = { title: `Multi language | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MultiLanguageView />
    </>
  );
}
