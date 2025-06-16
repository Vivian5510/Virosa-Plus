import type { BadgeProps } from '@mui/material/Badge';
import type { SelectChangeEvent } from '@mui/material/Select';

import { useState, useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { svgIconClasses } from '@mui/material/SvgIcon';
import Badge, { badgeClasses } from '@mui/material/Badge';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

import { useMockedUser } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function ChatNavAccount() {
  const { user } = useMockedUser();

  const menuActions = usePopover();

  const [status, setStatus] = useState<BadgeProps['variant']>('online');

  const handleChangeStatus = useCallback((event: SelectChangeEvent) => {
    setStatus(event.target.value as BadgeProps['variant']);
  }, []);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{
        paper: { sx: { p: 0, ml: 0, mt: 0.5 } },
        arrow: { placement: 'top-left' },
      }}
    >
      <Box
        sx={{
          py: 2,
          pr: 1,
          pl: 2,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ListItemText primary={user?.displayName} secondary={user?.email} />

        <Tooltip title="Log out">
          <IconButton color="error">
            <Iconify icon="ic:round-power-settings-new" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <MenuList sx={{ my: 0.5, px: 0.5 }}>
        <MenuItem>
          <Badge
            variant={status}
            badgeContent=""
            sx={{
              width: 24,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
              [`& .${badgeClasses.badge}`]: {
                width: 12,
                height: 12,
                transform: 'unset',
                position: 'static',
              },
            }}
          />

          <FormControl fullWidth>
            <Select
              native
              fullWidth
              value={status}
              onChange={handleChangeStatus}
              input={<InputBase />}
              inputProps={{ id: 'chat-status-select' }}
              sx={{
                [`& .${svgIconClasses.root}`]: { right: 0 },
                [`& .${inputBaseClasses.input}`]: {
                  typography: 'body2',
                  textTransform: 'capitalize',
                },
              }}
            >
              {['online', 'always', 'busy', 'offline'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
        </MenuItem>

        <MenuItem>
          <Iconify width={24} icon="solar:user-id-bold" />
          Profile
        </MenuItem>

        <MenuItem>
          <Iconify width={24} icon="eva:settings-2-fill" />
          Settings
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Badge
        variant={status}
        badgeContent=""
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={menuActions.onOpen}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        >
          {user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>

      {renderMenuActions()}
    </>
  );
}
