import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { Form, schemaHelper } from 'src/components/hook-form';

import { Stepper, StepOne, StepTwo, StepThree, StepCompleted } from './form-steps';

// ----------------------------------------------------------------------

const STEPS = ['Step one', 'Step two', 'Step three'];

const StepOneSchema = zod.object({
  firstName: zod.string().min(1, { message: 'Full name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
});

const StepTwoSchema = zod.object({
  age: schemaHelper.nullableInput(
    zod
      .number({ coerce: true })
      .int()
      .min(1, { message: 'Age is required!' })
      .max(80, { message: 'Age must be between 1 and 80' }),
    // message for null value
    { message: 'Age is required!' }
  ),
});

const StepThreeSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

const WizardSchema = zod.object({
  stepOne: StepOneSchema,
  stepTwo: StepTwoSchema,
  stepThree: StepThreeSchema,
});

type WizardSchemaType = zod.infer<typeof WizardSchema>;

// ----------------------------------------------------------------------

const defaultValues: WizardSchemaType = {
  stepOne: { firstName: '', lastName: '' },
  stepTwo: { age: null },
  stepThree: { email: '' },
};

export function FormWizard() {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<WizardSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(WizardSchema),
    defaultValues,
  });

  const {
    reset,
    trigger,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleNext = useCallback(
    async (step?: 'stepOne' | 'stepTwo') => {
      if (step) {
        const isValid = await trigger(step);

        if (isValid) {
          clearErrors();
          setActiveStep((currentStep) => currentStep + 1);
        }
      } else {
        setActiveStep((currentStep) => currentStep + 1);
      }
    },
    [trigger, clearErrors]
  );

  const handleBack = useCallback(() => {
    setActiveStep((currentStep) => currentStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.info('DATA', data);
      handleNext();
    } catch (error) {
      console.error(error);
    }
  });

  const completedStep = activeStep === STEPS.length;

  return (
    <Card
      sx={{
        p: 5,
        width: 1,
        mx: 'auto',
        maxWidth: 720,
      }}
    >
      <Stepper steps={STEPS} activeStep={activeStep} />

      <Form methods={methods} onSubmit={onSubmit}>
        <Box
          sx={[
            (theme) => ({
              p: 3,
              mb: 3,
              gap: 3,
              minHeight: 240,
              display: 'flex',
              borderRadius: 1.5,
              flexDirection: 'column',
              border: `dashed 1px ${theme.vars.palette.divider}`,
            }),
          ]}
        >
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}
          {completedStep && <StepCompleted onReset={handleReset} />}
        </Box>

        {!completedStep && (
          <Box sx={{ display: 'flex' }}>
            {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}

            <Box sx={{ flex: '1 1 auto' }} />

            {activeStep === 0 && (
              <Button type="submit" variant="contained" onClick={() => handleNext('stepOne')}>
                Next
              </Button>
            )}

            {activeStep === 1 && (
              <Button type="submit" variant="contained" onClick={() => handleNext('stepTwo')}>
                Next
              </Button>
            )}

            {activeStep === STEPS.length - 1 && (
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </LoadingButton>
            )}
          </Box>
        )}
      </Form>
    </Card>
  );
}
