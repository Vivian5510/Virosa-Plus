import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AvatarView } from 'src/sections/_examples/mui/avatar-view';

// ----------------------------------------------------------------------

const metadata = { title: `Avatar | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AvatarView />
    </>
  );
}
