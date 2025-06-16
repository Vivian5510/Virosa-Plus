import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SplitVerifyView } from 'src/auth/view/auth-demo/split';

// ----------------------------------------------------------------------

const metadata = { title: `Verify | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SplitVerifyView />
    </>
  );
}
