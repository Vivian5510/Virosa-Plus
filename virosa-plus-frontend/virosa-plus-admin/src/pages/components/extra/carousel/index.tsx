import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { CarouselView } from 'src/sections/_examples/extra/carousel-view';

// ----------------------------------------------------------------------

const metadata = { title: `Carousel | Components - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CarouselView />
    </>
  );
}
