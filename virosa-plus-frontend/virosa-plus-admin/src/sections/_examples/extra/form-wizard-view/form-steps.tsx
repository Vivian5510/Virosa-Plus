import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import MuiStepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type StepperProps = {
  steps: string[];
  activeStep: number;
};

export function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <MuiStepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            slots={{
              stepIcon: ({ active, completed }) => (
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    color: 'text.disabled',
                    typography: 'subtitle2',
                    justifyContent: 'center',
                    bgcolor: 'action.disabledBackground',
                    ...(active && { bgcolor: 'primary.main', color: 'primary.contrastText' }),
                    ...(completed && { bgcolor: 'primary.main', color: 'primary.contrastText' }),
                  }}
                >
                  {completed ? (
                    <Iconify width={14} icon="mingcute:check-fill" />
                  ) : (
                    <Box sx={{ typography: 'subtitle2' }}>{index + 1}</Box>
                  )}
                </Box>
              ),
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
}

// ----------------------------------------------------------------------

export function StepOne() {
  return (
    <>
      <Field.Text
        name="stepOne.firstName"
        label="First name"
        variant="filled"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Field.Text
        name="stepOne.lastName"
        label="Last name"
        variant="filled"
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </>
  );
}

export function StepTwo() {
  return (
    <Field.Text
      name="stepTwo.age"
      label="Age"
      type="number"
      variant="filled"
      slotProps={{ inputLabel: { shrink: true } }}
      helperText="Age must be between 18 and 100"
    />
  );
}

export function StepThree() {
  return (
    <Field.Text
      name="stepThree.email"
      label="Email"
      variant="filled"
      slotProps={{ inputLabel: { shrink: true } }}
    />
  );
}

export function StepCompleted({ onReset }: { onReset: () => void }) {
  return (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 'inherit',
        bgcolor: 'background.neutral',
      }}
    >
      <Typography variant="subtitle1">All steps completed - you&apos;re finished</Typography>
      <Button
        variant="outlined"
        onClick={onReset}
        startIcon={<Iconify icon="solar:restart-bold" />}
      >
        Reset
      </Button>
    </Box>
  );
}
