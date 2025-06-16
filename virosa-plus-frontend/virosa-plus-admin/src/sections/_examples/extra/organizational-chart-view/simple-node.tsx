import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { NodeProps } from './data';

// ----------------------------------------------------------------------

export function SimpleNode({ name, role, sx }: NodeProps) {
  return (
    <Box
      onClick={() => console.info(name)}
      sx={[
        (theme) => ({
          p: 2,
          gap: 0.5,
          borderRadius: 1.5,
          cursor: 'pointer',
          display: 'inline-flex',
          flexDirection: 'column',
          color: 'primary.darker',
          bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
          border: `1px solid ${varAlpha(theme.vars.palette.primary.mainChannel, 0.24)}`,
          ...theme.applyStyles('dark', {
            color: 'primary.lighter',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="caption" sx={{ opacity: 0.48 }}>
        {role}
      </Typography>
    </Box>
  );
}
