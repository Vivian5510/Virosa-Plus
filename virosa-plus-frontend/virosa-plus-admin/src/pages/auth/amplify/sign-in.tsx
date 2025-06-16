import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AmplifySignInView } from 'src/auth/view/amplify';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AmplifySignInView />
    </>
  );
}
