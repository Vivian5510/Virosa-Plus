import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    categories: string[];
    series: {
      name?: string;
      data: number[];
    }[];
  };
};

export function ChartLine({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    theme.palette.warning.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    legend: { show: true },
    xaxis: { categories: chart.categories },
    markers: {
      size: 6,
      strokeWidth: 3,
    },
  });

  return <Chart type="line" series={chart.series} options={chartOptions} sx={{ height: 320 }} />;
}
