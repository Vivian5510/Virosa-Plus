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

export function ChartColumnStacked({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { stacked: true },
    colors: chartColors,
    stroke: { width: 0 },
    legend: { show: true, position: 'right', itemMargin: { vertical: 8 } },
    xaxis: { type: 'datetime', categories: chart.categories },
    plotOptions: { bar: { columnWidth: '36%' } },
  });

  return <Chart type="bar" series={chart.series} options={chartOptions} sx={{ height: 320 }} />;
}
