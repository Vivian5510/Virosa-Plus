import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import { fDate } from 'src/utils/format-time';

import { useDateRangePicker, CustomDateRangePicker } from 'src/components/custom-date-range-picker';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

export function PickerDateRange() {
  const rangeInputPicker = useDateRangePicker(dayjs(), dayjs());

  const rangeCalendarPicker = useDateRangePicker(dayjs(new Date('2024/08/08')), null);

  return (
    <>
      <Box sx={{ typography: 'body2', mb: 3, color: 'text.secondary' }}>
        <div>This is the custom component from minimal.</div>
        <div>You can use more advanced components by MUI X Pro / Premium.</div>

        <Link href="https://mui.com/x/react-date-pickers/date-range-picker/">
          https://mui.com/x/react-date-pickers/date-range-picker/
        </Link>
      </Box>

      <Box
        sx={{
          rowGap: 5,
          columnGap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        }}
      >
        <ComponentBox title="Input" sx={{ flexDirection: 'column' }}>
          <Button variant="contained" onClick={rangeInputPicker.onOpen}>
            Click me!
          </Button>

          <Box sx={{ typography: 'body2' }}>
            <div>
              <strong>Start:</strong> {fDate(rangeInputPicker.startDate)}
            </div>
            <div>
              <strong>End:</strong> {fDate(rangeInputPicker.endDate)}
            </div>
          </Box>

          <CustomDateRangePicker
            open={rangeInputPicker.open}
            startDate={rangeInputPicker.startDate}
            endDate={rangeInputPicker.endDate}
            onChangeStartDate={rangeInputPicker.onChangeStartDate}
            onChangeEndDate={rangeInputPicker.onChangeEndDate}
            onClose={rangeInputPicker.onClose}
            error={rangeInputPicker.error}
          />
        </ComponentBox>

        <ComponentBox title="Calendar" sx={{ flexDirection: 'column' }}>
          <Button variant="contained" onClick={rangeCalendarPicker.onOpen}>
            Click me!
          </Button>

          <Box sx={{ typography: 'body2' }}>
            <div>
              <strong>Start:</strong> {fDate(rangeCalendarPicker.startDate)}
            </div>
            <div>
              <strong>End:</strong> {fDate(rangeCalendarPicker.endDate)}
            </div>
          </Box>

          <CustomDateRangePicker
            variant="calendar"
            open={rangeCalendarPicker.open}
            startDate={rangeCalendarPicker.startDate}
            endDate={rangeCalendarPicker.endDate}
            onChangeStartDate={rangeCalendarPicker.onChangeStartDate}
            onChangeEndDate={rangeCalendarPicker.onChangeEndDate}
            onClose={rangeCalendarPicker.onClose}
            error={rangeCalendarPicker.error}
          />
        </ComponentBox>
      </Box>
    </>
  );
}
