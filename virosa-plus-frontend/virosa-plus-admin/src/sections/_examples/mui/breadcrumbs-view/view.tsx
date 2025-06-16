import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  {
    name: 'Text',
    component: (
      <ComponentBox>
        <Breadcrumbs>
          <Link color="inherit" href="#">
            Material-UI
          </Link>
          <Link color="inherit" href="#">
            Core
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Breadcrumb</Typography>
        </Breadcrumbs>
      </ComponentBox>
    ),
  },
  {
    name: 'With icon',
    component: (
      <ComponentBox>
        <Breadcrumbs>
          <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Iconify icon="solar:home-angle-2-bold-duotone" />
            Material-UI
          </Link>
          <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Iconify icon="solar:atom-bold-duotone" />
            Core
          </Link>
          <Typography
            sx={{
              gap: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
            }}
          >
            <Iconify icon="solar:bell-bing-bold-duotone" />
            Breadcrumb
          </Typography>
        </Breadcrumbs>
      </ComponentBox>
    ),
  },
  {
    name: 'Customized',
    component: (
      <>
        <ComponentBox sx={{ mb: 3 }}>
          <CustomBreadcrumbs
            links={[
              {
                name: 'Home',
                href: '#',
                icon: <Iconify icon="solar:home-angle-2-bold-duotone" />,
              },
              { name: 'Link1', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
              { name: 'Link2', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
              { name: 'Link3', icon: <Iconify icon="eva:cube-outline" /> },
            ]}
          />
        </ComponentBox>

        <ComponentBox>
          <CustomBreadcrumbs
            heading="Heading"
            links={[
              {
                name: 'Home',
                href: '#',
                icon: <Iconify icon="solar:home-angle-2-bold-duotone" />,
              },
              { name: 'Link1', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
              { name: 'Link2', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
              { name: 'Link3', icon: <Iconify icon="eva:cube-outline" /> },
            ]}
            moreLinks={[
              'https://www.w3schools.com/cssref/pr_padding-right.php',
              'https://www.w3schools.com/cssref/css3_pr_overflow-x.php',
            ]}
            action={
              <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>
                New product
              </Button>
            }
            backHref="#"
            sx={{ width: 1, pl: 3 }}
          />
        </ComponentBox>
      </>
    ),
  },
];

// ----------------------------------------------------------------------

export function BreadcrumbsView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Breadcrumbs',
        moreLinks: ['https://mui.com/material-ui/react-breadcrumbs/'],
      }}
    />
  );
}
