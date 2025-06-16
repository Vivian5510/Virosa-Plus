import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { fPercent, fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  icon: React.ReactElement;
};

export function BookingWidgetSummary({ title, percent, total, icon, sx, ...other }: Props) {
  const renderTrending = () => (
    <Box
      sx={{
        gap: 0.5,
        display: 'flex',
        alignItems: 'center',
        typography: 'subtitle2',
      }}
    >
      <Iconify
        width={24}
        icon={
          percent < 0
            ? 'solar:double-alt-arrow-down-bold-duotone'
            : 'solar:double-alt-arrow-up-bold-duotone'
        }
        sx={{ flexShrink: 0, color: 'success.main', ...(percent < 0 && { color: 'error.main' }) }}
      />
      <span>
        {percent > 0 && '+'}
        {fPercent(percent)}
      </span>
    </Box>
  );

  return (
    <Card
      sx={[
        () => ({
          p: 2,
          pl: 3,
          display: 'flex',
          alignItems: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>

        <Box sx={{ my: 1.5, typography: 'h3' }}>{fShortenNumber(total)}</Box>

        {renderTrending()}
      </Box>

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}
