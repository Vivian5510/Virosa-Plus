import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SupabaseSignInView } from 'src/auth/view/supabase';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SupabaseSignInView />
    </>
  );
}
