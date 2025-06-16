import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    categories: string[];
    series: {
      name: string;
      type: string;
      data: number[];
    }[];
  };
};

export function ChartMixed({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: [0, 2, 2] },
    fill: { type: ['solid', 'gradient', 'solid'] },
    legend: { show: true },
    xaxis: { type: 'datetime', categories: chart.categories },
    yaxis: { min: 0, title: { text: 'Points' } },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (value: number) => `${value} points` },
    },
  });

  return <Chart type="line" series={chart.series} options={chartOptions} sx={{ height: 320 }} />;
}
