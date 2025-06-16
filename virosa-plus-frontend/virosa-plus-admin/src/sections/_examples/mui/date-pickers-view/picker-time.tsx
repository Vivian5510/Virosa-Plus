import type { IDatePickerControl } from 'src/types/common';

import dayjs from 'dayjs';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

export function PickerTime() {
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
        <ComponentBox title="Basic">
          <TimePicker
            label="12 hours"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <TimePicker
            ampm={false}
            label="24 hours"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </ComponentBox>

        <ComponentBox title="Responsiveness">
          <MobileTimePicker
            orientation="portrait"
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DesktopTimePicker
            label="For desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <TimePicker
            value={value}
            onChange={setValue}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </ComponentBox>
      </Box>

      <ComponentBox title="Static mode">
        <StaticTimePicker
          orientation="portrait"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
        <StaticTimePicker
          ampm
          orientation="landscape"
          openTo="minutes"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </ComponentBox>
    </Box>
  );
}
