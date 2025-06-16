import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { MegaMenuHorizontal } from 'src/components/mega-menu';

import { MEGA_MENU_ITEMS_WITH_RENDER } from './data';

// ----------------------------------------------------------------------

export function DemoMegaMenuHorizontal() {
  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({ bgcolor: 'background.paper', boxShadow: theme.vars.customShadows.z8 })}
    >
      <Toolbar
        sx={(theme) => ({
          width: 1,
          mx: 'auto',
          maxWidth: theme.breakpoints.values.lg,
        })}
      >
        <Typography variant="h6" sx={{ flex: '1 0 auto' }}>
          Horizontal menu
        </Typography>

        <MegaMenuHorizontal
          data={MEGA_MENU_ITEMS_WITH_RENDER}
          render={{ navIcon: NAV_ICONS, navInfo: NAV_INFO }}
          cssVars={{ '--nav-item-gap': '8px' }}
          slotProps={{
            rootItem: {
              sx: {},
              icon: {},
              title: {},
              info: {},
              arrow: {},
            },
            subItem: {},
            dropdown: {},
            subheader: {},
            tags: {},
            moreLink: {},
            carousel: { sx: {}, options: {} },
            masonry: { sx: {}, columns: 4, defaultColumns: 4 },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

// ----------------------------------------------------------------------

const NAV_ICONS = {
  'icon.item1': <Iconify icon="solar:home-2-outline" />,
  'icon.item2': <Iconify icon="solar:atom-outline" />,
  'icon.item3': <Iconify icon="solar:chart-square-outline" />,
  'icon.item4': <Iconify icon="solar:confetti-minimalistic-outline" />,
  'icon.item5': <Iconify icon="solar:gallery-circle-outline" />,
};

const NAV_INFO = (val: string) => ({
  'info.item3': <Label color="info">{val}</Label>,
  'info.item4': <>{val}</>,
});
