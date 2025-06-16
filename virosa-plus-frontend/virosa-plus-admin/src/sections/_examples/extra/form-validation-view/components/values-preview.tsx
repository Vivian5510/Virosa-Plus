import type { FieldValues } from 'react-hook-form';
import type { Theme, SxProps } from '@mui/material/styles';

import { useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { fileData } from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

const classes = {
  item: 'item',
  key: 'item__key',
  value: 'item__value',
};

type Props = {
  sx?: SxProps<Theme>;
  onCloseDebug: () => void;
};

export function ValuesPreview({ sx, onCloseDebug }: Props) {
  const { watch, formState } = useFormContext();

  const values = watch();

  const totalValues = Object.keys(values).length;
  const totalErrors = Object.keys(formState.errors).length;
  return (
    <Portal>
      <Box
        sx={[
          (theme) => ({
            ...theme.mixins.bgBlur({ color: varAlpha(theme.vars.palette.grey['900Channel'], 0.9) }),
            top: 0,
            right: 0,
            height: 1,
            width: 280,
            display: 'none',
            position: 'fixed',
            overflowY: 'auto',
            color: 'common.white',
            zIndex: theme.zIndex.drawer,
            [theme.breakpoints.up(1440)]: {
              display: 'block',
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box sx={{ py: 1.5, pl: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Debug
          </Typography>
          <IconButton onClick={onCloseDebug}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Group label="State" sx={{ color: 'success.light' }}>
          {[
            'submitCount',
            'isDirty',
            'isValid',
            'disabled',
            'isLoading',
            'isSubmitted',
            'isSubmitting',
            'isValidating',
            'isSubmitSuccessful',
          ].map((item) => (
            <div key={item} className={classes.item}>
              <span className={classes.key}>{item}</span>
              <span className={classes.value}>
                {JSON.stringify((formState as Record<string, any>)[item], null, 2)}
              </span>
            </div>
          ))}
        </Group>

        <Group label={`Values (${totalValues})`} sx={{ color: 'warning.light' }}>
          {Object.keys(values).map((key) => {
            const value = values[key];

            return (
              <div key={key} className={classes.item}>
                <span className={classes.key}>{key}</span>
                <span
                  className={classes.value}
                  style={{
                    ...((value === null || value === undefined) && { color: 'coral' }),
                    ...(typeof value === 'number' && { color: 'violet' }),
                  }}
                >
                  {parseValue(values, key)}
                </span>
              </div>
            );
          })}
        </Group>

        <Group label={`Errors (${totalErrors})`} sx={{ color: 'error.light' }}>
          {JSON.stringify(Object.keys(formState.errors), null, 2)}
        </Group>

        <Group label="Dirty fields" sx={{ color: 'info.light' }}>
          {JSON.stringify(Object.keys(formState.dirtyFields), null, 2)}
        </Group>

        <Group label="Touched fields" sx={{ color: 'secondary.light' }}>
          {JSON.stringify(Object.keys(formState.touchedFields), null, 2)}
        </Group>
      </Box>
    </Portal>
  );
}

// ----------------------------------------------------------------------

type GroupProps = {
  label: string;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
};

function Group({ label, children, sx }: GroupProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box
      sx={[
        (theme) => ({
          borderBottom: `solid 1px ${theme.vars.palette.divider}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <ButtonBase
        onClick={() => setExpanded(!expanded)}
        sx={{
          py: 1,
          px: 1.5,
          width: 1,
          typography: 'overline',
          justifyContent: 'space-between',
          ...(expanded && { bgcolor: 'action.hover' }),
        }}
      >
        {label}
        <Iconify
          width={16}
          icon={expanded ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
        />
      </ButtonBase>

      <Collapse in={expanded}>
        <Box
          sx={[
            (theme) => ({
              p: 1,
              gap: 0.25,
              display: 'flex',
              typography: 'caption',
              flexDirection: 'column',
              [`& .${classes.item}`]: {
                display: 'inline-flex',
                alignItems: 'flex-start',
              },
              [`& .${classes.key}`]: {
                px: 0.5,
                color: 'common.white',
                bgcolor: varAlpha(theme.vars.palette.common.blackChannel, 0.4),
              },
              [`& .${classes.value}`]: {
                flex: '1 1 auto',
                textAlign: 'right',
                bgcolor: varAlpha(theme.vars.palette.common.blackChannel, 0.2),
              },
            }),
          ]}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}

// ----------------------------------------------------------------------

function parseValue(values: FieldValues, key: string) {
  if (values[key] === undefined) {
    return 'undefined';
  }

  if (key === 'singleUpload') {
    return JSON.stringify(values.singleUpload && fileData(values.singleUpload), null, 2);
  }

  if (key === 'multiUpload') {
    return JSON.stringify(
      values.multiUpload.map((file: File) => fileData(file)),
      null,
      2
    );
  }
  return JSON.stringify(values[key], null, 2) || '---';
}
