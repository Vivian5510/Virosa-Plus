import type { CardProps } from '@mui/material/Card';

import { useTabs } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

import { fPercent, fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';
import { CustomTabs } from 'src/components/custom-tabs';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'income',
    label: 'Income',
    percent: 8.2,
    total: 9990,
    chart: { series: [{ data: [5, 31, 33, 50, 99, 76, 72, 76, 89] }] },
  },
  {
    value: 'expenses',
    label: 'Expenses',
    percent: -6.6,
    total: 1989,
    chart: { series: [{ data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }] },
  },
];

export function BankingOverview({ sx, ...other }: CardProps) {
  const theme = useTheme();

  const tabs = useTabs('income');

  const chartColors =
    tabs.value === 'income' ? [theme.palette.primary.dark] : [theme.palette.warning.dark];

  const chartOptions = useChart({
    colors: chartColors,
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
    stroke: { width: 3 },
    tooltip: {
      y: { formatter: (value: number) => fCurrency(value), title: { formatter: () => '' } },
    },
  });

  const renderBalance = () => (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          mb: 1,
          gap: 0.5,
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
          typography: 'subtitle2',
        }}
      >
        Total balance
        <Tooltip title="Vestibulum ullamcorper mauris">
          <Iconify width={16} icon="eva:info-outline" sx={{ color: 'text.disabled' }} />
        </Tooltip>
      </Box>

      <Box sx={{ typography: 'h3' }}>{fCurrency(49990)}</Box>
    </Box>
  );

  const renderActions = () => (
    <Box sx={{ gap: 1, display: 'flex' }}>
      <Button
        variant="soft"
        size="small"
        startIcon={<Iconify width={16} icon="eva:arrow-upward-fill" />}
      >
        Send
      </Button>
      <Button
        variant="soft"
        size="small"
        startIcon={<Iconify width={16} icon="mingcute:add-line" />}
      >
        Add card
      </Button>
      <Button
        variant="soft"
        size="small"
        startIcon={<Iconify width={16} icon="eva:arrow-downward-fill" />}
      >
        Request
      </Button>
    </Box>
  );

  const renderTabs = () => (
    <CustomTabs
      value={tabs.value}
      onChange={tabs.onChange}
      variant="fullWidth"
      sx={{ my: 3, borderRadius: 2 }}
      slotProps={{
        indicator: { borderRadius: 1.5, boxShadow: theme.vars.customShadows.z4 },
        tab: { p: 3 },
      }}
    >
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={
            <Box
              sx={{
                width: 1,
                display: 'flex',
                gap: { xs: 1, md: 2.5 },
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  borderRadius: '50%',
                  alignItems: 'center',
                  color: 'primary.lighter',
                  justifyContent: 'center',
                  bgcolor: 'primary.darker',
                  display: { xs: 'none', md: 'inline-flex' },
                  ...(tab.value === 'expenses' && {
                    color: 'warning.lighter',
                    bgcolor: 'warning.darker',
                  }),
                }}
              >
                <Iconify
                  width={24}
                  icon={
                    tab.value === 'expenses'
                      ? 'eva:diagonal-arrow-right-up-fill'
                      : 'eva:diagonal-arrow-left-down-fill'
                  }
                />
              </Box>

              <div>
                <Box
                  sx={{
                    mb: 1,
                    gap: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    typography: 'subtitle2',
                  }}
                >
                  {tab.label}
                  <Tooltip title={tab.label} placement="top">
                    <Iconify width={16} icon="eva:info-outline" sx={{ color: 'text.disabled' }} />
                  </Tooltip>
                </Box>

                <Box sx={{ typography: 'h4' }}>{fCurrency(tab.total)}</Box>
              </div>

              <Label
                color={tab.percent < 0 ? 'error' : 'success'}
                startIcon={
                  <Iconify
                    width={24}
                    icon={
                      tab.percent < 0
                        ? 'solar:double-alt-arrow-down-bold-duotone'
                        : 'solar:double-alt-arrow-up-bold-duotone'
                    }
                  />
                }
                sx={{ top: 8, right: 8, position: { md: 'absolute' } }}
              >
                {tab.percent > 0 && '+'}
                {fPercent(tab.percent)}
              </Label>
            </Box>
          }
        />
      ))}
    </CustomTabs>
  );

  return (
    <Card sx={[{ p: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Box
        sx={{
          gap: 2,
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {renderBalance()}
        {renderActions()}
      </Box>

      {renderTabs()}

      <Chart
        type="line"
        series={tabs.value === 'income' ? TABS[0].chart.series : TABS[1].chart.series}
        options={chartOptions}
        sx={{ height: 270 }}
      />
    </Card>
  );
}
