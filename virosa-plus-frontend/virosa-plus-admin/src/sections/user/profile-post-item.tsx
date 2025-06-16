import type { IUserProfilePost } from 'src/types/user';

import { varAlpha } from 'minimal-shared/utils';
import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

import { useMockedUser } from 'src/auth/hooks';

// ----------------------------------------------------------------------

type Props = {
  post: IUserProfilePost;
};

export function ProfilePostItem({ post }: Props) {
  const { user } = useMockedUser();

  const commentRef = useRef<HTMLInputElement>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleClickComment = useCallback(() => {
    if (commentRef.current) {
      commentRef.current.focus();
    }
  }, []);

  const renderHead = () => (
    <CardHeader
      disableTypography
      avatar={
        <Avatar src={user?.photoURL} alt={user?.displayName}>
          {user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      }
      title={
        <Link color="inherit" variant="subtitle1">
          {user?.displayName}
        </Link>
      }
      subheader={
        <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
          {fDate(post.createdAt)}
        </Box>
      }
      action={
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      }
    />
  );

  const renderCommentList = () => (
    <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
      {post.comments.map((comment) => (
        <Box key={comment.id} sx={{ gap: 2, display: 'flex' }}>
          <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />

          <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
            <Box
              sx={{
                mb: 0.5,
                display: 'flex',
                alignItems: { sm: 'center' },
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Box sx={{ typography: 'subtitle2' }}>{comment.author.name}</Box>

              <Box sx={{ typography: 'caption', color: 'text.disabled' }}>
                {fDate(comment.createdAt)}
              </Box>
            </Box>

            <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{comment.message}</Box>
          </Paper>
        </Box>
      ))}
    </Stack>
  );

  const renderInput = () => (
    <Box
      sx={[
        (theme) => ({
          gap: 2,
          display: 'flex',
          alignItems: 'center',
          p: theme.spacing(0, 3, 3, 3),
        }),
      ]}
    >
      <Avatar src={user?.photoURL} alt={user?.displayName}>
        {user?.displayName?.charAt(0).toUpperCase()}
      </Avatar>

      <InputBase
        fullWidth
        value={message}
        inputRef={commentRef}
        placeholder="Write a comment…"
        onChange={handleChangeMessage}
        endAdornment={
          <InputAdornment position="end" sx={{ mr: 1 }}>
            <IconButton size="small" onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>

            <IconButton size="small">
              <Iconify icon="eva:smiling-face-fill" />
            </IconButton>
          </InputAdornment>
        }
        inputProps={{ id: `comment-${post.id}-input`, 'aria-label': `Comment ${post.id} input` }}
        sx={[
          (theme) => ({
            pl: 1.5,
            height: 40,
            borderRadius: 1,
            border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
          }),
        ]}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </Box>
  );

  const renderActions = () => (
    <Box
      sx={[(theme) => ({ display: 'flex', alignItems: 'center', p: theme.spacing(2, 3, 3, 3) })]}
    >
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            color="error"
            icon={<Iconify icon="solar:heart-bold" />}
            checkedIcon={<Iconify icon="solar:heart-bold" />}
            inputProps={{
              id: `favorite-${post.id}-checkbox`,
              'aria-label': `Favorite ${post.id} checkbox`,
            }}
          />
        }
        label={fShortenNumber(post.personLikes.length)}
        sx={{ mr: 1 }}
      />

      {!!post.personLikes.length && (
        <AvatarGroup sx={{ [`& .${avatarGroupClasses.avatar}`]: { width: 32, height: 32 } }}>
          {post.personLikes.map((person) => (
            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </AvatarGroup>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <IconButton onClick={handleClickComment}>
        <Iconify icon="solar:chat-round-dots-bold" />
      </IconButton>

      <IconButton>
        <Iconify icon="solar:share-bold" />
      </IconButton>
    </Box>
  );

  return (
    <Card>
      {renderHead()}

      <Typography variant="body2" sx={[(theme) => ({ p: theme.spacing(3, 3, 2, 3) })]}>
        {post.message}
      </Typography>

      <Box sx={{ p: 1 }}>
        <Image alt={post.media} src={post.media} ratio="16/9" sx={{ borderRadius: 1.5 }} />
      </Box>

      {renderActions()}
      {!!post.comments.length && renderCommentList()}
      {renderInput()}
    </Card>
  );
}
