import type { PaperProps } from '@mui/material/Paper';
import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const boxStyles: SxProps<Theme> = {
  gap: 3,
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
  },
};

// ----------------------------------------------------------------------

export function ShadowsView() {
  const theme = useTheme();

  const SYSTEM = theme.vars.shadows.slice(1, theme.vars.shadows.length);

  const CUSTOMS = [
    ['z1', theme.vars.customShadows.z1],
    ['z4', theme.vars.customShadows.z4],
    ['z8', theme.vars.customShadows.z8],
    ['z12', theme.vars.customShadows.z12],
    ['z16', theme.vars.customShadows.z16],
    ['z20', theme.vars.customShadows.z20],
    ['z24', theme.vars.customShadows.z24],
    ['card', theme.vars.customShadows.card],
    ['dropdown', theme.vars.customShadows.dropdown],
    ['dialog', theme.vars.customShadows.dialog],
  ];

  const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

  const DEMO_COMPONENTS = [
    {
      name: 'System',
      description: 'Default shadows of Mui.',
      component: (
        <Box sx={{ ...boxStyles }}>
          {SYSTEM.map((shadow, index) => (
            <ShadowCard key={shadow} title={`z${index + 1}`} sx={{ boxShadow: shadow }} />
          ))}
        </Box>
      ),
    },
    {
      name: 'Customs',
      description: 'Extended shadows ​​are used in this template.',
      component: (
        <Box sx={{ ...boxStyles }}>
          {CUSTOMS.map((shadow) => (
            <ShadowCard key={shadow[0]} title={shadow[0]} sx={{ boxShadow: shadow[1] }} />
          ))}
        </Box>
      ),
    },
    {
      name: 'Colors',
      description: 'Extended shadows ​​are used in this template.',
      component: (
        <Box
          sx={{
            ...boxStyles,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            },
          }}
        >
          {COLORS.map((color) => (
            <Box
              key={color}
              sx={{
                gap: 1,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                },
              }}
            >
              <ShadowCard
                title={color}
                sx={{
                  color: theme.vars.palette[color].contrastText,
                  bgcolor: theme.vars.palette[color].main,
                  boxShadow: theme.vars.customShadows[color],
                }}
              />

              <ShadowCard
                title={color}
                sx={{
                  color: theme.vars.palette[color].dark,
                  boxShadow: theme.vars.customShadows[color],
                }}
              />
            </Box>
          ))}
        </Box>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Shadows',
      }}
    />
  );
}

// ----------------------------------------------------------------------

function ShadowCard({ sx, title }: PaperProps) {
  return (
    <Paper
      sx={[
        () => ({
          p: 3,
          minHeight: 120,
          display: 'flex',
          alignItems: 'center',
          typography: 'subtitle2',
          justifyContent: 'center',
          textTransform: 'capitalize',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {title}
    </Paper>
  );
}
