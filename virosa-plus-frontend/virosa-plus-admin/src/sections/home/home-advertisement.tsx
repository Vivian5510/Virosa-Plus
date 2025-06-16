import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function HomeAdvertisement({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      sx={[{ position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative', zIndex: 9 }}>
          <Box
            sx={(theme) => ({
              ...theme.mixins.bgGradient({
                images: [
                  `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
                  `linear-gradient(90deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.04)} 1px, transparent 1px)`,
                ],
                sizes: ['36px 36px'],
                repeats: ['repeat'],
              }),
              py: 8,
              px: 5,
              spacing: 5,
              borderRadius: 3,
              display: 'flex',
              overflow: 'hidden',
              bgcolor: 'grey.900',
              position: 'relative',
              alignItems: 'center',
              textAlign: { xs: 'center', md: 'left' },
              flexDirection: { xs: 'column', md: 'row' },
              border: `solid 1px ${theme.vars.palette.grey[800]}`,
            })}
          >
            {renderImage()}
            {renderDescription()}
            {renderBlur()}
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <FloatPlusIcon sx={{ left: 72, top: '50%', mt: -1 }} />
    <FloatLine vertical sx={{ top: 0, left: 80, height: 'calc(50% + 64px)' }} />
    <FloatLine sx={{ top: '50%', left: 0 }} />
  </>
);

const renderDescription = () => (
  <Stack spacing={5} sx={{ zIndex: 9 }}>
    <Box
      component={m.h2}
      variants={varFade('inDown', { distance: 24 })}
      sx={{
        m: 0,
        color: 'common.white',
        typography: { xs: 'h2', md: 'h1' },
      }}
    >
      Get started with
      <br /> Minimal kit
      <Box
        component="span"
        sx={(theme) => ({
          ...theme.mixins.textGradient(
            `to right, ${theme.vars.palette.common.white}, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.4)}`
          ),
          ml: 1,
        })}
      >
        today
      </Box>
    </Box>

    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', md: 'flex-start' },
      }}
    >
      <m.div variants={varFade('inRight', { distance: 24 })}>
        <Button
          color="primary"
          size="large"
          variant="contained"
          target="_blank"
          rel="noopener"
          href={paths.minimalStore}
        >
          Purchase now
        </Button>
      </m.div>

      <m.div variants={varFade('inRight', { distance: 24 })}>
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          target="_blank"
          rel="noopener"
          href={paths.freeUI}
          startIcon={<Iconify width={16} icon="eva:external-link-fill" sx={{ mr: 0.5 }} />}
          sx={{
            color: 'common.white',
            borderColor: 'common.white',
            '&:hover': { borderColor: 'currentColor' },
          }}
        >
          Get free version
        </Button>
      </m.div>
    </Box>
  </Stack>
);

const renderImage = () => (
  <m.div variants={varFade('inUp')}>
    <Box
      component={m.img}
      animate={{ y: [-20, 0, -20] }}
      transition={{ duration: 4, repeat: Infinity }}
      alt="Rocket"
      src={`${CONFIG.assetsDir}/assets/illustrations/illustration-rocket-large.webp`}
      sx={{
        zIndex: 9,
        width: 360,
        aspectRatio: '1/1',
        position: 'relative',
      }}
    />
  </m.div>
);

const renderBlur = () => (
  <Box
    component="span"
    sx={(theme) => ({
      top: 0,
      right: 0,
      zIndex: 7,
      width: 1,
      opacity: 0.4,
      maxWidth: 420,
      aspectRatio: '1/1',
      position: 'absolute',
      backgroundImage: `radial-gradient(farthest-side at top right, ${theme.vars.palette.grey[500]} 0%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)} 75%, transparent 90%)`,
    })}
  />
);
