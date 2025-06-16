import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { DatePickersView } from 'src/sections/_examples/mui/date-pickers-view';

// ----------------------------------------------------------------------

const metadata = { title: `Date pickers | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DatePickersView />
    </>
  );
}
