import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { KanbanView } from 'src/sections/kanban/view';

// ----------------------------------------------------------------------

const metadata = { title: `Kanban | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <KanbanView />
    </>
  );
}
