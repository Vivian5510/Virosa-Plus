import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { inputBaseClasses } from '@mui/material/InputBase';

import { NumberInput } from 'src/components/number-input';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

const camelPattern = /(^|[A-Z])[a-z]*/g;

export type MapSettings = {
  minZoom: number;
  maxZoom: number;
  minPitch: number;
  maxPitch: number;
  dragPan: boolean;
  boxZoom: boolean;
  keyboard: boolean;
  touchZoom: boolean;
  dragRotate: boolean;
  scrollZoom: boolean;
  touchPitch: boolean;
  touchRotate: boolean;
  doubleClickZoom: boolean;
  touchZoomRotate: boolean;
};

type MapSettingKeys = keyof MapSettings;
type SettingValue = boolean | number;

type MapControlPanelProps = {
  settings: MapSettings;
  onChange: (name: MapSettingKeys, value: SettingValue) => void;
};

// ----------------------------------------------------------------------

export function MapControlPanel({ settings, onChange }: MapControlPanelProps) {
  return (
    <ControlPanelRoot>
      {Object.keys(settings).map((name) =>
        renderControlSettings(name as MapSettingKeys, settings as MapSettings, onChange)
      )}
    </ControlPanelRoot>
  );
}

// ----------------------------------------------------------------------

function formatSettingName(name: string) {
  return name.match(camelPattern)?.join(' ');
}

const rowStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  color: 'common.white',
  textTransform: 'capitalize',
  '&:not(:last-of-type)': { mb: 0.5 },
};

const renderControlSettings = (
  name: MapSettingKeys,
  settings: MapSettings,
  onChange: MapControlPanelProps['onChange']
) => {
  const value = settings[name];

  if (typeof value === 'boolean') {
    return (
      <Box key={name} sx={rowStyles}>
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {formatSettingName(name)}
        </Typography>
        <Switch
          size="small"
          checked={value}
          onChange={(event) => onChange(name, event.target.checked)}
          inputProps={{ id: `${name}-switch` }}
        />
      </Box>
    );
  }

  if (typeof value === 'number') {
    const handleChangeNumber = (newValue: number) => {
      const isZoom = name === 'minZoom' || name === 'maxZoom';
      const isPitch = name === 'minPitch' || name === 'maxPitch';

      const updateValue = (
        inputName: MapSettingKeys,
        inputValue: number,
        minField: MapSettingKeys,
        maxField: MapSettingKeys
      ) => {
        if (inputValue > Number(settings[maxField])) {
          onChange(maxField, inputValue);
        } else if (inputValue < Number(settings[minField])) {
          onChange(minField, inputValue);
        } else {
          onChange(inputName, inputValue === 0 ? 1 : inputValue);
        }
      };

      if (isZoom) {
        if (name === 'minZoom' && newValue > settings.maxZoom) {
          updateValue('maxZoom', newValue, 'minZoom', 'maxZoom');
        } else if (name === 'maxZoom') {
          updateValue('maxZoom', newValue, 'minZoom', 'maxZoom');
        } else {
          onChange(name, newValue);
        }
      } else if (isPitch) {
        if (name === 'minPitch' && newValue > settings.maxPitch) {
          updateValue('maxPitch', newValue, 'minPitch', 'maxPitch');
        } else if (name === 'maxPitch') {
          updateValue('maxPitch', newValue, 'minPitch', 'maxPitch');
        } else {
          onChange(name, newValue);
        }
      } else {
        onChange(name, newValue);
      }
    };

    return (
      <Box key={name} sx={rowStyles}>
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {formatSettingName(name)}
        </Typography>

        <NumberInput
          max={['minPitch', 'maxPitch'].includes(name) ? 85 : 20}
          hideButtons
          value={value}
          onChange={(event, newValue) => handleChangeNumber(newValue)}
          sx={{ maxWidth: 40 }}
          slotProps={{
            input: {
              sx: {
                [`& .${inputBaseClasses.input}`]: {
                  py: 0,
                  color: 'common.white',
                },
              },
            },
          }}
        />
      </Box>
    );
  }

  return null;
};
