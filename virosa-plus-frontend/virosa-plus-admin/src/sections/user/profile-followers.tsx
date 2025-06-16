import type { CardProps } from '@mui/material/Card';
import type { IUserProfileFollower } from 'src/types/user';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  followers: IUserProfileFollower[];
};

export function ProfileFollowers({ followers }: Props) {
  const _mockFollowed = followers.slice(4, 8).map((i) => i.id);

  const [followed, setFollowed] = useState<string[]>(_mockFollowed);

  const handleClick = useCallback(
    (item: string) => {
      const selected = followed.includes(item)
        ? followed.filter((value) => value !== item)
        : [...followed, item];

      setFollowed(selected);
    },
    [followed]
  );

  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Followers
      </Typography>

      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {followers.map((follower) => (
          <CardItem
            key={follower.id}
            follower={follower}
            selected={followed.includes(follower.id)}
            onSelected={() => handleClick(follower.id)}
          />
        ))}
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

type CardItemProps = CardProps & {
  selected: boolean;
  onSelected: () => void;
  follower: IUserProfileFollower;
};

function CardItem({ follower, selected, onSelected, sx, ...other }: CardItemProps) {
  return (
    <Card
      sx={[
        (theme) => ({
          display: 'flex',
          alignItems: 'center',
          p: theme.spacing(3, 2, 3, 3),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Avatar
        alt={follower?.name}
        src={follower?.avatarUrl}
        sx={{ width: 48, height: 48, mr: 2 }}
      />

      <ListItemText
        primary={follower?.name}
        secondary={
          <>
            <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
            {follower?.country}
          </>
        }
        slotProps={{
          primary: { noWrap: true },
          secondary: {
            noWrap: true,
            sx: {
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              typography: 'caption',
              color: 'text.disabled',
            },
          },
        }}
      />
      <Button
        size="small"
        variant={selected ? 'text' : 'outlined'}
        color={selected ? 'success' : 'inherit'}
        startIcon={
          selected ? <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} /> : null
        }
        onClick={onSelected}
        sx={{ flexShrink: 0, ml: 1.5 }}
      >
        {selected ? 'Followed' : 'Follow'}
      </Button>
    </Card>
  );
}
