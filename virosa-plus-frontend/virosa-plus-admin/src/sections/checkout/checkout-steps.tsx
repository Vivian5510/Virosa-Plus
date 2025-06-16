import type { StepperProps } from '@mui/material/Stepper';
import type { CheckoutContextValue } from 'src/types/checkout';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import MuiStepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = StepperProps & {
  steps: CheckoutContextValue['steps'];
  activeStep: CheckoutContextValue['activeStep'];
};

export function CheckoutSteps({ steps, activeStep, sx, ...other }: Props) {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<StepConnector />}
      sx={[{ mb: { xs: 3, md: 5 } }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            slots={{ stepIcon: StepIcon }}
            sx={{ [`& .${stepLabelClasses.label}`]: { fontWeight: 'fontWeightSemiBold' } }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

// ----------------------------------------------------------------------

const StepConnector = styled(MuiStepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 2,
    borderColor: theme.vars.palette.divider,
  },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: theme.vars.palette.primary.main },
  },
}));

type StepIconProps = {
  active?: boolean;
  completed?: boolean;
};

function StepIcon({ active, completed }: StepIconProps) {
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        ...(active && { color: 'primary.main' }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}
