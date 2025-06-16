import type { Theme, SxProps } from '@mui/material/styles';

import { CustomizedSteppers } from './customized-steppers';
import { ComponentBox, ComponentLayout } from '../../layout';
import { VerticalLinearStepper } from './vertical-linear-stepper';
import { HorizontalLinearStepper } from './horizontal-linear-stepper';
import { LinearAlternativeLabel } from './linear-alternative-label-stepper';

// ----------------------------------------------------------------------

const componentBoxStyles: SxProps<Theme> = {
  alignItems: 'unset',
  flexDirection: 'column',
};

const DEMO_COMPONENTS = [
  {
    name: 'Horizontal linear stepper',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <HorizontalLinearStepper />
      </ComponentBox>
    ),
  },
  {
    name: 'Linear alternative label',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <LinearAlternativeLabel />
      </ComponentBox>
    ),
  },
  {
    name: 'Vertical linear stepper',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <VerticalLinearStepper />
      </ComponentBox>
    ),
  },
  {
    name: 'Customized stepper',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <CustomizedSteppers />
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function StepperView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Stepper',
        moreLinks: ['https://mui.com/material-ui/react-stepper/'],
      }}
    />
  );
}
