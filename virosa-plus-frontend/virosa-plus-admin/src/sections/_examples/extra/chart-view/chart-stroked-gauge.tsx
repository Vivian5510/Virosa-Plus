import { varAlpha } from 'minimal-shared/utils';

import { useTheme } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    series: [number];
  };
};

export function ChartStrokedGauge({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.error.main, theme.palette.error.light];

  const chartOptions = useChart({
    chart: { offsetY: 16, sparkline: { enabled: true } },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: chartColors[0], opacity: 1 },
          { offset: 100, color: chartColors[1], opacity: 1 },
        ],
      },
    },
    stroke: { dashArray: 4, curve: 'straight', lineCap: 'butt' },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { margin: -24 },
        track: {
          margin: -24,
          strokeWidth: '100%',
          background: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        },
        dataLabels: {
          name: { offsetY: 96 },
          value: { offsetY: 48 },
          total: {
            label: 'Median Ratio',
            color: theme.vars.palette.error.main,
            fontSize: theme.typography.subtitle2.fontSize as string,
            fontWeight: theme.typography.subtitle2.fontWeight,
          },
        },
      },
    },
  });

  return (
    <Chart
      type="radialBar"
      series={chart.series}
      options={chartOptions}
      sx={{ mx: 'auto', width: 260, height: 260 }}
    />
  );
}
