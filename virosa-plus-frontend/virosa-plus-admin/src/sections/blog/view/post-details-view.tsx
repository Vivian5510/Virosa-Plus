import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { EmptyContent } from 'src/components/empty-content';

import { PostDetailsSkeleton } from '../post-skeleton';
import { PostDetailsHero } from '../post-details-hero';
import { PostDetailsToolbar } from '../post-details-toolbar';
// 导入目录关联组件
import ArticlesToDirectory from '../../directory/articles-to-directory';

// ----------------------------------------------------------------------

type Props = {
  post?: IPostItem;
  loading?: boolean;
  error?: any;
};

export function PostDetailsView({ post, loading, error }: Props) {
  if (loading) {
    return (
      <DashboardContent maxWidth={false} disablePadding>
        <PostDetailsSkeleton />
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent maxWidth={false}>
        <EmptyContent
          filled
          title="文章未找到！"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.post.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              返回列表
            </Button>
          }
          sx={{ py: 10, height: 'auto', flexGrow: 'unset' }}
        />
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth={false} disablePadding>
      <Container maxWidth={false} sx={{ px: { sm: 5 } }}>
        <PostDetailsToolbar
          backHref={paths.dashboard.post.root}
          editHref={paths.dashboard.post.edit(`${post?.id}`)}
          liveHref={paths.dashboard.post.details(`${post?.id}`)}
        />
      </Container>

      <PostDetailsHero title={`${post?.title}`} coverUrl={`${post?.coverUrl}`} />

      <Container sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8, lg: 8 }}>
            <Box sx={{ pb: 5, width: '100%' }}>
              {/* 作者信息和标签 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                  pb: 2,
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                {/* 左侧作者信息 */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src="/assets/images/avatar/avatar_1.jpg"
                    alt={post?.author || 'Rosy'}
                    sx={{ width: 40, height: 40, mr: 1.5 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      作者：{post?.author || 'Rosy'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      发布时间：{post?.createdAt ? fDate(post.createdAt) : ''}
                    </Typography>
                  </Box>
                </Box>

                {/* 右侧标签 */}
                {post?.tags && post.tags.length > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {post.tags.map((tag) => (
                      <Chip key={tag} label={tag} variant="soft" size="small" sx={{ ml: 1, mt: 0.5, mb: 0.5 }} />
                    ))}
                  </Box>
                )}
              </Box>

              {/* 正文内容 */}
              <Markdown children={post?.content} />
            </Box>
          </Grid>

          {/* 右侧目录关联组件 */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                pr: { xs: 0, md: 3 },
              }}
            >
              {post && <ArticlesToDirectory post={post} />}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </DashboardContent>
  );
}
