import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fData } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  value: number;
  total: number;
  icon: string;
};

export function FileWidget({ sx, icon, title, value, total, ...other }: Props) {
  return (
    <Card sx={[{ p: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <IconButton sx={{ top: 8, right: 8, position: 'absolute' }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Box component="img" src={icon} sx={{ width: 48, height: 48 }} />
      <Typography variant="h6" sx={{ mt: 3 }}>
        {title}
      </Typography>
      <LinearProgress
        value={24}
        variant="determinate"
        color="inherit"
        sx={{ my: 2, height: 6, '&::before': { opacity: 1, bgcolor: 'divider' } }}
      />
      <Box
        sx={{
          gap: 0.5,
          display: 'flex',
          typography: 'subtitle2',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ mr: 0.5, typography: 'body2', color: 'text.disabled' }}>{fData(value)}</Box>

        {` / ${fData(total)}`}
      </Box>
    </Card>
  );
}
