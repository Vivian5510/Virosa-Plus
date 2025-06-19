import type { INodeItem } from 'src/types/node';
import type { TreeViewBaseItem } from '@mui/x-tree-view/models';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { alpha, useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import {
  Menu,
  Paper,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { nodeService } from 'src/lib/api-adapter';

import { Iconify } from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { EmptyContent } from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { NodeType } from 'src/types/node';

// ----------------------------------------------------------------------

export default function DirectoryTreeView() {
  const theme = useTheme();
  const router = useRouter();
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [nodeData, setNodeData] = useState<INodeItem[]>([]);
  const [selectedNode, setSelectedNode] = useState<INodeItem | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    nodeId: string | null;
  } | null>(null);

  // 对话框状态
  const confirm = useBoolean();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newDirName, setNewDirName] = useState('');
  const [parentId, setParentId] = useState<string | number | undefined>(undefined);

  // 将节点数据转换为树形视图所需的格式
  const convertToTreeItems = (nodes: INodeItem[]): TreeViewBaseItem[] =>
    nodes.map((node) => ({
      id: String(node.id),
      label: node.name || '未命名',
      children: node.children ? convertToTreeItems(node.children) : [],
      data: node,
    }));

  // 获取节点树数据
  const fetchNodeTree = useCallback(async () => {
    try {
      setLoading(true);
      console.log('开始从directory-tree-view组件获取节点树...');
      const data = await nodeService.getNodeTree();
      console.log('组件成功获取节点树数据:', data);

      // 如果返回的是空数组，可能是出错了但被处理了
      if (!data || data.length === 0) {
        enqueueSnackbar('获取目录树为空或失败，请检查权限设置', { variant: 'warning' });
      }

      setNodeData(data);
      setLoading(false);
    } catch (error: any) {
      console.error('获取节点树失败:', error);
      enqueueSnackbar(`获取目录树失败: ${error?.message || '未知错误'}`, { variant: 'error' });
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  // 处理节点选择
  const handleNodeSelect = useCallback(
    (event: React.SyntheticEvent, nodeId: string) => {
      setSelected(nodeId);

      const findNode = (treeNodes: INodeItem[], id: string): INodeItem | null => {
        for (const node of treeNodes) {
          if (String(node.id) === id) return node;
          if (node.children && node.children.length > 0) {
            const found = findNode(node.children, id);
            if (found) return found;
          }
        }
        return null;
      };

      const node = findNode(nodeData, nodeId);
      setSelectedNode(node);

      // 如果是文件类型节点，跳转到文章详情页
      if (node && node.type === NodeType.FILE && node.articleId) {
        router.push(paths.dashboard.post.details(String(node.articleId)));
      }
    },
    [nodeData, router]
  );

  // 处理展开/收起节点
  const handleToggle = useCallback((event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  }, []);

  // 打开创建节点对话框
  const handleOpenCreateDialog = (pid: string | number | undefined = undefined) => {
    setParentId(pid);
    setNewDirName('');
    setOpenCreateDialog(true);
  };

  // 打开编辑节点对话框
  const handleOpenEditDialog = () => {
    if (selectedNode) {
      setNewDirName(selectedNode.name || '');
      setOpenEditDialog(true);
    } else {
      enqueueSnackbar('请先选择一个节点', { variant: 'warning' });
    }
  };

  // 关闭对话框
  const handleCloseDialog = () => {
    setOpenCreateDialog(false);
    setOpenEditDialog(false);
  };

  // 创建目录
  const handleCreateDirectory = async () => {
    if (!newDirName.trim()) {
      enqueueSnackbar('目录名称不能为空', { variant: 'error' });
      return;
    }

    try {
      await nodeService.createDirectory(newDirName, parentId);
      enqueueSnackbar('目录创建成功', { variant: 'success' });
      handleCloseDialog();
      fetchNodeTree();
    } catch (error) {
      enqueueSnackbar('目录创建失败', { variant: 'error' });
      console.error(error);
    }
  };

  // 更新节点
  const handleUpdateNode = async () => {
    if (!newDirName.trim() || !selectedNode) {
      enqueueSnackbar('节点名称不能为空', { variant: 'error' });
      return;
    }

    try {
      await nodeService.updateNode({
        id: selectedNode.id,
        name: newDirName,
      });
      enqueueSnackbar('节点更新成功', { variant: 'success' });
      handleCloseDialog();
      fetchNodeTree();
    } catch (error) {
      enqueueSnackbar('节点更新失败', { variant: 'error' });
      console.error(error);
    }
  };

  // 处理删除节点
  const handleDeleteNode = useCallback(async () => {
    if (!selectedNode) return;

    try {
      await nodeService.deleteNode(selectedNode.id);
      enqueueSnackbar('删除成功', { variant: 'success' });
      fetchNodeTree();
      setSelectedNode(null);
      setSelected('');
      confirm.onFalse();
    } catch (error) {
      console.error('删除节点失败:', error);
      enqueueSnackbar('删除失败', { variant: 'error' });
    }
  }, [selectedNode, enqueueSnackbar, fetchNodeTree, confirm]);

  // 处理右键菜单
  const handleContextMenu = (event: React.MouseEvent, nodeId: string) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      nodeId,
    });

    // 设置当前选中节点
    const findNode = (treeNodes: INodeItem[], id: string): INodeItem | null => {
      for (const node of treeNodes) {
        if (String(node.id) === id) return node;
        if (node.children && node.children.length > 0) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNode(nodeData, nodeId);
    setSelectedNode(node);
    setSelected(nodeId);
  };

  // 关闭右键菜单
  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  // 处理视图模式切换
  const handleChangeViewMode = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'tree' | 'grid' | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // 渲染网格视图的节点卡片
  const renderNodeCard = (node: INodeItem) => (
    <Grid item xs={12} sm={6} md={4} key={node.id}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          cursor: 'pointer',
          borderRadius: 2,
          position: 'relative',
          transition: 'all 0.2s',
          bgcolor:
            selected === String(node.id)
              ? alpha(theme.palette.primary.lighter, 0.16)
              : 'background.paper',
          borderColor:
            selected === String(node.id) ? theme.palette.primary.main : theme.palette.divider,
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.lighter, 0.08),
            boxShadow: theme.shadows[2],
          },
        }}
        onClick={(e) => handleNodeSelect(e, String(node.id))}
        onContextMenu={(e) => handleContextMenu(e, String(node.id))}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: node.type === NodeType.DIRECTORY ? 'warning.lighter' : 'info.lighter',
            }}
          >
            <Iconify
              icon={node.type === NodeType.DIRECTORY ? 'solar:folder-bold' : 'solar:file-bold'}
              sx={{
                width: 24,
                height: 24,
                color: node.type === NodeType.DIRECTORY ? 'warning.main' : 'info.main',
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              {node.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {node.type === NodeType.DIRECTORY
                ? `${node.children?.length || 0} 个子项`
                : node.articleId
                  ? '文章'
                  : '文件'}
            </Typography>
          </Box>
          <IconButton
            size="small"
            color="default"
            onClick={(e) => {
              e.stopPropagation();
              handleContextMenu(e, String(node.id));
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Paper>
    </Grid>
  );

  // 递归渲染网格视图的节点和其子节点
  const renderNodeGridRecursive = (nodes: INodeItem[], level: number = 0) => {
    if (!nodes || nodes.length === 0) return null;

    return (
      <>
        <Grid container spacing={2} sx={{ mt: level > 0 ? 2 : 0 }}>
          {nodes.map((node) => renderNodeCard(node))}
        </Grid>

        {nodes.map(
          (node) =>
            node.type === NodeType.DIRECTORY &&
            node.children &&
            node.children.length > 0 && (
              <Box key={`children-${node.id}`} sx={{ mt: 3, ml: level > 0 ? 3 : 0 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Iconify icon="solar:folder-bold" sx={{ color: 'warning.main' }} />
                  <Typography variant="subtitle1">{node.name} 下的内容</Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                {renderNodeGridRecursive(node.children, level + 1)}
              </Box>
            )
        )}
      </>
    );
  };

  useEffect(() => {
    fetchNodeTree();
  }, [fetchNodeTree]);

  // 自定义树节点渲染
  const renderTree = (treeNodes: INodeItem[]) =>
    treeNodes.map((node) => (
      <TreeItem
        key={node.id}
        itemId={String(node.id)}
        onContextMenu={(e) => handleContextMenu(e, String(node.id))}
        onClick={(e) => handleNodeSelect(e, String(node.id))}
        label={
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              py: 1,
              borderRadius: 1,
              '&:hover': {
                // bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <Iconify
              icon={node.type === NodeType.DIRECTORY ? 'solar:folder-bold' : 'solar:file-bold'}
              sx={{
                color: node.type === NodeType.DIRECTORY ? 'warning.main' : 'info.main',
                mr: 1,
              }}
            />
            <Typography variant="body2" noWrap>
              {node.name}
            </Typography>
          </Stack>
        }
      >
        {node.children && node.children.length > 0 && renderTree(node.children)}
      </TreeItem>
    ));

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="目录树"
        links={[
          { name: '控制台', href: paths.dashboard.root },
          { name: '目录管理', href: paths.dashboard.directory.root },
          { name: '目录树' },
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2.5, bgcolor: 'background.neutral' }}
        >
          <Typography variant="h6">目录结构</Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              size="small"
              exclusive
              value={viewMode}
              onChange={handleChangeViewMode}
            >
              <ToggleButton value="tree" aria-label="树状视图">
                <Iconify icon="mdi:view-list-outline" width={20} height={20} />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="网格视图">
                <Iconify icon="mdi:view-grid-outline" width={20} height={20} />
              </ToggleButton>
            </ToggleButtonGroup>

            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                color="primary"
                startIcon={<Iconify icon="solar:add-folder-bold" />}
                onClick={() => handleOpenCreateDialog()}
              >
                新建根目录
              </Button>
              {selectedNode && (
                <>
                  {selectedNode.type === NodeType.DIRECTORY && (
                    <Button
                      size="small"
                      color="info"
                      startIcon={<Iconify icon="solar:add-square-bold" />}
                      onClick={() => handleOpenCreateDialog(selectedNode.id)}
                    >
                      添加子目录
                    </Button>
                  )}
                  <Button
                    size="small"
                    color="secondary"
                    startIcon={<Iconify icon="solar:pen-bold" />}
                    onClick={handleOpenEditDialog}
                  >
                    重命名
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    onClick={confirm.onTrue}
                  >
                    删除
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        <Box sx={{ p: 2.5, minHeight: 400 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : nodeData.length > 0 ? (
            viewMode === 'tree' ? (
              <Paper
                variant="outlined"
                sx={{
                  height: 480,
                  overflow: 'auto',
                  borderRadius: 1.5,
                  bgcolor: 'background.default',
                  p: 2,
                }}
              >
                <SimpleTreeView
                  sx={{
                    height: '100%',
                    flexGrow: 1,
                    overflowY: 'auto',
                    '& .MuiTreeItem-content': {
                      py: 1,
                      borderRadius: 0.75,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.lighter, 0.16),
                      },
                      '&.Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.16),
                      },
                      transition: 'all 0.2s',
                    },
                  }}
                >
                  {renderTree(nodeData)}
                </SimpleTreeView>
              </Paper>
            ) : (
              <Box sx={{ height: 480, overflow: 'auto', p: 1 }}>
                {renderNodeGridRecursive(nodeData)}
              </Box>
            )
          ) : (
            <EmptyContent
              filled
              title="没有目录数据"
              description="创建您的第一个目录"
              action={
                <Button
                  component={RouterLink}
                  href={paths.dashboard.directory.new}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  创建第一个目录
                </Button>
              }
              sx={{ py: 10 }}
            />
          )}
        </Box>
      </Card>

      {/* 右键菜单 */}
      <Menu
        open={!!contextMenu}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        {selectedNode && selectedNode.type === NodeType.DIRECTORY && (
          <MenuItem
            onClick={() => {
              handleOpenCreateDialog(selectedNode.id);
              handleCloseContextMenu();
            }}
          >
            <ListItemIcon>
              <Iconify icon="solar:add-folder-bold" />
            </ListItemIcon>
            <ListItemText>添加子目录</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleOpenEditDialog();
            handleCloseContextMenu();
          }}
        >
          <ListItemIcon>
            <Iconify icon="solar:pen-bold" />
          </ListItemIcon>
          <ListItemText>重命名</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            handleCloseContextMenu();
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </ListItemIcon>
          <ListItemText>删除</ListItemText>
        </MenuItem>
        {selectedNode && selectedNode.type === NodeType.FILE && selectedNode.articleId && (
          <MenuItem
            onClick={() => {
              router.push(paths.dashboard.post.details(String(selectedNode.articleId)));
              handleCloseContextMenu();
            }}
          >
            <ListItemIcon>
              <Iconify icon="solar:eye-bold" />
            </ListItemIcon>
            <ListItemText>查看文章</ListItemText>
          </MenuItem>
        )}
      </Menu>

      {/* 新建目录对话框 */}
      <Dialog open={openCreateDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle sx={{ pb: 2 }}>{parentId ? '创建子目录' : '创建根目录'}</DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 3 }}>
          <TextField
            autoFocus
            fullWidth
            label="目录名称"
            value={newDirName}
            onChange={(e) => setNewDirName(e.target.value)}
            margin="normal"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button variant="contained" color="primary" onClick={handleCreateDirectory}>
            创建
          </Button>
        </DialogActions>
      </Dialog>

      {/* 编辑节点对话框 */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle sx={{ pb: 2 }}>编辑节点</DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 3 }}>
          <TextField
            autoFocus
            fullWidth
            label="节点名称"
            value={newDirName}
            onChange={(e) => setNewDirName(e.target.value)}
            margin="normal"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button variant="contained" color="primary" onClick={handleUpdateNode}>
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 删除确认对话框 */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="删除"
        content={
          <>
            确定要删除 <strong>{selectedNode?.name}</strong> 吗?
            {selectedNode?.type === NodeType.DIRECTORY &&
              (selectedNode?.children?.length || 0) > 0 && (
                <Typography variant="body2" sx={{ mt: 1, color: 'error.main' }}>
                  注意：删除目录将同时删除其下所有子目录和文件！
                </Typography>
              )}
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={handleDeleteNode}>
            删除
          </Button>
        }
      />
    </Container>
  );
}
