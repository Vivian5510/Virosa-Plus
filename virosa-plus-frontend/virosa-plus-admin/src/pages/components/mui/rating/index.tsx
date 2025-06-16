import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { RatingView } from 'src/sections/_examples/mui/rating-view';

// ----------------------------------------------------------------------

const metadata = { title: `Rating | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RatingView />
    </>
  );
}
