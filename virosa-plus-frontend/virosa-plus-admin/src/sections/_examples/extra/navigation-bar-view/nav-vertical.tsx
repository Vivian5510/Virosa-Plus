import { isEqual } from 'es-toolkit';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import {
  navSectionCssVars,
  NavSectionVertical,
  NavSectionVerticalItem,
} from 'src/components/nav-section';

import { NAV_SECTION_ITEMS } from './data';

// ----------------------------------------------------------------------

const defaultConfig = {
  gap: 4,
  icon: 24,
  radius: 8,
  subItemHeight: 36,
  rootItemHeight: 44,
  currentRole: 'admin',
  hiddenSubheader: false,
  padding: '4px 8px 4px 12px',
};

// ----------------------------------------------------------------------

export function NavVertical() {
  const [config, setConfig] = useState(defaultConfig);

  const canReset = !isEqual(defaultConfig, config);

  const handleChangeConfig = useCallback((name: string, value: any) => {
    setConfig((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  return (
    <Box
      sx={{
        gap: 5,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          width: 1,
          maxWidth: 320,
          borderRadius: 1.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavSectionVertical
          data={NAV_SECTION_ITEMS}
          currentRole={config.currentRole}
          sx={{ flex: '1 1 auto' }}
          cssVars={{ '--nav-item-gap': `${config.gap}px` }}
          slotProps={{
            rootItem: {
              sx: {
                padding: config.padding,
                borderRadius: `${config.radius}px`,
                minHeight: config.rootItemHeight,
              },
              icon: {
                width: config.icon,
                height: config.icon,
                ...(!config.icon && { display: 'none' }),
              },
              texts: {},
              title: {},
              caption: {},
              info: {},
              arrow: {},
            },
            subItem: {
              sx: {
                padding: config.padding,
                borderRadius: `${config.radius}px`,
                minHeight: config.subItemHeight,
              },
              icon: {
                width: config.icon,
                height: config.icon,
                ...(!config.icon && { display: 'none' }),
              },
              texts: {},
              title: {},
              caption: {},
              info: {},
              arrow: {},
            },
            subheader: { ...(config.hiddenSubheader && { display: 'none' }) },
          }}
        />

        <Divider sx={{ my: 2 }} />

        <NavSectionVerticalItem
          depth={1}
          path="#"
          title="Chat"
          caption="Praesent porttitor nulla vitae posuere"
          icon={<SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/ic-chat.svg`} />}
          sx={(theme) => ({ ...navSectionCssVars.vertical(theme) })}
        />
      </Paper>
      <ControlsPanel
        config={config}
        onChangeConfig={handleChangeConfig}
        canReset={canReset}
        onReset={handleReset}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

type ControlsPanelProps = {
  canReset: boolean;
  onReset: () => void;
  config: typeof defaultConfig;
  onChangeConfig: (name: string, value: any) => void;
};

function ControlsPanel({ config, onChangeConfig, canReset, onReset }: ControlsPanelProps) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 3,
        borderRadius: 1.5,
        position: 'relative',
        bgcolor: 'background.neutral',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Controls
        </Typography>

        {canReset && (
          <IconButton
            onClick={onReset}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
            }}
          >
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>
        )}
      </Box>

      {/* Gap */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Gap</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.gap}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('gap', newValue);
            }
          }}
        >
          {[4, 8, 16, 40].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Size */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Icon</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.icon}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('icon', newValue);
            }
          }}
        >
          {[0, 16, 20, 24, 40].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Radius */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Radius</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.radius}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('radius', newValue);
            }
          }}
        >
          {[0, 8, 16, 40].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Role */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Role</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.currentRole}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('currentRole', newValue);
            }
          }}
        >
          {['admin', 'user'].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Root Height */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Item Root Height</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.rootItemHeight}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('rootItemHeight', newValue);
            }
          }}
        >
          {[36, 44, 64, 80].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Sub Height */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Item Sub Height</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.subItemHeight}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('subItemHeight', newValue);
            }
          }}
        >
          {[36, 44, 64, 80].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Padding */}
      <TextField
        label="Item Padding"
        value={config.padding || ''}
        onChange={(event) => onChangeConfig('padding', event.target.value)}
      />

      <FormControlLabel
        control={
          <Switch
            checked={config.hiddenSubheader}
            onClick={() => onChangeConfig('hiddenSubheader', !config.hiddenSubheader)}
            inputProps={{ id: 'hidden-subheader-switch' }}
          />
        }
        label="Hidden subheader"
      />
    </Stack>
  );
}
