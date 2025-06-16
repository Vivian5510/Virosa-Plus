import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { TextfieldView } from 'src/sections/_examples/mui/textfield-view';

// ----------------------------------------------------------------------

const metadata = { title: `Textfield | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TextfieldView />
    </>
  );
}
