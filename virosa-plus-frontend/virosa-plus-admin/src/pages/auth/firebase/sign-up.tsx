import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { FirebaseSignUpView } from 'src/auth/view/firebase';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Firebase - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <FirebaseSignUpView />
    </>
  );
}
