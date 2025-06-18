import type { IPostItem, IPostFilters } from 'src/types/blog';

import { orderBy } from 'es-toolkit';
import { useSetState } from 'minimal-shared/hooks';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { POST_SORT_OPTIONS } from 'src/_mock';
import { useGetPosts } from 'src/actions/blog';
import { postService } from 'src/lib/api-adapter';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { TableNoData } from 'src/components/table';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';

// ----------------------------------------------------------------------

export function PostListView() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });

  const { state, setState } = useSetState<IPostFilters>({ publish: 'all' });

  // 获取数据
  const { posts, total, postsLoading, refetchPosts } = useGetPosts({
    pageNum: page,
    pageSize,
    publish: state.publish === 'all' ? '' : state.publish,
  });

  // 添加调试日志以查看获取的数据
  useEffect(() => {
    console.log('已获取文章数据:', { posts, total, isLoading: postsLoading });
    if (posts && posts.length > 0) {
      console.log('第一篇文章示例:', posts[0]);
    }
  }, [posts, total, postsLoading]);

  const handleFilterPublish = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      console.log('切换筛选状态:', newValue);
      setState({ publish: newValue });
      setPage(1); // 切换筛选条件时重置页码
    },
    [setState]
  );

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log('切换页码:', value);
    setPage(value);
  };

  const handleViewDetails = (id: string) => {
    console.log('查看文章详情:', id);
    router.push(paths.dashboard.post.details(id));
  };

  const handleEditPost = (id: string) => {
    console.log('编辑文章:', id);
    router.push(paths.dashboard.post.edit(id));
  };

  // 处理文章发布状态切换
  const handleTogglePublish = async (post: IPostItem) => {
    try {
      setIsLoading(true);
      // 切换状态
      const newStatus = post.publish === 'published' ? 'draft' : 'published';
      console.log(`切换文章 "${post.title}" (ID: ${post.id}) 的发布状态为: ${newStatus}`);
      console.log('文章当前信息:', post);

      // 使用专门的方法更新发布状态
      const response = await postService.updatePostPublishStatus(
        post.id,
        newStatus === 'published'
      );

      // 检查响应是否成功 - 兼容后端可能返回的两种成功代码格式
      const isSuccess = response.code === 200 || response.code === '0' || response.code === 0;

      if (isSuccess) {
        // 显示成功通知
        const successMessage = `文章已${newStatus === 'published' ? '发布' : '设为草稿'}`;
        console.log('状态更新成功:', successMessage);

        setNotification({
          open: true,
          message: successMessage,
          type: 'success',
        });

        // 刷新数据
        refetchPosts();
      } else {
        // API返回了非成功状态码
        throw new Error(response.msg || '操作未成功完成');
      }
    } catch (error) {
      console.error('切换文章发布状态失败:', error);
      setNotification({
        open: true,
        message: `操作失败: ${(error as Error).message || '未知错误'}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 关闭通知
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // 前端筛选和排序
  const filteredByPublish =
    state.publish === 'all' ? posts : posts.filter((post) => post.publish === state.publish);

  console.log('筛选结果:', {
    全部文章: posts.length,
    当前筛选: state.publish,
    筛选后数量: filteredByPublish.length,
    已发布数: posts.filter((p) => p.publish === 'published').length,
    草稿数: posts.filter((p) => p.publish === 'draft').length,
  });

  // 应用排序
  const dataFiltered = applyFilter({ inputData: filteredByPublish, sortBy });

  // 根据筛选后的数据计算页数
  const filteredTotal = state.publish === 'all' ? total : filteredByPublish.length;
  const totalPages = Math.ceil(filteredTotal / pageSize);

  // 计算不同状态的文章数量，用于Tab显示
  const publishedCount = posts.filter((post) => post.publish === 'published').length;
  const draftCount = posts.filter((post) => post.publish === 'draft').length;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="文章管理"
        links={[{ name: '控制面板', href: paths.dashboard.root }, { name: '文章管理' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.post.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            新建文章
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box
          sx={{
            p: 3,
            gap: 3,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-end', sm: 'center' },
          }}
        >
          <PostSearch redirectPath={(id: string) => paths.dashboard.post.details(id)} />

          <PostSort
            sort={sortBy}
            onSort={(newValue: string) => setSortBy(newValue)}
            sortOptions={POST_SORT_OPTIONS}
          />
        </Box>

        <Tabs value={state.publish} onChange={handleFilterPublish} sx={{ px: 3 }}>
          {['all', 'published', 'draft'].map((tab) => (
            <Tab
              key={tab}
              iconPosition="end"
              value={tab}
              label={tab === 'all' ? '全部' : tab === 'published' ? '已发布' : '草稿'}
              icon={
                <Label
                  variant={((tab === 'all' || tab === state.publish) && 'filled') || 'soft'}
                  color={
                    (tab === 'published' && 'info') || (tab === 'draft' && 'warning') || 'default'
                  }
                >
                  {tab === 'all' && (posts.length || 0)}
                  {tab === 'published' && publishedCount}
                  {tab === 'draft' && draftCount}
                </Label>
              }
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>标题</TableCell>
                <TableCell>创建时间</TableCell>
                <TableCell>状态</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postsLoading || isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : dataFiltered.length ? (
                dataFiltered.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        noWrap
                        sx={{
                          maxWidth: 360,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleViewDetails(post.id)}
                      >
                        {post.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{fDate(post.createdAt)}</TableCell>
                    <TableCell>
                      <Label
                        variant="soft"
                        color={post.publish === 'published' ? 'success' : 'warning'}
                      >
                        {post.publish === 'published' ? '已发布' : '草稿'}
                      </Label>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={post.publish === 'published' ? '设为草稿' : '发布'}>
                        <IconButton
                          onClick={() => handleTogglePublish(post)}
                          color={post.publish === 'published' ? 'default' : 'success'}
                        >
                          <Iconify
                            icon={
                              post.publish === 'published'
                                ? 'solar:file-corrupted-bold'
                                : 'solar:file-check-bold'
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="查看详情">
                        <IconButton onClick={() => handleViewDetails(post.id)}>
                          <Iconify icon="solar:eye-bold" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="编辑">
                        <IconButton onClick={() => handleEditPost(post.id)}>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableNoData notFound={!postsLoading && posts.length === 0} />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Stack alignItems="center" sx={{ py: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Stack>
        )}
      </Card>

      {/* 操作结果通知 */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type === 'success' ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IPostItem[];
  sortBy: string;
};

function applyFilter({ inputData, sortBy }: ApplyFilterProps) {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  return inputData;
}
