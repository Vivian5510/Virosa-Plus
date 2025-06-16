import type { BadgeProps } from '@mui/material/Badge';
import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';
import { usePopover } from 'minimal-shared/hooks';

import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fToNow } from 'src/utils/format-time';

import { Scrollbar } from 'src/components/scrollbar';
import { CustomPopover } from 'src/components/custom-popover';
import { varTap, varHover, transitionTap } from 'src/components/animate';

// ----------------------------------------------------------------------

export type ContactsPopoverProps = IconButtonProps & {
  data?: {
    id: string;
    role: string;
    name: string;
    email: string;
    status: string;
    address: string;
    avatarUrl: string;
    phoneNumber: string;
    lastActivity: string;
  }[];
};

export function ContactsPopover({ data = [], sx, ...other }: ContactsPopoverProps) {
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const renderMenuList = () => (
    <CustomPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      slotProps={{ arrow: { offset: 20 } }}
    >
      <Typography variant="h6" sx={{ p: 1.5 }}>
        Contacts <span>({data.length})</span>
      </Typography>

      <Scrollbar sx={{ height: 320, width: 320 }}>
        {data.map((contact) => (
          <MenuItem key={contact.id} sx={{ p: 1 }}>
            <Badge variant={contact.status as BadgeProps['variant']} badgeContent="">
              <Avatar alt={contact.name} src={contact.avatarUrl} />
            </Badge>

            <ListItemText
              primary={contact.name}
              secondary={contact.status === 'offline' ? fToNow(contact.lastActivity) : ''}
              slotProps={{
                secondary: {
                  sx: { typography: 'caption', color: 'text.disabled' },
                },
              }}
            />
          </MenuItem>
        ))}
      </Scrollbar>
    </CustomPopover>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Contacts button"
        onClick={onOpen}
        sx={[
          (theme) => ({ ...(open && { bgcolor: theme.vars.palette.action.selected }) }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <SvgIcon>
          {/* https://icon-sets.iconify.design/solar/users-group-rounded-bold-duotone/  */}
          <circle cx="15" cy="6" r="3" fill="currentColor" opacity="0.4" />
          <ellipse cx="16" cy="17" fill="currentColor" opacity="0.4" rx="5" ry="3" />
          <circle cx="9.001" cy="6" r="4" fill="currentColor" />
          <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4" />
        </SvgIcon>
      </IconButton>

      {renderMenuList()}
    </>
  );
}
