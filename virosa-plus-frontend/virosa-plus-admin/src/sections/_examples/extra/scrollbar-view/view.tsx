import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import { Scrollbar } from 'src/components/scrollbar';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  {
    name: 'Vertical',
    component: (
      <ComponentBox sx={{ py: 3, pr: 1 }}>
        <Scrollbar sx={[{ height: 320 }]}>
          Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi.
          Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu
          odio. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu
          turpis hendrerit fringilla. Phasellus consectetuer vestibulum elit. Phasellus magna.
          Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium libero. Nullam quis ante.
          Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus non, euismod id,
          nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis
          ullamcorper velit. Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent
          turpis. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a
          pretium mi sem ut ipsum. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi.
          Quisque ut nisi. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget,
          diam. Vestibulum eu odio. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras
          ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer vestibulum elit.
          Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium libero.
          Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus
          non, euismod id, nulla. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum.
          Morbi mattis ullamcorper velit. Vivamus consectetuer hendrerit lacus. Nullam quis ante.
          Praesent turpis. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim
          dolor, a pretium mi sem ut ipsum.
        </Scrollbar>
      </ComponentBox>
    ),
  },
  {
    name: 'Horizontal',
    component: (
      <ComponentBox>
        <Scrollbar sx={[{ height: 320 }]}>
          <Box sx={{ width: '150%' }}>
            Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi.
            Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu
            odio. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu
            turpis hendrerit fringilla. Phasellus consectetuer vestibulum elit. Phasellus magna.
            Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium libero. Nullam quis ante.
            Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus non, euismod id,
            nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis
            ullamcorper velit. Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent
            turpis. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a
            pretium mi sem ut ipsum. Donec mi odio, faucibus at, scelerisque quis, convallis in,
            nisi. Quisque ut nisi. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum
            eget, diam. Vestibulum eu odio. Proin sapien ipsum, porta a, auctor quis, euismod ut,
            mi. Cras ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer vestibulum
            elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium
            libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut,
            faucibus non, euismod id, nulla. Pellentesque habitant morbi tristique senectus et netus
            et malesuada fames ac turpis egestas. Fusce ac felis sit amet ligula pharetra
            condimentum. Morbi mattis ullamcorper velit. Vivamus consectetuer hendrerit lacus.
            Nullam quis ante. Praesent turpis. Praesent porttitor, nulla vitae posuere iaculis, arcu
            nisl dignissim dolor, a pretium mi sem ut ipsum.
          </Box>
        </Scrollbar>
      </ComponentBox>
    ),
  },
  {
    name: 'Layout',
    component: (
      <ComponentBox sx={{ p: 0, overflow: 'hidden' }}>
        <Box
          sx={{
            width: 1,
            height: 560,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              py: 2,
              px: 3,
              typography: 'subtitle2',
              bgcolor: 'text.primary',
              color: 'background.default',
            }}
          >
            Top
          </Box>

          <Box
            sx={{
              minHeight: 0,
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box
              sx={[
                (theme) => ({
                  p: 3,
                  typography: 'subtitle2',
                  flex: { xs: '0 0 72px', md: '0 0 160px' },
                  borderRight: { md: `solid 1px ${theme.vars.palette.divider}` },
                }),
              ]}
            >
              Left
            </Box>

            <Box
              sx={{
                minWidth: 0,
                minHeight: 0,
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                bgcolor: 'background.neutral',
              }}
            >
              <Alert severity="success" sx={{ borderRadius: 0 }}>
                Here is a gentle confirmation that your action was successful.
              </Alert>

              <Scrollbar sx={{ px: 3, py: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Vestibulum ante ipsum primis in
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi.
                  Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam.
                  Vestibulum eu odio. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras
                  ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer vestibulum
                  elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat
                  pretium libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci
                  lectus, aliquam ut, faucibus non, euismod id, nulla. Pellentesque habitant morbi
                  tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ac felis
                  sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit. Vivamus
                  consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. Praesent
                  porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi
                  sem ut ipsum. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi.
                  Quisque ut nisi.
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam.
                  Vestibulum eu odio. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras
                  ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer vestibulum
                  elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat
                  pretium libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci
                  lectus, aliquam ut, faucibus non, euismod id, nulla. Pellentesque habitant morbi
                  tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ac felis
                  sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit. Vivamus
                  consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. Praesent
                  porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi
                  sem ut ipsum.
                </Typography>

                <Paper variant="outlined" sx={{ width: 1, aspectRatio: '16/9' }} />
              </Scrollbar>
            </Box>

            <Box
              sx={[
                (theme) => ({
                  p: 3,
                  typography: 'subtitle2',
                  flex: { xs: '0 0 72px', md: '0 0 160px' },
                  borderLeft: { md: `solid 1px ${theme.vars.palette.divider}` },
                }),
              ]}
            >
              Right
            </Box>
          </Box>

          <Box
            sx={[
              (theme) => ({
                py: 2,
                px: 3,
                typography: 'subtitle2',
                borderTop: `solid 1px ${theme.vars.palette.divider}`,
              }),
            ]}
          >
            Bottom
          </Box>
        </Box>
      </ComponentBox>
    ),
  },
];

export function ScrollbarView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Scrollbar',
        moreLinks: ['https://grsmto.github.io/simplebar/'],
      }}
    />
  );
}
