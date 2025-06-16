import type { Theme, SxProps } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { Scrollbar } from 'src/components/scrollbar';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
};

// ----------------------------------------------------------------------

export function ScrollProgressView() {
  const pageProgress = useScrollProgress();
  const containerProgress1 = useScrollProgress('container');
  const containerProgress2 = useScrollProgress('container');

  const DEMO_COMPONENTS = [
    {
      name: 'Container scroll-y',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          <ScrollProgress
            color="info"
            variant="circular"
            size={40}
            thickness={2}
            progress={containerProgress1.scrollYProgress}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          />

          <ScrollProgress
            variant="linear"
            color="info"
            progress={containerProgress1.scrollYProgress}
          />

          <Scrollbar ref={containerProgress1.elementRef} sx={{ height: 480 }}>
            <Stack spacing={3}>
              {Array.from({ length: 12 }, (_, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={[
                    (theme) => ({
                      width: 1,
                      height: 160,
                      flexShrink: 0,
                      borderRadius: 1.5,
                      display: 'flex',
                      typography: 'h2',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
                    }),
                  ]}
                >
                  {index + 1}
                </Paper>
              ))}
            </Stack>
          </Scrollbar>
        </ComponentBox>
      ),
    },
    {
      name: 'Container scroll-x',
      component: (
        <ComponentBox sx={componentBoxStyles}>
          <ScrollProgress
            whenScroll="x"
            color="inherit"
            variant="circular"
            size={40}
            thickness={2}
            progress={containerProgress2.scrollXProgress}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          />

          <ScrollProgress
            whenScroll="x"
            variant="linear"
            color="inherit"
            progress={containerProgress2.scrollXProgress}
          />

          <Scrollbar ref={containerProgress2.elementRef}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: 24 }, (_, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={[
                    (theme) => ({
                      width: 200,
                      flexShrink: 0,
                      borderRadius: 1.5,
                      display: 'flex',
                      typography: 'h2',
                      aspectRatio: '9/16',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
                    }),
                  ]}
                >
                  {index + 1}
                </Paper>
              ))}
            </Box>
          </Scrollbar>
        </ComponentBox>
      ),
    },
    {
      name: 'Scroll document',
      component: (
        <>
          <ScrollProgress
            portal
            size={6}
            color="info"
            variant="linear"
            progress={pageProgress.scrollYProgress}
            sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
          />

          <ComponentBox
            sx={{
              minHeight: 2000,
              typography: 'h6',
              textAlign: 'center',
              alignItems: 'flex-start',
            }}
          >
            👇 Scroll down document
          </ComponentBox>
        </>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Scroll progress',
        moreLinks: ['https://www.framer.com/motion'],
      }}
    />
  );
}
