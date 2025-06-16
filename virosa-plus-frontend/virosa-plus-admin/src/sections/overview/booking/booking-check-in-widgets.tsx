import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { fNumber } from 'src/utils/format-number';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  chart: {
    colors?: string[];
    series: {
      label: string;
      percent: number;
      total: number;
    }[];
    options?: ChartOptions;
  };
};

export function BookingCheckInWidgets({ chart, sx, ...other }: Props) {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const chartColors = chart.colors ?? [
    [theme.palette.primary.light, theme.palette.primary.main],
    [theme.palette.warning.light, theme.palette.warning.main],
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    stroke: { width: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: chartColors[0][0], opacity: 1 },
          { offset: 100, color: chartColors[0][1], opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize as string,
            fontWeight: theme.typography.subtitle2.fontWeight,
          },
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card sx={sx} {...other}>
      <Stack
        divider={
          <Divider
            flexItem
            orientation={smUp ? 'vertical' : 'horizontal'}
            sx={{ borderStyle: 'dashed' }}
          />
        }
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        {chart.series.map((item) => (
          <Box
            key={item.label}
            sx={{
              py: 5,
              gap: 3,
              width: 1,
              display: 'flex',
              px: { xs: 3, sm: 0 },
              alignItems: 'center',
              justifyContent: { sm: 'center' },
            }}
          >
            <Chart
              type="radialBar"
              series={[item.percent]}
              options={{
                ...chartOptions,
                ...(item.label !== 'Sold' && {
                  fill: {
                    type: 'gradient',
                    gradient: {
                      colorStops: [
                        { offset: 0, color: chartColors[1][0], opacity: 1 },
                        { offset: 100, color: chartColors[1][1], opacity: 1 },
                      ],
                    },
                  },
                }),
              }}
              sx={{ width: 80, height: 80 }}
            />

            <div>
              <Box sx={{ mb: 0.5, typography: 'h5' }}>{fNumber(item.total)}</Box>

              <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{item.label}</Box>
            </div>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
