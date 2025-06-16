import type { Theme, Components } from '@mui/material/styles';

import { listClasses } from '@mui/material/List';

// ----------------------------------------------------------------------

const MuiPopover: Components<Theme>['MuiPopover'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    paper: ({ theme }) => ({
      ...theme.mixins.paperStyles(theme, { dropdown: true }),
      [`& .${listClasses.root}`]: { paddingTop: 0, paddingBottom: 0 },
    }),
  },
};

// ----------------------------------------------------------------------

export const popover = { MuiPopover };
