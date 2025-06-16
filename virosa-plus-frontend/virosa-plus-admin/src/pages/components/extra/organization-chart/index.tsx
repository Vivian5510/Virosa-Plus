import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { OrganizationalChartView } from 'src/sections/_examples/extra/organizational-chart-view';

// ----------------------------------------------------------------------

const metadata = { title: `Organizational chart | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrganizationalChartView />
    </>
  );
}
