import type { StepIconProps } from '@mui/material/StepIcon';

import { useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const STEPS = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: theme.vars.palette.success.main },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: theme.vars.palette.success.main },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.vars.palette.divider,
  },
}));

const QontoStepIconRoot = styled('div')<{
  ownerState: {
    active?: boolean;
  };
}>(({ theme, ownerState }) => ({
  height: 22,
  display: 'flex',
  alignItems: 'center',
  color: theme.vars.palette.text.disabled,
  ...(ownerState.active && { color: theme.vars.palette.success.main }),
  '& .QontoStepIcon-completedIcon': {
    zIndex: 1,
    fontSize: 18,
    color: theme.vars.palette.success.main,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(to top, ${theme.vars.palette.error.light}, ${theme.vars.palette.error.main})`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(to top, ${theme.vars.palette.error.light}, ${theme.vars.palette.error.main})`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    borderRadius: 1,
    backgroundColor: theme.vars.palette.divider,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: {
    completed?: boolean;
    active?: boolean;
  };
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.vars.palette.text.disabled,
  backgroundColor: theme.vars.palette.grey[300],
  ...theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.grey[700],
  }),
  ...(ownerState.active && {
    color: theme.vars.palette.common.white,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,0.25)',
    backgroundImage: `linear-gradient(to top, ${theme.vars.palette.error.light}, ${theme.vars.palette.error.main})`,
  }),
  ...(ownerState.completed && {
    color: theme.vars.palette.common.white,
    backgroundImage: `linear-gradient(to top, ${theme.vars.palette.error.light}, ${theme.vars.palette.error.main})`,
  }),
}));

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify width={24} icon="eva:checkmark-fill" className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  const icons: {
    [index: string]: React.ReactElement;
  } = {
    1: <Iconify icon="eva:settings-2-outline" width={24} />,
    2: <Iconify icon="eva:person-add-outline" width={24} />,
    3: <Iconify icon="eva:monitor-outline" width={24} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

// ----------------------------------------------------------------------

export function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel slots={{ stepIcon: QontoStepIcon }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 5 }} />

      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel slots={{ stepIcon: ColorlibStepIcon }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === STEPS.length ? (
        <>
          <Paper
            sx={[
              (theme) => ({
                p: 3,
                my: 3,
                minHeight: 120,
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
              }),
            ]}
          >
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Button color="inherit" onClick={handleReset} sx={{ mr: 'auto' }}>
            Reset
          </Button>
        </>
      ) : (
        <>
          <Paper
            sx={[
              (theme) => ({
                p: 3,
                my: 3,
                minHeight: 120,
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
              }),
            ]}
          >
            <Typography sx={{ my: 1 }}>{getStepContent(activeStep)}</Typography>
          </Paper>

          <Box sx={{ textAlign: 'right' }}>
            <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
              {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
