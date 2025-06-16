import { useTabs } from 'minimal-shared/hooks';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { MainLayout } from 'src/layouts/main';
import { layoutClasses } from 'src/layouts/core';
import { SimpleLayout } from 'src/layouts/simple';
import { DashboardLayout } from 'src/layouts/dashboard';
import { AuthSplitLayout } from 'src/layouts/auth-split';
import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const textContent = () => (
  <>
    <Typography variant="h4" sx={{ mb: 2 }}>
      What is Lorem Ipsum?
    </Typography>
    <Typography sx={{ color: 'text.secondary' }}>
      Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos dolor posuere felis euismod,
      placerat iaculis netus euismod. Lacus nullam fermentum lacus diam quam. Nam facilisis
      porttitor malesuada diam platea pulvinar finibus. Scelerisque facilisi in etiam, accumsan
      mattis ad. Integer condimentum eu dis curae conubia finibus. Justo placerat aptent erat
      aptent; leo quam rhoncus.
    </Typography>
  </>
);

const DEMO_COMPONENTS = [
  {
    value: 'main',
    label: 'Main',
    component: (
      <MainLayout
        sx={{ position: 'relative' }}
        slotProps={{
          header: {
            disableOffset: true,
            disableElevation: true,
            sx: { zIndex: 9, position: 'relative' },
            slots: {
              topArea: (
                <Alert severity="info" sx={{ borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
            },
          },
        }}
      >
        <Container>{textContent()}</Container>
      </MainLayout>
    ),
  },
  {
    value: 'dashboard',
    label: 'Dashboard',
    component: (
      <DashboardLayout
        sx={{
          position: 'relative',
          [`& .${layoutClasses.nav.vertical}`]: { zIndex: 10, position: 'absolute' },
        }}
        slotProps={{
          header: {
            sx: { zIndex: 9, position: 'relative' },
            slots: {
              topArea: (
                <Alert severity="info" sx={{ borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
            },
          },
        }}
      >
        <Container sx={{ pt: 3 }}>{textContent()}</Container>
      </DashboardLayout>
    ),
  },
  {
    value: 'simple',
    label: 'Simple',
    component: (
      <SimpleLayout
        sx={{ position: 'relative' }}
        slotProps={{
          header: {
            disableOffset: true,
            disableElevation: true,
            sx: { zIndex: 9, position: 'relative' },
            slots: {
              topArea: (
                <Alert severity="info" sx={{ borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
            },
          },
        }}
      >
        <Container>{textContent()}</Container>
      </SimpleLayout>
    ),
  },
  {
    value: 'simple-compact',
    label: 'Simple compact',
    component: (
      <SimpleLayout
        sx={{ position: 'relative' }}
        slotProps={{
          header: {
            disableOffset: true,
            disableElevation: true,
            sx: { zIndex: 9, position: { md: 'absolute' } },
            slots: {
              topArea: (
                <Alert severity="info" sx={{ borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
            },
          },
          content: { compact: true },
        }}
      >
        <Card sx={{ p: 4 }}>{textContent()}</Card>
      </SimpleLayout>
    ),
  },
  {
    value: 'auth-centered',
    label: 'Auth centered',
    component: (
      <AuthCenteredLayout
        sx={{ position: 'relative' }}
        slotProps={{
          header: {
            disableOffset: true,
            disableElevation: true,
            sx: { zIndex: 9, position: { md: 'relative' } },
            slots: {
              topArea: (
                <Alert severity="info" sx={{ borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
            },
          },
        }}
      >
        {textContent()}
      </AuthCenteredLayout>
    ),
  },
  {
    value: 'auth-split',
    label: 'Auth split',
    component: (
      <AuthSplitLayout
        sx={{ position: 'relative' }}
        slotProps={{
          header: {
            disableOffset: true,
            disableElevation: true,
            sx: { zIndex: 9, position: { md: 'absolute' } },
            slots: {
              topArea: (
                <Alert severity="info" sx={{ borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
            },
          },
        }}
      >
        <Card sx={{ p: 4 }}>{textContent()}</Card>
      </AuthSplitLayout>
    ),
  },
];

export function LayoutView() {
  const layoutTabs = useTabs(DEMO_COMPONENTS[0].value);

  return (
    <ComponentLayout heroProps={{ heading: 'Layout' }} containerProps={{ maxWidth: 'lg' }}>
      <Tabs value={layoutTabs.value} onChange={layoutTabs.onChange}>
        {DEMO_COMPONENTS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      <Divider sx={{ mb: 5 }} />

      <Paper variant="outlined" sx={{ height: 800, overflow: 'hidden', bgcolor: 'transparent' }}>
        {DEMO_COMPONENTS.find((tab) => tab.value === layoutTabs.value)?.component}
      </Paper>
    </ComponentLayout>
  );
}
