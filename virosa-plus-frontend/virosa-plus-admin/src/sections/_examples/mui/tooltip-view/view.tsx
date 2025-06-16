import type { TooltipProps } from '@mui/material/Tooltip';

import { m } from 'framer-motion';

import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { Iconify } from 'src/components/iconify';
import { varTap, varHover, transitionTap } from 'src/components/animate';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const PLACEMENTS = [
  'top-start',
  'top',
  'top-end',
  'left-start',
  'left',
  'left-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const;

const LONG_TEXT = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({ [`& .${tooltipClasses.tooltip}`]: { maxWidth: 500 } });

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({ [`& .${tooltipClasses.tooltip}`]: { maxWidth: 'none' } });

const DEMO_COMPONENTS = [
  {
    name: 'Simple',
    component: (
      <ComponentBox>
        <Tooltip title="Delete">
          <IconButton>
            <Iconify width={24} icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Add">
          <Fab>
            <Iconify width={24} icon="mingcute:add-line" />
          </Fab>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton color="info">
            <Iconify width={24} icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Add">
          <Fab
            component={m.button}
            whileTap={varTap()}
            whileHover={varHover(1.05)}
            transition={transitionTap()}
            color="info"
          >
            <Iconify width={24} icon="mingcute:add-line" />
          </Fab>
        </Tooltip>

        <Tooltip title="Add">
          <Button variant="outlined" color="info">
            Button
          </Button>
        </Tooltip>
      </ComponentBox>
    ),
  },
  {
    name: 'Arrow',
    component: (
      <ComponentBox>
        <Tooltip title="Add" arrow>
          <Fab>
            <Iconify width={24} icon="mingcute:add-line" />
          </Fab>
        </Tooltip>
      </ComponentBox>
    ),
  },
  {
    name: 'Variable width',
    component: (
      <ComponentBox>
        <Tooltip title={LONG_TEXT}>
          <Button color="inherit">Default width [300px]</Button>
        </Tooltip>

        <CustomWidthTooltip title={LONG_TEXT}>
          <Button color="inherit">Custom width [500px]</Button>
        </CustomWidthTooltip>

        <NoMaxWidthTooltip title={LONG_TEXT}>
          <Button color="inherit">No wrapping</Button>
        </NoMaxWidthTooltip>
      </ComponentBox>
    ),
  },
  {
    name: 'Transitions',
    component: (
      <ComponentBox>
        <Tooltip title="Grow">
          <Button color="inherit">Grow</Button>
        </Tooltip>

        <Tooltip
          title="Fade"
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 600 } }}
        >
          <Button color="inherit">Fade</Button>
        </Tooltip>

        <Tooltip title="Zoom" slots={{ transition: Zoom }}>
          <Button color="inherit">Zoom</Button>
        </Tooltip>
      </ComponentBox>
    ),
  },
  {
    name: 'Positioned',
    component: (
      <ComponentBox>
        {PLACEMENTS.map((placement) => (
          <Tooltip key={placement} title={placement} placement={placement} arrow>
            <Button color="inherit">{placement}</Button>
          </Tooltip>
        ))}
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function TooltipView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Tooltip',
        moreLinks: ['https://mui.com/material-ui/react-tooltip/'],
      }}
    />
  );
}
