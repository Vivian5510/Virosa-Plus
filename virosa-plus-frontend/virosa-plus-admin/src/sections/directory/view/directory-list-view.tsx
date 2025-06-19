import type { INodeItem } from 'src/types/node';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { nodeService } from 'src/lib/api-adapter';

import { useTable } from 'src/components/table';
import { Iconify } from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: '名称', width: 200 },
  { id: 'type', label: '类型', width: 120 },
  { id: 'parentId', label: '父目录', width: 200 },
  { id: 'articleId', label: '关联文章', width: 200 },
  { id: 'createTime', label: '创建时间', width: 160 },
  { id: 'status', label: '状态', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

const defaultFilters = {
  name: '',
  parentId: null,
  type: 'all',
};

// ----------------------------------------------------------------------

export default function DirectoryListView() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useBoolean();

  const [tableData, setTableData] = useState<INodeItem[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const table = useTable({
    defaultOrderBy: 'createTime',
    defaultOrder: 'desc',
  });

  const fetchNodes = useCallback(async () => {
    try {
      setLoading(true);

      // 构建查询参数
      const params = {
        pageNum: table.page + 1, // 后端分页从1开始
        pageSize: table.rowsPerPage,
        title: filters.name || undefined,
        parentId: filters.parentId || undefined,
        // 根据需要添加其他过滤参数
      };

      // 调用API获取数据
      const { nodes, total } = await nodeService.getNodeList(params);

      setTableData(nodes);
      setTotalCount(total);
      setLoading(false);
    } catch (error) {
      console.error('获取节点列表失败:', error);
      enqueueSnackbar('获取目录列表失败', { variant: 'error' });
      setLoading(false);
    }
  }, [table.page, table.rowsPerPage, filters, enqueueSnackbar]);

  useEffect(() => {
    fetchNodes();
  }, [fetchNodes]);

  const handleFiltersChange = useCallback(
    (name: string, value: any) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id: string | number) => {
      setDeleteId(id);
      confirm.onTrue();
    },
    [confirm]
  );

  const handleDeleteConfirm = useCallback(async () => {
    try {
      if (deleteId) {
        await nodeService.deleteNode(deleteId);
        enqueueSnackbar('删除成功');
        fetchNodes();
      }
    } catch (error) {
      console.error('删除节点失败:', error);
      enqueueSnackbar('删除失败', { variant: 'error' });
    } finally {
      confirm.onFalse();
      setDeleteId(null);
    }
  }, [deleteId, enqueueSnackbar, fetchNodes, confirm]);

  const handleEditRow = useCallback(
    (id: string | number) => {
      router.push(paths.dashboard.directory.edit(String(id)));
    },
    [router]
  );

  const handleViewDetails = useCallback(
    (id: string | number) => {
      router.push(paths.dashboard.directory.details(String(id)));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="目录列表"
        links={[
          { name: '控制台', href: paths.dashboard.root },
          { name: '目录管理', href: paths.dashboard.directory.root },
          { name: '目录列表' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.directory.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            新建目录
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box p={3} textAlign="center">
          <Typography variant="h6" paragraph>
            目录树形视图更直观
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            href={paths.dashboard.directory.tree}
          >
            查看目录树
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
