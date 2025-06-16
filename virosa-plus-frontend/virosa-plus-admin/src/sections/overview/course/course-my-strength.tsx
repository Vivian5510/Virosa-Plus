import type { CardProps } from '@mui/material/Card';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: {
      name?: string;
      data: number[];
    }[];
  };
};

export function CourseMyStrength({ title, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.primary.main];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    xaxis: {
      categories: chart.categories,
      labels: {
        style: {
          colors: [
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
          ],
        },
      },
    },
  });

  return (
    <Card sx={sx} {...other}>
      <Typography variant="h6">{title}</Typography>
      <Chart
        type="radar"
        series={chart.series}
        options={chartOptions}
        slotProps={{ loading: { py: 2.5 } }}
        sx={{ mx: 'auto', width: 280, height: 280 }}
      />
    </Card>
  );
}
