import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { CheckboxView } from 'src/sections/_examples/mui/checkbox-view';

// ----------------------------------------------------------------------

const metadata = { title: `Checkbox | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CheckboxView />
    </>
  );
}
