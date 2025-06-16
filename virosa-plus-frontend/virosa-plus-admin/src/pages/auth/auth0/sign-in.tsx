import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { Auth0SignInView } from 'src/auth/view/auth0';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Auth0 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Auth0SignInView />
    </>
  );
}
