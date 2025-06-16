import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SplitUpdatePasswordView } from 'src/auth/view/auth-demo/split';

// ----------------------------------------------------------------------

const metadata = { title: `Update password | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SplitUpdatePasswordView />
    </>
  );
}
