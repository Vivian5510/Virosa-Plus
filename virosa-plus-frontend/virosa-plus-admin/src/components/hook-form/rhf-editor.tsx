import { Controller, useFormContext } from 'react-hook-form';

import { Editor } from '../editor';

import type { EditorProps } from '../editor';

// ----------------------------------------------------------------------

export type RHFEditorProps = EditorProps & {
  name: string;
};

export function RHFEditor({ name, helperText, ...other }: RHFEditorProps) {
  const {
    control,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          {...field}
          error={!!error}
          helperText={error?.message ?? helperText}
          resetValue={isSubmitSuccessful}
          {...other}
        />
      )}
    />
  );
}
