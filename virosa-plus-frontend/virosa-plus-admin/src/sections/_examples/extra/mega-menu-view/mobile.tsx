import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { MegaMenuMobile } from 'src/components/mega-menu';

import { MEGA_MENU_ITEMS } from './data';

// ----------------------------------------------------------------------

export function DemoMegaMenuMobile() {
  return (
    <MegaMenuMobile
      data={MEGA_MENU_ITEMS}
      cssVars={{ '--nav-item-gap': '8px' }}
      slots={{
        button: (
          <Button
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:menu" />}
            sx={{ mb: 5, alignSelf: 'flex-start' }}
          >
            Mobile menu
          </Button>
        ),
        topArea: (
          <Box sx={{ px: 2.5, py: 3 }}>
            <Logo />
          </Box>
        ),
        bottomArea: (
          <Divider>
            <Box
              sx={{
                p: 2,
                textAlign: 'center',
                color: 'text.secondary',
                typography: 'subtitle2',
              }}
            >
              Bottom
            </Box>
          </Divider>
        ),
      }}
      slotProps={{ rootItem: { sx: {} }, subItem: {} }}
    />
  );
}
