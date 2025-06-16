import { useTheme } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
  };
};

export function ChartHeatmap({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.info.dark,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    legend: { show: true },
    tooltip: { x: { show: false } },
    xaxis: { categories: chart.categories },
  });

  return <Chart type="heatmap" series={chart.series} options={chartOptions} sx={{ height: 320 }} />;
}
