import type { Theme, Components } from '@mui/material/styles';

// ----------------------------------------------------------------------

const MuiStack: Components<Theme>['MuiStack'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { useFlexGap: true },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {},
};

// ----------------------------------------------------------------------

export const stack = { MuiStack };
