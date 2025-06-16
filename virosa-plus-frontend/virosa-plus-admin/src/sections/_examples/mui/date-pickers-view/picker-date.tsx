import type { IDatePickerControl } from 'src/types/common';

import dayjs from 'dayjs';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

export function PickerDate() {
  const [value, setValue] = useState<IDatePickerControl>(dayjs(new Date()));

  return (
    <Box sx={{ gap: 5, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          rowGap: 5,
          columnGap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        }}
      >
        <ComponentBox title="Basic" sx={{ flexDirection: 'column' }}>
          <DesktopDatePicker
            label="For desktop"
            value={value}
            minDate={dayjs('2017-01-01')}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <MobileDatePicker
            orientation="portrait"
            label="For mobile"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </ComponentBox>

        <ComponentBox title="Views playground">
          <DatePicker
            views={['year']}
            label="Year only"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DatePicker
            views={['year', 'month']}
            label="Year and Month"
            minDate={dayjs('2012-03-01')}
            maxDate={dayjs('2023-06-01')}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DatePicker
            openTo="year"
            views={['year', 'month', 'day']}
            label="Year, month and date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DatePicker
            views={['day', 'month', 'year']}
            label="Invert the order of views"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DatePicker
            views={['day']}
            label="Just date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </ComponentBox>
      </Box>

      <ComponentBox title="Static mode">
        <StaticDatePicker
          orientation="landscape"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </ComponentBox>
    </Box>
  );
}
