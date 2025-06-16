import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

export type CityProps = {
  city: string;
  population: string;
  photoUrl: string;
  state: string;
  latitude: number;
  longitude: number;
};

type MapControlPanel = {
  data: CityProps[];
  selectedCity: string;
  onSelectCity: (event: React.ChangeEvent<HTMLInputElement>, city: CityProps) => void;
};

export function MapControlPanel({ data, selectedCity, onSelectCity }: MapControlPanel) {
  return (
    <ControlPanelRoot>
      {data.map((city) => (
        <RadioGroup
          key={city.city}
          value={selectedCity}
          onChange={(event) => onSelectCity(event, city)}
        >
          <FormControlLabel
            value={city.city}
            label={city.city}
            control={<Radio size="small" />}
            sx={{ color: 'common.white' }}
          />
        </RadioGroup>
      ))}
    </ControlPanelRoot>
  );
}
