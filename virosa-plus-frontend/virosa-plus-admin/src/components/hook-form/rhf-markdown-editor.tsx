import { Controller, useFormContext } from 'react-hook-form';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { MarkdownEditor } from '../markdown-editor';

import type { MarkdownEditorProps } from '../markdown-editor';

// ----------------------------------------------------------------------

interface Props extends Omit<MarkdownEditorProps, 'value' | 'onChange'> {
  name: string;
  label?: string;
}

export function RHFMarkdownEditor({ name, label, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} sx={{ m: 0, p: 0 }}>
          {label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}

          <MarkdownEditor
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        </FormControl>
      )}
    />
  );
}
