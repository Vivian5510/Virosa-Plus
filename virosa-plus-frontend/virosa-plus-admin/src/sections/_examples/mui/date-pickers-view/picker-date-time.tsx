import type { IDatePickerControl } from 'src/types/common';

import dayjs from 'dayjs';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

export function PickerDateTime() {
  const [value, setValue] = useState<IDatePickerControl>(dayjs(new Date()));

  const [valueResponsive, setValueResponsive] = useState<IDatePickerControl>(
    dayjs('2018-01-01T00:00:00.000Z')
  );

  return (
    <Box
      sx={{
        rowGap: 5,
        columnGap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
      }}
    >
      <ComponentBox title="Basic">
        <DateTimePicker
          label="DateTimePicker"
          value={value}
          onChange={setValue}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </ComponentBox>

      <ComponentBox title="Responsiveness">
        <MobileDateTimePicker
          value={valueResponsive}
          onChange={(newValue) => {
            setValueResponsive(newValue);
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <DesktopDateTimePicker
          value={valueResponsive}
          onChange={(newValue) => {
            setValueResponsive(newValue);
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <DateTimePicker
          value={valueResponsive}
          onChange={(newValue) => {
            setValueResponsive(newValue);
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </ComponentBox>
    </Box>
  );
}
