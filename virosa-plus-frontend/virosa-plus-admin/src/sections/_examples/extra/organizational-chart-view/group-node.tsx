import type { Theme } from '@mui/material/styles';
import type { PaletteColorKey } from 'src/theme/core';

import { varAlpha } from 'minimal-shared/utils';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

import type { NodeProps } from './data';

// ----------------------------------------------------------------------

export function GroupNode({ sx, name, role, depth, group, avatarUrl, totalChildren }: NodeProps) {
  const menuActions = usePopover();

  const onDelete = () => {
    menuActions.onClose();
    toast.warning(`onDelete: ${name}`);
  };

  const onEdit = () => {
    menuActions.onClose();
    toast.info(`onEdit: ${name}`);
  };

  const styles = (theme: Theme, color: PaletteColorKey) => ({
    color: theme.vars.palette[color].darker,
    bgcolor: varAlpha(theme.vars.palette[color].mainChannel, 0.08),
    border: `solid 1px ${varAlpha(theme.vars.palette[color].mainChannel, 0.24)}`,
    ...theme.applyStyles('dark', {
      color: theme.vars.palette[color].lighter,
    }),
  });

  const isLabel = depth === 1;

  const isRootGroup = group === 'root';
  const isProductDesignGroup = group === 'product design';
  const isDevelopmentGroup = group === 'development';
  const isMarketingGroup = group === 'marketing';

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'left-center' } }}
    >
      <MenuList>
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem onClick={onEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
        }}
      >
        {!isLabel && (
          <Avatar
            alt={name}
            src={avatarUrl ?? ''}
            sx={[
              (theme) => ({
                mt: -3.5,
                zIndex: 9,
                width: 56,
                height: 56,
                position: 'absolute',
                border: `solid 4px ${theme.vars.palette.background.paper}`,
              }),
            ]}
          />
        )}

        <Card
          sx={[
            (theme) => ({
              pt: 5,
              pb: 3,
              minWidth: 200,
              borderRadius: 1.5,
              ...(isLabel && { py: 2 }),
              ...(isLabel && isProductDesignGroup && styles(theme, 'primary')),
              ...(isLabel && isDevelopmentGroup && styles(theme, 'info')),
              ...(isLabel && isMarketingGroup && styles(theme, 'warning')),
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <IconButton
            disabled={isRootGroup}
            color={menuActions.open ? 'inherit' : 'default'}
            onClick={menuActions.onOpen}
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
              ...(isLabel && { display: 'none' }),
            }}
          >
            <Iconify icon="eva:more-horizontal-fill" />
          </IconButton>

          {depth !== 1 && !isRootGroup && (
            <Box
              sx={{
                top: 0,
                left: 0,
                width: 1,
                height: 4,
                position: 'absolute',
                borderRadius: 1.5,
                ...(isProductDesignGroup && { bgcolor: 'primary.light' }),
                ...(isDevelopmentGroup && { bgcolor: 'info.light' }),
                ...(isMarketingGroup && { bgcolor: 'warning.light' }),
              }}
            />
          )}

          <Typography variant={isLabel ? 'subtitle1' : 'subtitle2'} noWrap>
            {name}

            {isLabel && (
              <Label
                color={
                  (isDevelopmentGroup && 'info') || (isMarketingGroup && 'warning') || 'primary'
                }
                sx={{ ml: 1 }}
              >
                {totalChildren}
              </Label>
            )}
          </Typography>

          {!isLabel && (
            <Typography
              noWrap
              component="div"
              variant="caption"
              sx={{ mt: 0.5, color: 'text.secondary' }}
            >
              {role}
            </Typography>
          )}
        </Card>
      </Box>

      {renderMenuActions()}
    </>
  );
}
