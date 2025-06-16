import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

export type ModeProps = 'side-by-side' | 'split-screen';

type MapControlPanel = {
  mode: ModeProps;
  onModeChange: (event: React.MouseEvent<HTMLElement>, newMode: ModeProps | null) => void;
};

export function MapControlPanel({ mode, onModeChange }: MapControlPanel) {
  return (
    <ControlPanelRoot sx={{ p: 0, bgcolor: 'common.white' }}>
      <ToggleButtonGroup color="primary" value={mode} exclusive onChange={onModeChange}>
        <ToggleButton value="side-by-side">Side by side</ToggleButton>
        <ToggleButton value="split-screen">Split screen</ToggleButton>
      </ToggleButtonGroup>
    </ControlPanelRoot>
  );
}
