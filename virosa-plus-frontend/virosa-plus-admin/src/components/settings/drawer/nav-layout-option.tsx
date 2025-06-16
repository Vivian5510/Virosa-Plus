import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';

import { CONFIG } from 'src/global-config';

import { OptionButton } from './styles';
import { SvgColor } from '../../svg-color';

import type { SettingsState } from '../types';

// ----------------------------------------------------------------------

export type NavLayoutOptionProps = BoxProps & {
  value: SettingsState['navLayout'];
  options: SettingsState['navLayout'][];
  onChangeOption: (newOption: SettingsState['navLayout']) => void;
};

export function NavLayoutOptions({
  sx,
  value,
  options,
  onChangeOption,
  ...other
}: NavLayoutOptionProps) {
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
        const selected = value === option;

        return (
          <OptionButton
            key={option}
            selected={selected}
            onClick={() => onChangeOption(option)}
            sx={[
              (theme) => ({
                height: 64,
                border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
              }),
            ]}
          >
            <SvgColor
              src={`${CONFIG.assetsDir}/assets/icons/settings/ic-nav-${option}.svg`}
              sx={{ width: 1, height: 1, color: 'currentColor' }}
            />
          </OptionButton>
        );
      })}
    </Box>
  );
}

// ----------------------------------------------------------------------

export type NavColorOptionProps = BoxProps & {
  value: SettingsState['navColor'];
  options: SettingsState['navColor'][];
  onChangeOption: (newOption: SettingsState['navColor']) => void;
};

export function NavColorOptions({
  sx,
  value,
  options,
  onChangeOption,
  ...other
}: NavColorOptionProps) {
  return (
    <Box
      sx={[
        () => ({
          gap: 1.5,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {options.map((option) => {
        const selected = value === option;

        return (
          <OptionButton
            key={option}
            selected={selected}
            onClick={() => onChangeOption(option)}
            sx={{ gap: 1.5, height: 56, textTransform: 'capitalize' }}
          >
            <SvgColor
              src={`${CONFIG.assetsDir}/assets/icons/settings/ic-sidebar-${option === 'integrate' ? 'outline' : 'filled'}.svg`}
            />
            {option}
          </OptionButton>
        );
      })}
    </Box>
  );
}
