import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { DataGridView } from 'src/sections/_examples/mui/data-grid-view';

// ----------------------------------------------------------------------

const metadata = { title: `DataGrid | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DataGridView />
    </>
  );
}
