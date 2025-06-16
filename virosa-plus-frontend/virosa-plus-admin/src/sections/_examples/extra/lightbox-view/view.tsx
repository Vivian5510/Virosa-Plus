import type { Slide, SlideImage, SlideVideo } from 'yet-another-react-lightbox';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { _mock } from 'src/_mock';

import { Lightbox, useLightBox } from 'src/components/lightbox';

import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const IMAGES = Array.from({ length: 4 }, (_, index) => ({
  src: _mock.image.cover(index + 1),
  title: 'Flamingo',
  description: 'Vicko Mozara \n Veliki zali, Dubravica, Croatia',
}));

const slides: Slide[] = [
  ...IMAGES,
  {
    type: 'video',
    width: 1280,
    height: 720,
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    sources: [
      {
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4',
      },
    ],
  },
];

// ----------------------------------------------------------------------

export function LightboxView() {
  const lightbox = useLightBox(slides);

  const [state, setState] = useState({
    disableZoom: false,
    disableVideo: false,
    disableTotal: false,
    disableCaptions: false,
    disableSlideshow: false,
    disableThumbnails: false,
    disableFullscreen: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <ComponentLayout
        heroProps={{
          heading: 'Lightbox',
          moreLinks: ['https://www.npmjs.com/package/yet-another-react-lightbox'],
        }}
      >
        <Card sx={{ p: 1, gap: 2, display: 'flex', alignItems: 'flex-start' }}>
          <Box
            sx={{
              gap: 1,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {slides.map((slide) => {
              const thumbnail =
                slide.type === 'video' ? (slide as SlideVideo).poster : (slide as SlideImage).src;

              return (
                <Box
                  component="img"
                  key={thumbnail}
                  alt={thumbnail}
                  src={thumbnail}
                  onClick={() => lightbox.onOpen(`${thumbnail}`)}
                  sx={{
                    width: 240,
                    borderRadius: 1,
                    cursor: 'pointer',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                  }}
                />
              );
            })}
          </Box>

          <Box
            sx={[
              () => ({
                p: 2.5,
                width: 220,
                flexShrink: 0,
                borderRadius: 1.5,
                bgcolor: 'background.neutral',
              }),
            ]}
          >
            <FormControl component="fieldset" variant="standard">
              <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                <FormLabel component="legend" sx={{ typography: 'body2' }}>
                  Controls
                </FormLabel>

                <FormControlLabel
                  label="Disable zoom"
                  control={
                    <Switch
                      size="small"
                      checked={state.disableZoom}
                      onChange={handleChange}
                      inputProps={{ id: 'disable-zoom-switch' }}
                    />
                  }
                />

                <FormControlLabel
                  label="Disable total"
                  control={
                    <Switch
                      size="small"
                      checked={state.disableTotal}
                      onChange={handleChange}
                      inputProps={{ id: 'disable-info-total-switch' }}
                    />
                  }
                />

                <FormControlLabel
                  label="Disable video"
                  control={
                    <Switch
                      size="small"
                      checked={state.disableVideo}
                      onChange={handleChange}
                      inputProps={{ id: 'disable-video-switch' }}
                    />
                  }
                />

                <FormControlLabel
                  label="Disable captions"
                  control={
                    <Switch
                      size="small"
                      checked={state.disableCaptions}
                      onChange={handleChange}
                      inputProps={{ id: 'disable-caption-switch' }}
                    />
                  }
                />

                <FormControlLabel
                  label="Disable slideshow"
                  control={
                    <Switch
                      size="small"
                      checked={state.disableSlideshow}
                      onChange={handleChange}
                      inputProps={{ id: 'disable-slideshow-switch' }}
                    />
                  }
                />

                <FormControlLabel
                  label="Disable thumbnails"
                  control={
                    <Switch
                      size="small"
                      checked={state.disableThumbnails}
                      onChange={handleChange}
                      inputProps={{ id: 'disable-thumbnails-switch' }}
                    />
                  }
                />

                <FormControlLabel
                  label="Disable fullscreen"
                  control={
                    <Switch
                      size="small"
                      checked={state.disableFullscreen}
                      onChange={handleChange}
                      inputProps={{ id: 'disable-fullscreen-switch' }}
                    />
                  }
                />
              </Box>
            </FormControl>
          </Box>
        </Card>
      </ComponentLayout>

      <Lightbox
        open={lightbox.open}
        close={lightbox.onClose}
        slides={slides}
        index={lightbox.selected}
        disableZoom={state.disableZoom}
        disableTotal={state.disableTotal}
        disableVideo={state.disableVideo}
        disableCaptions={state.disableCaptions}
        disableSlideshow={state.disableSlideshow}
        disableThumbnails={state.disableThumbnails}
        disableFullscreen={state.disableFullscreen}
      />
    </>
  );
}
