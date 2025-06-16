import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import { sumBy } from 'es-toolkit';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    options?: ChartOptions;
    series: {
      label: string;
      value: number;
    }[];
  };
};

export function BookingAvailable({ title, subheader, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const total = sumBy(chart.series, (series) => series.value);

  const chartSeries = (chart.series.filter((i) => i.label === 'Sold out')[0].value / total) * 100;

  const chartColors = chart.colors ?? [theme.palette.primary.light, theme.palette.primary.main];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    stroke: { width: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: chartColors[0], opacity: 1 },
          { offset: 100, color: chartColors[1], opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { margin: -20 },
        track: { margin: -20, background: varAlpha(theme.vars.palette.grey['500Channel'], 0.08) },
        dataLabels: {
          name: { offsetY: -12 },
          value: { offsetY: 6 },
          total: { label: 'Tours', formatter: () => fNumber(total) },
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

      <Chart
        type="radialBar"
        series={[chartSeries]}
        options={chartOptions}
        sx={{ mx: 'auto', width: 240, height: 240 }}
      />

      <Box
        sx={{
          p: 5,
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {chart.series.map((item) => (
          <Box
            key={item.label}
            sx={{
              gap: 1,
              display: 'flex',
              alignItems: 'center',
              typography: 'subtitle2',
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: 0.75,
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
                ...(item.label === 'Sold out' && { bgcolor: chartColors[1] }),
              }}
            />
            <Box sx={{ color: 'text.secondary', flexGrow: 1 }}>{item.label}</Box>
            {item.value} tours
          </Box>
        ))}
      </Box>
    </Card>
  );
}
