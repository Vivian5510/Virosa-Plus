import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { EditorView } from 'src/sections/_examples/extra/editor-view';

// ----------------------------------------------------------------------

const metadata = { title: `Editor | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EditorView />
    </>
  );
}
