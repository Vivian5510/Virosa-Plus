import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  data: {
    value: number;
    status: string;
    quantity: number;
  }[];
};

export function BookingBooked({ title, subheader, data, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        component="ul"
        sx={{
          p: 3,
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {data.map((progress) => (
          <li key={progress.status}>
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ typography: 'overline', flexGrow: 1 }}>{progress.status}</Box>

              <Box sx={{ typography: 'subtitle1' }}>{fShortenNumber(progress.quantity)}</Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress.value}
              sx={[
                (theme) => ({
                  height: 8,
                  bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
                  [`& .${linearProgressClasses.bar}`]: {
                    background: `linear-gradient(135deg, ${theme.vars.palette.success.light} 0%, ${theme.vars.palette.success.main} 100%)`,
                    ...(progress.status === 'Pending' && {
                      background: `linear-gradient(135deg, ${theme.vars.palette.warning.light} 0%, ${theme.vars.palette.warning.main} 100%)`,
                    }),
                    ...(progress.status === 'Canceled' && {
                      background: `linear-gradient(135deg, ${theme.vars.palette.error.light} 0%, ${theme.vars.palette.error.main} 100%)`,
                    }),
                  },
                }),
              ]}
            />
          </li>
        ))}
      </Box>
    </Card>
  );
}
