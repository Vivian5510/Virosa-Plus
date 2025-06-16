import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, CircleSvg, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <Stack
      spacing={8}
      sx={{
        top: 64,
        left: 80,
        alignItems: 'center',
        position: 'absolute',
        transform: 'translateX(-50%)',
      }}
    >
      <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
      <FloatTriangleDownIcon
        sx={{
          width: 30,
          height: 15,
          opacity: 0.24,
          position: 'static',
        }}
      />
    </Stack>

    <FloatLine vertical sx={{ top: 0, left: 80 }} />
  </>
);

export function HomeZoneUI({ sx, ...other }: BoxProps) {
  const renderDescription = () => (
    <SectionTitle
      caption="Looking For a"
      title="Landing page"
      txtGradient="template?"
      description="Fuse with dashboards to produce a superior product."
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    />
  );

  const renderImage = () => (
    <Stack
      component={m.div}
      variants={varFade('inDown', { distance: 24 })}
      sx={[
        (theme) => ({
          alignItems: 'flex-end',
          filter: `drop-shadow(0 24px 48px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)})`,
          ...theme.applyStyles('dark', {
            filter: `drop-shadow(0 24px 48px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)})`,
          }),
        }),
      ]}
    >
      <Box
        component="img"
        alt="Zone landing page"
        src={`${CONFIG.assetsDir}/assets/images/home/zone-landing.webp`}
        sx={[
          (theme) => ({
            width: 720,
            objectFit: 'cover',
            aspectRatio: '16/10',
            borderRadius: '16px 16px 0 16px',
            border: `solid 2px ${theme.vars.palette.common.white}`,
          }),
        ]}
      />

      <Box sx={{ p: 0.5, bgcolor: 'common.white', borderRadius: '0 0 8px 8px' }}>
        <Button
          variant="contained"
          target="_blank"
          rel="noopener"
          href={paths.zoneStore}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          sx={{
            color: 'grey.800',
            bgcolor: 'common.white',
            '&:hover': { bgcolor: 'common.white' },
          }}
        >
          Visit Zone UI
        </Button>
      </Box>
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[
        {
          pt: 10,
          position: 'relative',
          pb: { xs: 10, md: 20 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative' }}>
          <Grid container spacing={{ xs: 5, md: 8 }} sx={{ position: 'relative', zIndex: 9 }}>
            <Grid size={{ xs: 12, md: 6, lg: 5 }}>{renderDescription()}</Grid>
            <Grid size={{ xs: 12, md: 6, lg: 7 }}>{renderImage()}</Grid>
          </Grid>

          <CircleSvg variants={varFade('in')} sx={{ display: { xs: 'none', md: 'block' } }} />
        </Container>
      </MotionViewport>
    </Box>
  );
}
