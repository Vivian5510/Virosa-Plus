import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { _tours } from 'src/_mock/_tour';
import { CONFIG } from 'src/global-config';

import { TourEditView } from 'src/sections/tour/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentTour = _tours.find((tour) => tour.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TourEditView tour={currentTour} />
    </>
  );
}
