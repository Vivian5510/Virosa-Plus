import type { IPostItem } from 'src/types/blog';
import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { AvatarShape } from 'src/assets/illustrations';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

type PostItemProps = CardProps & {
  post: IPostItem;
  detailsHref: string;
};

export function PostItem({ post, detailsHref, sx, ...other }: PostItemProps) {
  return (
    <Card sx={sx} {...other}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            zIndex: 9,
            width: 88,
            height: 36,
            bottom: -16,
            position: 'absolute',
          }}
        />

        <Avatar
          alt={post.author}
          src="/assets/images/avatar/avatar_1.jpg"
          sx={{
            left: 24,
            zIndex: 9,
            bottom: -24,
            position: 'absolute',
          }}
        />

        <Image alt={post.title} src={post.coverUrl} ratio="4/3" />
      </Box>

      <CardContent sx={{ pt: 6 }}>
        <Typography variant="caption" component="div" sx={{ mb: 1, color: 'text.disabled' }}>
          {fDate(post.createdAt)}
        </Typography>

        <Link
          component={RouterLink}
          href={detailsHref}
          color="inherit"
          variant="subtitle2"
          sx={(theme) => ({
            ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
          })}
        >
          {post.title}
        </Link>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostItemLatestProps = {
  post: IPostItem;
  index: number;
  detailsHref: string;
};

export function PostItemLatest({ post, index, detailsHref }: PostItemLatestProps) {
  const postSmall = index === 1 || index === 2;

  return (
    <Card>
      <Avatar
        alt={post.author}
        src="/assets/images/avatar/avatar_1.jpg"
        sx={{
          top: 24,
          left: 24,
          zIndex: 9,
          position: 'absolute',
        }}
      />

      <Image
        alt={post.title}
        src={post.coverUrl}
        ratio="4/3"
        sx={{ height: 360 }}
        slotProps={{
          overlay: {
            sx: (theme) => ({
              bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.64),
            }),
          },
        }}
      />

      <CardContent
        sx={{
          width: 1,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="caption" component="div" sx={{ mb: 1, opacity: 0.64 }}>
          {fDate(post.createdAt)}
        </Typography>

        <Link
          component={RouterLink}
          href={detailsHref}
          color="inherit"
          variant={postSmall ? 'subtitle2' : 'h5'}
          sx={(theme) => ({
            ...theme.mixins.maxLine({
              line: 2,
              persistent: postSmall ? theme.typography.subtitle2 : theme.typography.h5,
            }),
          })}
        >
          {post.title}
        </Link>
      </CardContent>
    </Card>
  );
}
