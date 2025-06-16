import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { varFade, MotionContainer } from 'src/components/animate';

import { ComponentCard, ComponentLayout } from './layout';
import { allComponents } from './layout/nav-config-components';

// ----------------------------------------------------------------------

export function ComponentsView() {
  return (
    <ComponentLayout
      heroProps={{
        sx: { py: 15 },
        overrideContent: (
          <MotionContainer sx={{ textAlign: 'center' }}>
            <m.div variants={varFade('inUp', { distance: 24 })}>
              <Typography variant="h3" component="h1">
                Components
              </Typography>
            </m.div>

            <m.div variants={varFade('inUp', { distance: 24 })}>
              <Typography sx={{ color: 'text.secondary', mt: 3 }}>
                With huge resource pack making deployment easy and expanding more effectively
              </Typography>
            </m.div>
          </MotionContainer>
        ),
      }}
    >
      <Stack divider={<Divider sx={{ borderStyle: 'dashed', my: 8 }} />}>
        {allComponents.map((section) => (
          <section key={section.title}>
            {renderDescription(section.title as 'Foundation' | 'MUI' | 'Extra')}
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2.5,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(5, 1fr)',
                },
              }}
            >
              {section.items.map((item) => (
                <ComponentCard key={item.name} item={item} />
              ))}
            </Box>
          </section>
        ))}
      </Stack>
    </ComponentLayout>
  );
}

// ----------------------------------------------------------------------

const renderDescription = (sectionTitle: 'Foundation' | 'MUI' | 'Extra') => {
  const descriptions = {
    Foundation: (
      <>
        <Typography variant="h5">{sectionTitle}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Colors, typography, shadows…
        </Typography>
      </>
    ),
    MUI: (
      <>
        <Typography variant="h5">MUI</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Components from{' '}
          <Link href="https://mui.com/components/" target="_blank" rel="noopener">
            Material UI
          </Link>
          .
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          <i>
            Some advanced components from MUI X will not be included. So you need to purchase a
            separate
            <Link href="https://mui.com/pricing/" target="_blank" rel="noopener" sx={{ ml: 0.5 }}>
              license
            </Link>
            .
          </i>
        </Typography>
      </>
    ),
    Extra: (
      <>
        <Typography variant="h5">Extra Components</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Some custom components / use 3rd party dependencies (chart, map, editor…).
        </Typography>
      </>
    ),
  };

  return (
    <Box sx={{ mb: 3, gap: 1, display: 'flex', flexDirection: 'column' }}>
      {descriptions[sectionTitle]}
    </Box>
  );
};
