import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { AutocompleteView } from 'src/sections/_examples/mui/autocomplete-view';

// ----------------------------------------------------------------------

const metadata = { title: `Autocomplete | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AutocompleteView />
    </>
  );
}
