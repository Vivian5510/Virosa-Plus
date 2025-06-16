import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AmplifySignUpView } from 'src/auth/view/amplify';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AmplifySignUpView />
    </>
  );
}
