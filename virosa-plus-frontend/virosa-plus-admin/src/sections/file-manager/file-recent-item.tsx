import type { IFileManager } from 'src/types/file';
import type { PaperProps } from '@mui/material/Paper';

import { useState, useCallback } from 'react';
import { useBoolean, usePopover, useCopyToClipboard } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { CustomPopover } from 'src/components/custom-popover';

import { FileManagerShareDialog } from './file-manager-share-dialog';
import { FileManagerFileDetails } from './file-manager-file-details';

// ----------------------------------------------------------------------

type Props = PaperProps & {
  file: IFileManager;
  onDelete: () => void;
};

export function FileRecentItem({ file, onDelete, sx, ...other }: Props) {
  const { copy } = useCopyToClipboard();

  const menuActions = usePopover();

  const shareDialog = useBoolean();
  const detailsDrawer = useBoolean();
  const favorite = useBoolean(file.isFavorited);

  const [inviteEmail, setInviteEmail] = useState('');

  const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleCopy = useCallback(() => {
    toast.success('Copied!');
    copy(file.url);
  }, [copy, file.url]);

  const renderActions = () => (
    <Box
      sx={{
        top: 8,
        right: 8,
        flexShrink: { sm: 0 },
        position: { xs: 'absolute', sm: 'unset' },
      }}
    >
      <Checkbox
        color="warning"
        icon={<Iconify icon="eva:star-outline" />}
        checkedIcon={<Iconify icon="eva:star-fill" />}
        checked={favorite.value}
        onChange={favorite.onToggle}
        inputProps={{
          id: `favorite-${file.id}-checkbox`,
          'aria-label': `Favorite ${file.id} checkbox`,
        }}
      />

      <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Box>
  );

  const renderText = () => (
    <ListItemText
      onClick={detailsDrawer.onTrue}
      primary={file.name}
      secondary={
        <>
          {fData(file.size)}
          <Box
            sx={{
              mx: 0.75,
              width: 2,
              height: 2,
              borderRadius: '50%',
              bgcolor: 'currentColor',
            }}
          />
          {fDateTime(file.modifiedAt)}
        </>
      }
      slotProps={{
        primary: { noWrap: true },
        secondary: {
          sx: {
            mt: 0.5,
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
            display: 'inline-flex',
          },
        },
      }}
    />
  );

  const renderAvatar = () => (
    <AvatarGroup
      max={3}
      sx={{
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 24,
          height: 24,
          '&:first-of-type': { fontSize: 12 },
        },
      }}
    >
      {file.shared?.map((person) => (
        <Avatar key={person.id} alt={person.name} src={person.avatarUrl} />
      ))}
    </AvatarGroup>
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            menuActions.onClose();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy Link
        </MenuItem>

        <MenuItem
          onClick={() => {
            menuActions.onClose();
            shareDialog.onTrue();
          }}
        >
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            menuActions.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderFileDetailsDrawer = () => (
    <FileManagerFileDetails
      file={file}
      favorited={favorite.value}
      onFavorite={favorite.onToggle}
      onCopyLink={handleCopy}
      open={detailsDrawer.value}
      onClose={detailsDrawer.onFalse}
      onDelete={() => {
        detailsDrawer.onFalse();
        onDelete();
      }}
    />
  );

  const renderShareDialog = () => (
    <FileManagerShareDialog
      open={shareDialog.value}
      shared={file.shared}
      inviteEmail={inviteEmail}
      onChangeInvite={handleChangeInvite}
      onCopyLink={handleCopy}
      onClose={() => {
        shareDialog.onFalse();
        setInviteEmail('');
      }}
    />
  );

  return (
    <>
      <Paper
        variant="outlined"
        sx={[
          (theme) => ({
            gap: 2,
            borderRadius: 2,
            display: 'flex',
            cursor: 'pointer',
            position: 'relative',
            bgcolor: 'transparent',
            p: { xs: 2.5, sm: 2 },
            alignItems: { xs: 'unset', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            '&:hover': { bgcolor: 'background.paper', boxShadow: theme.vars.customShadows.z20 },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <FileThumbnail file={file.type} />

        {renderText()}
        {!!file?.shared?.length && renderAvatar()}
        {renderActions()}
      </Paper>

      {renderMenuActions()}
      {renderFileDetailsDrawer()}
      {renderShareDialog()}
    </>
  );
}
