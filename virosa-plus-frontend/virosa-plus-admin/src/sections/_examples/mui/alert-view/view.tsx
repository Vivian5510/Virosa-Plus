import type { Theme, SxProps } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import AlertTitle from '@mui/material/AlertTitle';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['info', 'success', 'warning', 'error'] as const;

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
};

const DEMO_COMPONENTS = [
  {
    name: 'Standard',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Alert key={color} severity={color} onClose={() => {}}>
            This is an {color} alert — check it out!
          </Alert>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Filled',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Alert key={color} severity={color} variant="filled" onClose={() => {}}>
            This is an {color} alert — check it out!
          </Alert>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Outlined',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Alert key={color} severity={color} variant="outlined" onClose={() => {}}>
            This is an {color} alert — check it out!
          </Alert>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Description',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Alert key={color} severity={color} onClose={() => {}}>
            <AlertTitle sx={{ textTransform: 'capitalize' }}> {color} </AlertTitle>
            This is an {color} alert — <strong>check it out!</strong>
          </Alert>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Actions',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <Alert
          severity="info"
          action={
            <Button color="info" size="small" variant="soft">
              Action
            </Button>
          }
        >
          This is an info alert — check it out!
        </Alert>

        <Alert
          severity="info"
          variant="filled"
          action={
            <>
              <Button
                color="inherit"
                size="small"
                variant="outlined"
                sx={[
                  (theme) => ({
                    mr: 1,
                    border: `1px solid ${varAlpha(theme.vars.palette.common.whiteChannel, 0.48)}`,
                  }),
                ]}
              >
                Undo
              </Button>
              <Button size="small" color="info" variant="contained" sx={{ bgcolor: 'info.dark' }}>
                Action
              </Button>
            </>
          }
        >
          This is an info alert — check it out!
        </Alert>

        <Alert
          severity="info"
          variant="outlined"
          action={
            <>
              <Button color="info" size="small" variant="outlined" sx={{ mr: 1 }}>
                Undo
              </Button>
              <Button color="info" size="small" variant="contained" sx={{ bgcolor: 'info.dark' }}>
                Action
              </Button>
            </>
          }
        >
          This is an info alert — check it out!
        </Alert>
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function AlertView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Alert',
        moreLinks: ['https://mui.com/material-ui/react-alert/'],
      }}
    />
  );
}
