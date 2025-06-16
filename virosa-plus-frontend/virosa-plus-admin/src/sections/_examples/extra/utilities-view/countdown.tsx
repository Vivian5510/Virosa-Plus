import { useCountdownDate, useCountdownSeconds } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

export function Countdown() {
  const countdownDate = useCountdownDate(new Date('2025-08-20 20:30'));

  const countdownSeconds = useCountdownSeconds(10);

  return (
    <>
      <ComponentBox title="Date">
        <Box
          sx={{
            gap: 3,
            display: 'flex',
            textAlign: 'center',
            typography: 'body2',
            alignItems: 'center',
          }}
        >
          <div>
            <Box sx={{ typography: 'h5' }}>{countdownDate.days}</Box>
            <Box sx={{ color: 'text.secondary' }}>days</Box>
          </div>

          <div>
            <Box sx={{ typography: 'h5' }}>{countdownDate.hours}</Box>
            <Box sx={{ color: 'text.secondary' }}>hours</Box>
          </div>

          <div>
            <Box sx={{ typography: 'h5' }}>{countdownDate.minutes}</Box>
            <Box sx={{ color: 'text.secondary' }}>minutes</Box>
          </div>

          <div>
            <Box sx={{ typography: 'h5' }}>{countdownDate.seconds}</Box>
            <Box sx={{ color: 'text.secondary' }}>seconds</Box>
          </div>
        </Box>
      </ComponentBox>

      <ComponentBox title="Seconds">
        <Box
          sx={{
            gap: 3,
            display: 'flex',
            typography: 'h5',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            disabled={countdownSeconds.isCounting}
            onClick={() => {
              if (!countdownSeconds.isCounting) {
                countdownSeconds.reset();
                countdownSeconds.start();
              }
            }}
          >
            {countdownSeconds.isCounting ? `Counting... (${countdownSeconds.value})` : `Start`}
          </Button>
        </Box>
      </ComponentBox>
    </>
  );
}
