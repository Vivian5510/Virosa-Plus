import type { Theme, SxProps } from '@mui/material/styles';
import type { ThemeDirection, ThemeColorScheme } from 'src/theme/types';

// ----------------------------------------------------------------------

export type SettingsState = {
  version?: string;
  fontSize?: number;
  fontFamily?: string;
  compactLayout?: boolean;
  direction?: ThemeDirection;
  colorScheme?: ThemeColorScheme;
  contrast?: 'default' | 'hight';
  navColor?: 'integrate' | 'apparent';
  navLayout?: 'vertical' | 'horizontal' | 'mini';
  primaryColor?: 'default' | 'preset1' | 'preset2' | 'preset3' | 'preset4' | 'preset5';
};

export type SettingsContextValue = {
  state: SettingsState;
  canReset: boolean;
  onReset: () => void;
  setState: (updateValue: Partial<SettingsState>) => void;
  setField: (name: keyof SettingsState, updateValue: SettingsState[keyof SettingsState]) => void;
  // Drawer
  openDrawer: boolean;
  onCloseDrawer: () => void;
  onToggleDrawer: () => void;
};

export type SettingsProviderProps = {
  defaultSettings: SettingsState;
  children: React.ReactNode;
  storageKey?: string;
};

export type SettingsDrawerProps = {
  sx?: SxProps<Theme>;
  defaultSettings: SettingsState;
};
