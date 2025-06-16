import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { SliderView } from 'src/sections/_examples/mui/slider-view';

// ----------------------------------------------------------------------

const metadata = { title: `Slider | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SliderView />
    </>
  );
}
