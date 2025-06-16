import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { alpha as hexAlpha } from '@mui/material/styles';

import { CONFIG } from 'src/global-config';

import { OptionButton } from './styles';
import { SvgColor } from '../../svg-color';

import type { SettingsState } from '../types';

// ----------------------------------------------------------------------

export type PresetsOptionsProps = BoxProps & {
  value: SettingsState['primaryColor'];
  options: { name: SettingsState['primaryColor']; value: string }[];
  onChangeOption: (newOption: SettingsState['primaryColor']) => void;
};

export function PresetsOptions({
  sx,
  value,
  options,
  onChangeOption,
  ...other
}: PresetsOptionsProps) {
  return (
    <Box
      sx={[
        () => ({
          gap: 1.5,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {options.map((option) => {
        const selected = value === option.name;

        return (
          <OptionButton
            key={option.name}
            onClick={() => onChangeOption(option.name)}
            sx={{
              height: 64,
              color: option.value,
              ...(selected && {
                bgcolor: hexAlpha(option.value, 0.08),
              }),
            }}
          >
            <SvgColor
              src={`${CONFIG.assetsDir}/assets/icons/settings/ic-siderbar-duotone.svg`}
              sx={{ width: 28, height: 28, color: 'currentColor' }}
            />
          </OptionButton>
        );
      })}
    </Box>
  );
}
