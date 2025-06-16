import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const componentBoxStyles: SxProps<Theme> = {
  gap: 4,
};

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const STATUS = ['always', 'online', 'busy', 'offline', 'invisible'] as const;

const DEMO_COMPONENTS = [
  {
    name: 'Basic',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {COLORS.map((color) => (
          <Badge key={color} badgeContent={4} color={color}>
            <Iconify icon="fluent:mail-24-filled" width={24} />
          </Badge>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Maximum value',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <Badge
          badgeContent={99}
          color="error"
          children={<Iconify icon="fluent:mail-24-filled" width={24} />}
        />
        <Badge
          badgeContent={100}
          color="error"
          children={<Iconify icon="fluent:mail-24-filled" width={24} />}
        />
        <Badge
          badgeContent={1000}
          max={999}
          color="error"
          children={<Iconify icon="fluent:mail-24-filled" width={24} />}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Dot badge',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <Badge color="info" variant="dot">
          <Iconify icon="fluent:mail-24-filled" width={24} />
        </Badge>
        <Badge color="info" variant="dot">
          <Typography>Typography</Typography>
        </Badge>
      </ComponentBox>
    ),
  },
  {
    name: 'Badge overlap',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <Badge color="info" badgeContent=" ">
          <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} />
        </Badge>
        <Badge color="info" badgeContent=" " variant="dot">
          <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} />
        </Badge>
        <Badge color="info" overlap="circular" badgeContent=" ">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'warning.main',
            }}
          />
        </Badge>
        <Badge color="info" overlap="circular" badgeContent=" " variant="dot">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'warning.main',
            }}
          />
        </Badge>
      </ComponentBox>
    ),
  },
  {
    name: 'Status',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        {STATUS.map((status) => (
          <Tooltip key={status} title={status}>
            <Badge variant={status} badgeContent="">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'grey.400',
                }}
              />
            </Badge>
          </Tooltip>
        ))}
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function BadgeView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Badge',
        moreLinks: ['https://mui.com/material-ui/react-badge/'],
      }}
    />
  );
}
