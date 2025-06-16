import type { IUserProfileFriend } from 'src/types/user';

import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { _socials } from 'src/_mock';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  searchFriends: string;
  friends: IUserProfileFriend[];
  onSearchFriends: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ProfileFriends({ friends, searchFriends, onSearchFriends }: Props) {
  const dataFiltered = applyFilter({ inputData: friends, query: searchFriends });

  const notFound = !dataFiltered.length && !!searchFriends;

  return (
    <>
      <Box
        sx={{
          my: 5,
          gap: 2,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography variant="h4">Friends</Typography>

        <TextField
          value={searchFriends}
          onChange={onSearchFriends}
          placeholder="Search friends..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: { xs: 1, sm: 260 } }}
        />
      </Box>

      {notFound ? (
        <SearchNotFound query={searchFriends} sx={{ py: 10 }} />
      ) : (
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {dataFiltered.map((item) => (
            <FriendCard key={item.id} item={item} />
          ))}
        </Box>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type FriendCardProps = {
  item: IUserProfileFriend;
};

function FriendCard({ item }: FriendCardProps) {
  const menuActions = usePopover();

  const handleDelete = () => {
    menuActions.onClose();
    console.info('DELETE', item.name);
  };

  const handleEdit = () => {
    menuActions.onClose();
    console.info('EDIT', item.name);
  };

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar alt={item.name} src={item.avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} />

        <Link variant="subtitle1" color="text.primary">
          {item.name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 0.5 }}>
          {item.role}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {_socials.map((social) => (
            <IconButton key={social.label}>
              {social.value === 'facebook' && <FacebookIcon />}
              {social.value === 'instagram' && <InstagramIcon />}
              {social.value === 'linkedin' && <LinkedinIcon />}
              {social.value === 'twitter' && <TwitterIcon />}
            </IconButton>
          ))}
        </Box>

        <IconButton
          color={menuActions.open ? 'inherit' : 'default'}
          onClick={menuActions.onOpen}
          sx={{ top: 8, right: 8, position: 'absolute' }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Card>

      {renderMenuActions()}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  query: string;
  inputData: IUserProfileFriend[];
};

function applyFilter({ inputData, query }: ApplyFilterProps) {
  if (!query) return inputData;

  return inputData.filter(({ name, role }) =>
    [name, role].some((field) => field?.toLowerCase().includes(query.toLowerCase()))
  );
}
