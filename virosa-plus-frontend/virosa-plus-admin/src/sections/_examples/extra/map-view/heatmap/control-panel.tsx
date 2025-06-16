import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { fDate } from 'src/utils/format-time';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

type MapControlPanel = {
  startTime: number;
  endTime: number;
  allDays: boolean;
  selectedTime: number;
  onChangeTime: (value: number) => void;
  onChangeAllDays: (value: boolean) => void;
};

export function MapControlPanel({
  startTime,
  endTime,
  allDays,
  selectedTime,
  onChangeTime,
  onChangeAllDays,
}: MapControlPanel) {
  const day = 24 * 60 * 60 * 1000;
  const days = Math.round((endTime - startTime) / day);
  const selectedDay = Math.round((selectedTime - startTime) / day);

  const handleChangeDays = (value: number) => {
    const daysToAdd = value;
    const newTime = startTime + daysToAdd * day;

    onChangeTime(newTime);
  };

  return (
    <ControlPanelRoot>
      <FormControlLabel
        label="All days"
        labelPlacement="start"
        control={
          <Switch
            size="small"
            checked={allDays}
            onChange={(event) => onChangeAllDays(event.target.checked)}
            inputProps={{ id: 'all-days-switch' }}
          />
        }
        sx={{
          mb: 2,
          mx: 0,
          width: 1,
          color: 'common.white',
          justifyContent: 'space-between',
        }}
      />

      <Typography variant="body2" sx={{ mb: 1, color: allDays ? 'text.disabled' : 'common.white' }}>
        Each day: {fDate(selectedTime)}
      </Typography>

      <Slider
        min={1}
        step={1}
        max={days}
        disabled={allDays}
        value={selectedDay}
        onChange={(event, newValue) => {
          if (typeof newValue === 'number') handleChangeDays(newValue);
        }}
      />
    </ControlPanelRoot>
  );
}
