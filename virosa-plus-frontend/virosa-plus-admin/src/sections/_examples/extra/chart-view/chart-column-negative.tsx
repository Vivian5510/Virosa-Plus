import { useTheme } from '@mui/material/styles';

import { fPercent } from 'src/utils/format-number';

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

export function ChartColumnNegative({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.warning.main, theme.palette.info.main];

  const chartOptions = useChart({
    stroke: { width: 0 },
    xaxis: { type: 'datetime', categories: chart.categories },
    yaxis: { labels: { formatter: (value: number) => fPercent(value) } },
    tooltip: { y: { title: { formatter: () => '' } } },
    plotOptions: {
      bar: {
        borderRadius: 2,
        colors: {
          ranges: [
            { from: -100, to: -46, color: chartColors[0] },
            { from: -45, to: 0, color: chartColors[1] },
          ],
        },
      },
    },
  });

  return <Chart type="bar" series={chart.series} options={chartOptions} sx={{ height: 320 }} />;
}
