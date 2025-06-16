import { useState, useCallback } from 'react';
import { useDoubleClick, useCopyToClipboard } from 'minimal-shared/hooks';

import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

export function CopyToClipboard() {
  const { copy } = useCopyToClipboard();

  const [value, setValue] = useState('https://www.npmjs.com/package/');

  const textOnClick = `Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
  Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat
  dolor lectus quis orci. Cras non dolor.
  `;

  const onCopy = useCallback(
    (text: string) => {
      if (text) {
        toast.success('Copied!');
        copy(text);
      }
    },
    [copy]
  );

  const handleClick = useDoubleClick({ doubleClick: () => onCopy(textOnClick) });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }, []);

  return (
    <>
      <ComponentBox title="onChange">
        <TextField
          fullWidth
          value={value}
          onChange={handleChange}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => onCopy(value)}>
                      <Iconify icon="eva:copy-fill" width={24} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />
      </ComponentBox>

      <ComponentBox title="onDoubleClick">
        <Typography onClick={handleClick}>{textOnClick}</Typography>
      </ComponentBox>
    </>
  );
}
