import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AmplifyVerifyView } from 'src/auth/view/amplify';

// ----------------------------------------------------------------------

const metadata = { title: `Verify | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AmplifyVerifyView />
    </>
  );
}
