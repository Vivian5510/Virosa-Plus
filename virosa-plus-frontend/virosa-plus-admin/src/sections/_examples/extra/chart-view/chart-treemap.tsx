import { useTheme } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    series: {
      name: string;
      data: { x: string; y: number }[];
    }[];
  };
};

export function ChartTreemap({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.primary.dark, theme.palette.warning.main];

  const chartOptions = useChart({
    colors: chartColors,
    legend: { show: true },
    dataLabels: { enabled: true },
    tooltip: { x: { show: false } },
  });

  return <Chart type="treemap" series={chart.series} options={chartOptions} sx={{ height: 320 }} />;
}
