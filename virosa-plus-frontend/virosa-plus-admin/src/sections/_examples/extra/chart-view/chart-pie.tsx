import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart, ChartLegends } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    categories: string[];
    series: number[];
  };
};

export function ChartPie({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    theme.palette.warning.main,
    theme.palette.info.dark,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.categories,
    stroke: { width: 0 },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
  });

  return (
    <>
      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center' }}
      />

      <Chart
        type="pie"
        series={chart.series}
        options={chartOptions}
        sx={{
          my: 3,
          mx: 'auto',
          width: 240,
          height: 240,
        }}
      />
    </>
  );
}
