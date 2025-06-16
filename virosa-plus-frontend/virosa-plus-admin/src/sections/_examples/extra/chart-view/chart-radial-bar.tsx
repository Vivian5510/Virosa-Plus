import { varAlpha } from 'minimal-shared/utils';

import { useTheme } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';

import { Chart, useChart, ChartLegends } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    categories: string[];
    series: number[];
  };
};

export function ChartRadialBar({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    [theme.palette.secondary.light, theme.palette.secondary.main],
    [theme.palette.warning.light, theme.palette.warning.main],
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors.map((color) => color[1]),
    labels: chart.categories,
    stroke: { width: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: chartColors.map((color) => [
          { offset: 0, color: color[0], opacity: 1 },
          { offset: 100, color: color[1], opacity: 1 },
        ]),
      },
    },
    grid: { padding: { top: -40, bottom: -40 } },
    plotOptions: {
      radialBar: {
        hollow: { margin: 14, size: '32%' },
        track: { margin: 14, background: varAlpha(theme.vars.palette.grey['500Channel'], 0.08) },
        dataLabels: {
          total: { formatter: () => fNumber(2324) },
          value: { offsetY: 2, fontSize: theme.typography.h5.fontSize as string },
          name: { offsetY: -10 },
        },
      },
    },
  });

  return (
    <>
      <Chart
        type="radialBar"
        series={chart.series}
        options={chartOptions}
        slotProps={{ loading: { p: 4 } }}
        sx={{ mx: 'auto', width: 320, height: 320 }}
      />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center' }}
      />
    </>
  );
}
