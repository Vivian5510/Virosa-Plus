import type { IPostHero } from 'src/types/blog';
import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function PostDetailsHero({
  sx,
  title,
  author,
  coverUrl,
  createdAt,
  ...other
}: BoxProps & IPostHero) {
  const theme = useTheme();

  // 移除HTML标签
  const cleanTitle = title ? title.replace(/<\/?[^>]+(>|$)/g, "") : "";

  return (
    <Box
      sx={[
        {
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.64)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.64)})`,
              `url(${coverUrl})`,
            ],
          }),
          height: 480,
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container sx={{ height: 1, position: 'relative' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            zIndex: 9,
            maxWidth: 480,
            position: 'absolute',
            pt: { xs: 2, md: 8 },
            color: 'common.white',
          }}
        >
          {cleanTitle}
        </Typography>

        <Box
          sx={{
            left: 0,
            width: 1,
            bottom: 0,
            position: 'absolute',
          }}
        >
          {author && createdAt && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: { xs: 2, md: 3 },
                pb: { xs: 3, md: 8 },
              }}
            >
              <Avatar
                alt={author.name}
                src={author.avatarUrl}
                sx={{ width: 64, height: 64, mr: 2 }}
              />

              <ListItemText
                sx={{ color: 'common.white' }}
                primary={author.name}
                secondary={fDate(createdAt)}
                slotProps={{
                  primary: { sx: { typography: 'subtitle1' } },
                  secondary: { sx: { mt: 0.5, opacity: 0.64, color: 'inherit' } },
                }}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
