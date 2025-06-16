import Paper from '@mui/material/Paper';

import { NavSectionHorizontal } from 'src/components/nav-section';

import { NAV_SECTION_ITEMS } from './data';

// ----------------------------------------------------------------------

export function NavHorizontal() {
  return (
    <Paper variant="outlined" sx={{ px: 2, height: 80, borderRadius: 1.5 }}>
      <NavSectionHorizontal
        data={NAV_SECTION_ITEMS}
        cssVars={{ '--nav-item-gap': '16px' }}
        slotProps={{
          rootItem: {
            sx: {},
            icon: {},
            title: {},
            caption: {},
            info: {},
            arrow: {},
          },
          subItem: {
            sx: {},
            icon: {},
            title: {},
            caption: {},
            info: {},
            arrow: {},
          },
          dropdown: { paper: {} },
        }}
      />
    </Paper>
  );
}
