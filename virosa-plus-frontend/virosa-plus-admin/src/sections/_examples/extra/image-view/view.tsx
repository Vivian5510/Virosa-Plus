import type { Theme, SxProps } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { _mock } from 'src/_mock';

import { Image } from 'src/components/image';

import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const RATIO = ['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1'] as const;

const IMAGES = RATIO.map((ratio, index) => ({ ratio, url: _mock.image.cover(index + 1) }));

const boxStyles: SxProps<Theme> = {
  gap: 2,
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(2, 1fr)',
    sm: 'repeat(3, 1fr)',
    md: 'repeat(4, 1fr)',
  },
};

const DEMO_COMPONENTS = [
  {
    name: 'List',
    component: (
      <Box sx={boxStyles}>
        {IMAGES.map((img) => (
          <Image
            key={img.ratio}
            alt={img.ratio}
            src={img.url}
            ratio="3/2"
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>
    ),
  },
  {
    name: 'Aspect ratio',
    component: (
      <Box sx={boxStyles}>
        {IMAGES.map((img) => (
          <Box
            key={img.ratio}
            sx={{
              gap: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {img.ratio}
            </Typography>

            <Tooltip title={img.ratio} placement="top">
              <Image alt={img.ratio} src={img.url} ratio={img.ratio} sx={{ borderRadius: 2 }} />
            </Tooltip>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    name: 'Overlay',
    component: (
      <Box sx={boxStyles}>
        <Image
          alt="1/1"
          ratio="1/1"
          src={IMAGES[0].url}
          sx={{ borderRadius: 2 }}
          slotProps={{
            overlay: {
              sx: (theme) => ({
                bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
              }),
            },
          }}
        />

        <Image
          alt="1/1"
          ratio="1/1"
          src={IMAGES[1].url}
          sx={{ borderRadius: 2 }}
          slotProps={{
            overlay: {
              sx: (theme) => ({
                backgroundImage: `linear-gradient(to bottom, transparent, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.8)})`,
              }),
            },
          }}
        />

        <Image
          alt="1/1"
          ratio="1/1"
          src={IMAGES[1].url}
          sx={{ borderRadius: 2 }}
          slotProps={{
            overlay: {
              sx: (theme) => ({
                backgroundImage: `linear-gradient(to top, ${varAlpha(theme.vars.palette.secondary.mainChannel, 0.24)}, ${varAlpha(theme.vars.palette.info.mainChannel, 0.8)})`,
              }),
            },
          }}
        />

        <Image
          alt="1/1"
          ratio="1/1"
          src={IMAGES[1].url}
          sx={{ borderRadius: 2 }}
          slotProps={{
            overlay: {
              sx: (theme) => ({
                backgroundImage: `linear-gradient(to top, ${varAlpha(theme.vars.palette.error.mainChannel, 0.24)}, ${varAlpha(theme.vars.palette.success.mainChannel, 0.8)})`,
              }),
            },
          }}
        />
      </Box>
    ),
  },
];

// ----------------------------------------------------------------------

export function ImageView() {
  return <ComponentLayout sectionData={DEMO_COMPONENTS} heroProps={{ heading: 'Image' }} />;
}
