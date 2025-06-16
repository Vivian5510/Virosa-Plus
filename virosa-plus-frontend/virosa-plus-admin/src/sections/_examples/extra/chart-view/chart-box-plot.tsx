import { useTheme } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    series: {
      data: {
        x: string;
        y: number[];
      }[];
    }[];
  };
};

export function ChartBoxPlot({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.info.main, theme.palette.error.main];

  const chartOptions = useChart({
    stroke: { width: 2, colors: [theme.palette.divider] },
    plotOptions: { boxPlot: { colors: { upper: chartColors[0], lower: chartColors[1] } } },
  });

  return <Chart type="boxPlot" series={chart.series} options={chartOptions} sx={{ height: 320 }} />;
}
