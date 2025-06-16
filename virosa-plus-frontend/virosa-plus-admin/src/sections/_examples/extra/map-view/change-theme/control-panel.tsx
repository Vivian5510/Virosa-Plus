import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

type MapControlPanel = {
  value: string;
  onChangeTheme: (theme: string) => void;
  themes: {
    [key: string]: string;
  };
};

export function MapControlPanel({ themes, value, onChangeTheme }: MapControlPanel) {
  return (
    <ControlPanelRoot>
      <RadioGroup value={value} onChange={(event, newValue) => onChangeTheme(newValue)}>
        {Object.keys(themes).map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            label={item}
            control={<Radio size="small" />}
            sx={{ color: 'common.white', textTransform: 'capitalize' }}
          />
        ))}
      </RadioGroup>
    </ControlPanelRoot>
  );
}
