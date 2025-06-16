import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { varFade, AnimateBorder, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

export function HomeForDesigner({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'grey.700',
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(135deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)} 0%, ${theme.vars.palette.grey[900]} 75%)`,
              `url(${CONFIG.assetsDir}/assets/images/home/for-designer.webp)`,
            ],
          }),
          [theme.breakpoints.up('md')]: {
            ...theme.mixins.bgGradient({
              images: [`url(${CONFIG.assetsDir}/assets/images/home/for-designer.webp)`],
              sizes: ['auto 92%'],
            }),
            minHeight: 720,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        <Stack
          spacing={5}
          sx={[
            (theme) => ({
              px: 2,
              py: 15,
              zIndex: 1,
              alignItems: 'center',
              [theme.breakpoints.up('md')]: {
                px: 8,
                py: 0,
                top: 0,
                left: 0,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: 'calc(50% + 16px)',
                height: 'calc(50% + 16px)',
              },
            }),
          ]}
        >
          <SectionTitle
            caption="professional kit"
            title="For designer"
            description="Use variables and variants to save time and energy on designs, design systems."
            sx={[
              () => ({
                zIndex: 1,
                textAlign: { xs: 'center', md: 'left' },
                alignItems: { xs: 'center', md: 'flex-start' },
              }),
            ]}
            slotProps={{
              caption: {
                sx: [
                  (theme) => ({
                    ...theme.mixins.textGradient(
                      `to right, ${theme.vars.palette.common.white}, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.2)}`
                    ),
                  }),
                ],
              },
              title: {
                sx: [
                  (theme) => ({
                    ...theme.mixins.textGradient(
                      `135deg, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main}`
                    ),
                  }),
                ],
              },
              description: { sx: { maxWidth: 320, color: 'common.white' } },
            }}
          />

          <Box
            component={m.div}
            variants={varFade('inLeft', { distance: 24 })}
            sx={{ alignSelf: { md: 'flex-end' } }}
          >
            {renderActionButton()}
          </Box>
        </Stack>

        {renderTopBorder()}
        {renderBottomBorder()}
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

const renderActionButton = () => (
  <AnimateBorder
    sx={{ borderRadius: 1.25 }}
    duration={12}
    slotProps={{
      outlineColor: (theme) =>
        `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.04)}, ${varAlpha(theme.vars.palette.warning.mainChannel, 0.04)})`,
      primaryBorder: {
        size: 50,
        width: '1.5px',
        sx: (theme) => ({
          color: theme.vars.palette.primary.main,
        }),
      },
      secondaryBorder: {
        sx: (theme) => ({
          color: theme.vars.palette.warning.main,
        }),
      },
    }}
  >
    <Button
      size="large"
      color="primary"
      variant="text"
      target="_blank"
      rel="noopener"
      href={paths.figmaUrl}
      endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
      sx={{ px: 2, borderRadius: 'inherit' }}
    >
      Checkout workspace
    </Button>
  </AnimateBorder>
);

const renderTopBorder = () => (
  <AnimateBorder
    duration={32}
    slotProps={{
      outlineColor: (theme) => varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
      primaryBorder: {
        size: 300,
        width: '0 3px 3px 0',
        sx: (theme) => ({
          color: varAlpha(theme.vars.palette.primary.lightChannel, 0.8),
        }),
      },
      secondaryBorder: {
        sx: (theme) => ({
          color: varAlpha(theme.vars.palette.primary.lightChannel, 0.8),
        }),
      },
    }}
    sx={[
      (theme) => ({
        top: 0,
        left: 0,
        width: 'calc(50% + 16px)',
        height: 'calc(50% + 16px)',
        position: 'absolute',
        borderRadius: '0 0 24px 0',
        backgroundImage: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)} 0%, ${theme.vars.palette.grey[900]} 75%)`,
        display: { xs: 'none', md: 'block' },
      }),
    ]}
  />
);

const renderBottomBorder = () => (
  <AnimateBorder
    duration={32}
    slotProps={{
      outlineColor: (theme) => varAlpha(theme.vars.palette.common.whiteChannel, 0.08),
      primaryBorder: {
        size: 300,
        width: '3px 0 0 3px',
        sx: (theme) => ({
          color: varAlpha(theme.vars.palette.common.whiteChannel, 0.8),
        }),
      },
      secondaryBorder: {
        sx: (theme) => ({
          color: varAlpha(theme.vars.palette.common.whiteChannel, 0.8),
        }),
      },
    }}
    sx={[
      (theme) => ({
        right: 0,
        bottom: 0,
        position: 'absolute',
        width: 'calc(50% + 16px)',
        height: 'calc(50% + 16px)',
        borderRadius: '24px 0 0 0',
        bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
        display: { xs: 'none', md: 'block' },
      }),
    ]}
  />
);
