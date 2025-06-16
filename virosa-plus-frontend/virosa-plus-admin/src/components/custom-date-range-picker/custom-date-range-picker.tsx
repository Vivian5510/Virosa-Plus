import type { DialogProps } from '@mui/material/Dialog';
import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormHelperText from '@mui/material/FormHelperText';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import type { UseDateRangePickerReturn } from './use-date-range-picker';

// ----------------------------------------------------------------------

export type CustomDateRangePickerProps = DialogProps &
  UseDateRangePickerReturn & { onSubmit?: () => void };

export function CustomDateRangePicker({
  open,
  error,
  onClose,
  onSubmit,
  /********/
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  /********/
  PaperProps,
  variant = 'input',
  title = 'Select date range',
  ...other
}: CustomDateRangePickerProps) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const isCalendarView = variant === 'calendar';

  const handleSubmit = useCallback(() => {
    onClose();
    onSubmit?.();
  }, [onClose, onSubmit]);

  const contentStyles: SxProps<Theme> = {
    py: 1,
    gap: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    ...(isCalendarView && mdUp && { flexDirection: 'row' }),
  };

  const blockStyles: SxProps<Theme> = {
    borderRadius: 2,
    border: `dashed 1px ${theme.vars.palette.divider}`,
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth={isCalendarView ? false : 'xs'}
      PaperProps={{
        ...PaperProps,
        sx: [
          { ...(isCalendarView && { maxWidth: 720 }) },
          ...(Array.isArray(PaperProps?.sx) ? (PaperProps?.sx ?? []) : [PaperProps?.sx]),
        ],
      }}
      {...other}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent sx={{ ...(isCalendarView && mdUp && { overflow: 'unset' }) }}>
        <Box sx={contentStyles}>
          {isCalendarView ? (
            <>
              <Box sx={blockStyles}>
                <DateCalendar value={startDate} onChange={onChangeStartDate} />
              </Box>

              <Box sx={blockStyles}>
                <DateCalendar value={endDate} onChange={onChangeEndDate} />
              </Box>
            </>
          ) : (
            <>
              <DatePicker label="Start date" value={startDate} onChange={onChangeStartDate} />
              <DatePicker label="End date" value={endDate} onChange={onChangeEndDate} />
            </>
          )}
        </Box>

        {error && (
          <FormHelperText error sx={{ px: 2 }}>
            End date must be later than start date
          </FormHelperText>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={error} variant="contained" onClick={handleSubmit}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
