import { FormWizard } from './form-wizard';
import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

export function FormWizardView() {
  return (
    <ComponentLayout
      heroProps={{
        heading: 'Form wizard',
        moreLinks: ['https://react-hook-form.com', 'https://zod.dev'],
      }}
    >
      <FormWizard />
    </ComponentLayout>
  );
}
