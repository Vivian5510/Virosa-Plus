import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { CenteredVerifyView } from 'src/auth/view/auth-demo/centered';

// ----------------------------------------------------------------------

const metadata = { title: `Verify | Layout centered - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CenteredVerifyView />
    </>
  );
}
