import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { MotivationIllustration } from 'src/assets/illustrations';
import {
  _mock,
  _ecommerceNewProducts,
  _ecommerceBestSalesman,
  _ecommerceSalesOverview,
  _ecommerceLatestProducts,
} from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { Walktour, useWalktour } from 'src/components/walktour';

import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';
import { EcommerceNewProducts } from 'src/sections/overview/e-commerce/ecommerce-new-products';
import { EcommerceYearlySales } from 'src/sections/overview/e-commerce/ecommerce-yearly-sales';
import { EcommerceBestSalesman } from 'src/sections/overview/e-commerce/ecommerce-best-salesman';
import { EcommerceSaleByGender } from 'src/sections/overview/e-commerce/ecommerce-sale-by-gender';
import { EcommerceSalesOverview } from 'src/sections/overview/e-commerce/ecommerce-sales-overview';
import { EcommerceWidgetSummary } from 'src/sections/overview/e-commerce/ecommerce-widget-summary';
import { EcommerceLatestProducts } from 'src/sections/overview/e-commerce/ecommerce-latest-products';
import { EcommerceCurrentBalance } from 'src/sections/overview/e-commerce/ecommerce-current-balance';

import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

export function WalktourView() {
  const theme = useTheme();

  const router = useRouter();

  const walktour = useWalktour({
    defaultRun: true,
    steps: [
      {
        target: 'body',
        title: `Let's begin our journey!`,
        placement: 'center',
        hideCloseButton: true,
        content: (
          <Typography sx={{ color: 'text.secondary' }}>
            Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna
            dolor sagittis lacus.
          </Typography>
        ),
      },
      {
        target: '#demo__2',
        title: 'Step 2',
        placement: 'left-start',
        content: (
          <>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
              urna dolor sagittis lacus.
            </Typography>
            <Box
              component="img"
              alt="Cover"
              src={_mock.image.cover(3)}
              sx={{
                width: 400,
                borderRadius: 2,
                aspectRatio: '5/3',
                objectFit: 'cover',
              }}
            />
          </>
        ),
      },
      {
        target: '#demo__3',
        title: 'Step 3',
        placement: 'bottom',
        content: (
          <>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              Weekly magic on your inbox
            </Typography>
            <TextField
              variant="filled"
              fullWidth
              label="Email"
              placeholder="example@gmail.com"
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <Button color="inherit" variant="soft" sx={{ mr: -0.5 }}>
                      Send
                    </Button>
                  ),
                },
              }}
            />
          </>
        ),
      },
      {
        target: '#demo__4',
        title: 'Step 4',
        placement: 'left',
        content: (
          <Stack spacing={3}>
            <Typography sx={{ color: 'text.secondary' }}>
              Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
              urna dolor sagittis lacus.
            </Typography>
            <Paper component="ul" variant="outlined">
              {[
                { label: 'Wi-Fi', icon: 'solar:home-wifi-bold-duotone', defaultChecked: true },
                {
                  label: 'Bluetooth',
                  icon: 'solar:bluetooth-square-bold-duotone',
                  defaultChecked: true,
                },
                { label: 'Airbuds', icon: 'solar:airbuds-bold-duotone', defaultChecked: false },
                { label: 'Alarm', icon: 'solar:alarm-bold-duotone', defaultChecked: false },
              ].map((option) => (
                <Box
                  component="li"
                  key={option.label}
                  sx={{
                    py: 1,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Iconify width={26} icon={option.icon} sx={{ color: 'text.secondary', mr: 2 }} />
                  <Box component="span" sx={{ typography: 'subtitle2', flexGrow: 1 }}>
                    {option.label}
                  </Box>

                  <Switch
                    edge="end"
                    color="default"
                    defaultChecked={option.defaultChecked}
                    inputProps={{
                      id: `${option.label}-switch`,
                      'aria-label': `${option.label} switch`,
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </Stack>
        ),
      },
      {
        target: '#demo__5',
        title: 'Step 5',
        placement: 'left',
        styles: { options: { arrowColor: theme.vars.palette.grey[800] } },
        slotProps: {
          root: {
            sx: {
              width: 480,
              bgcolor: theme.vars.palette.grey[800],
              color: theme.vars.palette.common.white,
            },
          },
        },
        content: (
          <Stack spacing={3}>
            <Typography sx={{ color: 'text.disabled' }}>
              Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
              urna dolor sagittis lacus.
            </Typography>
            <Box
              sx={{
                gap: 1,
                width: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <Box
                  key={index}
                  component="img"
                  alt="Cover"
                  src={_mock.image.cover(index)}
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Box>
          </Stack>
        ),
      },
    ],
  });

  return (
    <>
      <Walktour
        run={walktour.run}
        steps={walktour.steps}
        callback={walktour.onCallback}
        getHelpers={walktour.setHelpers}
      />

      <ComponentLayout
        heroProps={{
          heading: 'Walktour',
          moreLinks: ['https://docs.react-joyride.com/'],
        }}
        containerProps={{ maxWidth: 'lg' }}
      >
        <Box sx={{ mb: 5, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size="large"
            variant="outlined"
            onClick={() => router.refresh()}
            startIcon={<Iconify icon="solar:restart-bold" />}
          >
            Reload
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <EcommerceWelcome
              id="demo__1"
              title={`Congratulations 🎉  \n Jaydon Frankie`}
              description="Best seller of the month you have done 57.6% more sales today."
              img={<MotivationIllustration hideBackground />}
              action={
                <Button variant="contained" color="primary">
                  Go now
                </Button>
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <EcommerceNewProducts id="demo__2" list={_ecommerceNewProducts} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <EcommerceWidgetSummary
              title="Product sold"
              percent={2.6}
              total={765}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [22, 8, 35, 50, 82, 84, 77, 12],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <EcommerceWidgetSummary
              id="demo__3"
              title="Total balance"
              percent={-0.1}
              total={18765}
              chart={{
                colors: [theme.palette.warning.light, theme.palette.warning.main],
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [56, 47, 40, 62, 73, 30, 23, 54],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <EcommerceWidgetSummary
              title="Sales profit"
              percent={0.6}
              total={4876}
              chart={{
                colors: [theme.palette.error.light, theme.palette.error.main],
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [40, 70, 75, 70, 50, 28, 7, 64],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <EcommerceSaleByGender
              title="Sale by gender"
              total={2324}
              chart={{
                series: [
                  { label: 'Mens', value: 25 },
                  { label: 'Womens', value: 50 },
                  { label: 'Kids', value: 75 },
                ],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <EcommerceYearlySales
              id="demo__4"
              title="Yearly sales"
              subheader="(+43%) than last year"
              chart={{
                categories: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                series: [
                  {
                    name: '2022',
                    data: [
                      {
                        name: 'Total income',
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                      },
                      {
                        name: 'Total expenses',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                      },
                    ],
                  },
                  {
                    name: '2023',
                    data: [
                      {
                        name: 'Total income',
                        data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                      },
                      {
                        name: 'Total expenses',
                        data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <EcommerceSalesOverview title="Sales overview" data={_ecommerceSalesOverview} />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <EcommerceCurrentBalance
              title="Current balance"
              earning={25500}
              refunded={1600}
              orderTotal={287650}
              currentBalance={187650}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <EcommerceBestSalesman
              title="Best salesman"
              tableData={_ecommerceBestSalesman}
              headCells={[
                { id: 'name', label: 'Seller' },
                { id: 'category', label: 'Product' },
                { id: 'country', label: 'Country', align: 'center' },
                { id: 'totalAmount', label: 'Total', align: 'right' },
                { id: 'rank', label: 'Rank', align: 'right' },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <EcommerceLatestProducts
              id="demo__5"
              title="Latest products"
              list={_ecommerceLatestProducts}
            />
          </Grid>
        </Grid>
      </ComponentLayout>
    </>
  );
}
