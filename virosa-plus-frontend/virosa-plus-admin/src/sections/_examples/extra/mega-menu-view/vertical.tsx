import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { MegaMenuVertical } from 'src/components/mega-menu';

import { MEGA_MENU_ITEMS } from './data';

// ----------------------------------------------------------------------

export function DemoMegaMenuVertical() {
  const renderNav = () => (
    <Paper variant="outlined" sx={{ borderRadius: 1.5 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Vertical menu
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <MegaMenuVertical
        data={MEGA_MENU_ITEMS}
        cssVars={{
          '--nav-item-gap': '8px',
          '--nav-width': '260px',
          '--nav-dropdown-width': '900px',
        }}
        slotProps={{
          rootItem: {
            sx: {},
            icon: {},
            title: { fontFamily: (theme) => theme.typography.fontSecondaryFamily },
            info: {},
            arrow: {},
          },
          subItem: {},
          dropdown: {},
          subheader: {},
          tags: {},
          moreLink: {},
          carousel: { sx: {}, options: { slidesToShow: 6, slidesToScroll: 3 } },
          masonry: { sx: {}, columns: 3, defaultColumns: 3 },
        }}
      />
    </Paper>
  );

  const renderContent = () => (
    <Box
      sx={(theme) => ({
        height: 1,
        borderRadius: 1.5,
        flex: '1 1 auto',
        border: `dashed 1px ${theme.vars.palette.divider}`,
        bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
      })}
    />
  );

  return (
    <Box sx={{ gap: 3, width: 1, height: 640, display: 'flex' }}>
      {renderNav()}
      {renderContent()}
    </Box>
  );
}
