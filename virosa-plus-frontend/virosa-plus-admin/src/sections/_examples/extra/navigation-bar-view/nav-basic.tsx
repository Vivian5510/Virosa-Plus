import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { NavBasicMobile, NavBasicDesktop } from 'src/components/nav-basic';

import { NAV_BASIC_ITEMS } from './data';

// ----------------------------------------------------------------------

export function NavBasic() {
  const mobileOpen = useBoolean();

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          gap: 2,
          width: 1,
          display: 'flex',
          borderRadius: 1.5,
          overflowX: 'auto',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <IconButton onClick={mobileOpen.onTrue}>
          <Iconify icon="carbon:menu" />
        </IconButton>

        <NavBasicDesktop
          data={NAV_BASIC_ITEMS}
          cssVars={{ '--nav-item-gap': '16px' }}
          slotProps={{
            rootItem: {
              sx: {},
              icon: {},
              texts: {},
              title: {},
              caption: {},
              arrow: {},
            },
            subItem: {
              sx: {},
              icon: {},
              texts: {},
              title: {},
              caption: {},
              arrow: {},
            },
            dropdown: { paper: {} },
          }}
        />
      </Paper>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ pl: 2.5, py: 2 }}>
          <Logo />
        </Box>

        <NavBasicMobile
          sx={{ px: 1.5 }}
          data={NAV_BASIC_ITEMS}
          cssVars={{ '--nav-item-gap': '8px' }}
          slotProps={{
            rootItem: {
              sx: {},
              icon: {},
              texts: {},
              title: {},
              caption: {},
              info: {},
              arrow: {},
            },
            subItem: {
              sx: {},
              icon: {},
              texts: {},
              title: {},
              caption: {},
              info: {},
              arrow: {},
            },
          }}
        />
      </Drawer>
    </>
  );
}
