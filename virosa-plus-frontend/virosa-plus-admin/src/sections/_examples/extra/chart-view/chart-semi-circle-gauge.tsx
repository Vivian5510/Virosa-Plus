import { useTheme } from '@mui/material/styles';

import { fData } from 'src/utils/format-number';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    colors?: string[];
    series: [number];
  };
};

export function ChartSemiCircleGauge({ chart }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.secondary.main, theme.palette.secondary.light];

  const chartOptions = useChart({
    chart: { offsetY: 56, sparkline: { enabled: true } },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: chartColors[0], opacity: 1 },
          { offset: 100, color: chartColors[1], opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { margin: -24 },
        track: { margin: -24 },
        dataLabels: {
          name: { offsetY: 8 },
          value: { offsetY: -40 },
          total: {
            label: `Used of ${fData(24 * 1024 * 1024)} / ${fData(50 * 1024 * 1024)}`,
            color: theme.vars.palette.text.disabled,
            fontSize: theme.typography.caption.fontSize as string,
            fontWeight: theme.typography.caption.fontWeight,
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
