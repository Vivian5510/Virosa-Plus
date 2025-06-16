import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { _mock } from 'src/_mock';

import { ComponentLayout } from '../../layout';
import { DataGridBasic } from './data-grid-basic';
import { DataGridCustom } from './data-grid-custom';

// ----------------------------------------------------------------------

const _dataGrid = Array.from({ length: 20 }, (_, index) => {
  const status =
    (index % 2 && 'online') || (index % 3 && 'always') || (index % 4 && 'busy') || 'offline';

  return {
    id: _mock.id(index),
    status,
    email: _mock.email(index),
    name: _mock.fullName(index),
    age: _mock.number.age(index),
    lastLogin: _mock.time(index),
    isAdmin: _mock.boolean(index),
    lastName: _mock.lastName(index),
    rating: _mock.number.rating(index),
    firstName: _mock.firstName(index),
    performance: _mock.number.percent(index),
  };
});

const DEMO_COMPONENTS = [
  {
    name: 'Basic',
    component: (
      <Paper variant="outlined" sx={{ height: 480 }}>
        <DataGridBasic data={_dataGrid} />
      </Paper>
    ),
  },
  {
    name: 'Custom',
    component: (
      <Paper variant="outlined" sx={{ height: 640 }}>
        <DataGridCustom data={_dataGrid} />
      </Paper>
    ),
  },
];

// ----------------------------------------------------------------------

export function DataGridView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'MUI X Data Grid',
        moreLinks: ['https://mui.com/x/react-data-grid/'],
        additionalContent: (
          <Typography variant="body2" sx={{ my: 3 }}>
            This component includes 2 <strong>Free</strong> and <strong>Paid</strong> versions from
            MUI.
            <br />
            Paid version will have more features. Please read more{' '}
            <Link href="https://mui.com/x/react-data-grid/" target="_blank" rel="noopener">
              here
            </Link>
          </Typography>
        ),
      }}
      containerProps={{ maxWidth: 'lg' }}
    />
  );
}
