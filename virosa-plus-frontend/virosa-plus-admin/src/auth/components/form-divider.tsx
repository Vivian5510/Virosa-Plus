import type { Theme, SxProps } from '@mui/material/styles';

import Divider from '@mui/material/Divider';

// ----------------------------------------------------------------------

type FormDividerProps = {
  sx?: SxProps<Theme>;
  label?: React.ReactNode;
};

export function FormDivider({ sx, label = 'OR' }: FormDividerProps) {
  return (
    <Divider
      sx={[
        () => ({
          my: 3,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, :after': { borderTopStyle: 'dashed' },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {label}
    </Divider>
  );
}
