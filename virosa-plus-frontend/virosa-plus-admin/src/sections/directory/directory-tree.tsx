import type { INodeItem } from 'src/types/blog';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

import { nodeService } from 'src/lib/api-adapter';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { DirectoryItemSkeleton } from './directory-skeleton';

// ----------------------------------------------------------------------

type Props = {
  nodes: INodeItem[];
  loading?: boolean;
  onRefresh?: () => void;
};

// ----------------------------------------------------------------------

const renderTree = (items: INodeItem[]) =>
  items.map((node) => (
    <TreeItem
      key={node.id}
      itemId={String(node.id)}
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify
            icon={node.type === 0 ? 'solar:folder-bold' : 'solar:file-bold'}
            sx={{ color: node.type === 0 ? 'warning.main' : 'info.main' }}
          />
          <Typography variant="body2" noWrap>
            {node.name || node.title}
          </Typography>
        </Stack>
      }
    >
      {node.children && node.children.length > 0 && renderTree(node.children)}
    </TreeItem>
  ));

export function DirectoryTree({ nodes, loading, onRefresh }: Props) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newDirName, setNewDirName] = useState('');
  const [parentId, setParentId] = useState<string | number | undefined>(undefined);
  const [currentNode, setCurrentNode] = useState<INodeItem | null>(null);

  const handleToggle = useCallback((event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  }, []);

  const handleSelect = useCallback(
    (event: React.SyntheticEvent, nodeId: string) => {
      setSelected(nodeId);

      // 查找选中的节点
      const findNode = (items: INodeItem[]): INodeItem | null => {
        for (const node of items) {
          if (node.id.toString() === nodeId) {
            return node;
          }
          if (node.children && node.children.length > 0) {
            const found = findNode(node.children);
            if (found) return found;
          }
        }
        return null;
      };

      const selectedNode = findNode(nodes);
      setCurrentNode(selectedNode);
    },
    [nodes]
  );

  const handleOpenCreateDialog = (pid: string | number | undefined = undefined) => {
    setParentId(pid);
    setNewDirName('');
    setOpenCreateDialog(true);
  };

  const handleOpenEditDialog = () => {
    if (currentNode) {
      setNewDirName(currentNode.name || currentNode.title || '');
      setOpenEditDialog(true);
    } else {
      toast.warning('请先选择一个目录节点');
    }
  };

  const handleCloseDialog = () => {
    setOpenCreateDialog(false);
    setOpenEditDialog(false);
  };

  const handleCreateDirectory = async () => {
    if (!newDirName.trim()) {
      toast.error('目录名称不能为空');
      return;
    }

    try {
      await nodeService.createDirectory(newDirName, parentId);
      toast.success('目录创建成功');
      handleCloseDialog();
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error('目录创建失败');
      console.error(error);
    }
  };

  const handleEditDirectory = async () => {
    if (!newDirName.trim() || !currentNode) {
      toast.error('目录名称不能为空');
      return;
    }

    try {
      await nodeService.updateNode(currentNode.id, {
        ...currentNode,
        name: newDirName,
      });
      toast.success('目录更新成功');
      handleCloseDialog();
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error('目录更新失败');
      console.error(error);
    }
  };

  const handleDeleteDirectory = async () => {
    if (!currentNode) {
      toast.warning('请先选择一个目录节点');
      return;
    }

    if (window.confirm('确定要删除这个目录吗？删除后不可恢复。')) {
      try {
        await nodeService.deleteNode(currentNode.id);
        toast.success('目录删除成功');
        setSelected('');
        setCurrentNode(null);
        if (onRefresh) onRefresh();
      } catch (error) {
        toast.error('目录删除失败');
        console.error(error);
      }
    }
  };

  const renderLoading = () => (
    <Stack spacing={3} sx={{ p: 3 }}>
      <DirectoryItemSkeleton />
      <DirectoryItemSkeleton />
      <DirectoryItemSkeleton />
    </Stack>
  );

  const renderEmptyContent = () => (
    <EmptyContent filled title="没有目录" description="创建您的第一个目录" sx={{ py: 10 }} />
  );

  const renderDirectoryActions = () => (
    <Box sx={{ mt: 3 }}>
      <Button
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => handleOpenCreateDialog(undefined)}
      >
        新建根目录
      </Button>

      {currentNode && (
        <>
          {currentNode.type === 0 && (
            <Button
              sx={{ ml: 1 }}
              variant="outlined"
              startIcon={<Iconify icon="solar:folder-add-bold" />}
              onClick={() => handleOpenCreateDialog(currentNode.id)}
            >
              新建子目录
            </Button>
          )}

          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            color="info"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={handleOpenEditDialog}
          >
            编辑
          </Button>

          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            color="error"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={handleDeleteDirectory}
          >
            删除
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <>
      <Card>
        <CardHeader title="目录管理" />
        <Divider />

        {loading && renderLoading()}

        {!loading && nodes.length === 0 && renderEmptyContent()}

        {!loading && nodes.length > 0 && (
          <Stack spacing={3} sx={{ p: 3 }}>
            <SimpleTreeView sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: 400 }}>
              {renderTree(nodes)}
            </SimpleTreeView>

            {renderDirectoryActions()}
          </Stack>
        )}
      </Card>

      {/* 创建目录对话框 */}
      <Dialog open={openCreateDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>{parentId ? '创建子目录' : '创建根目录'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            fullWidth
            label="目录名称"
            value={newDirName}
            onChange={(e) => setNewDirName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button variant="contained" color="primary" onClick={handleCreateDirectory}>
            创建
          </Button>
        </DialogActions>
      </Dialog>

      {/* 编辑目录对话框 */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>编辑目录</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            fullWidth
            label="目录名称"
            value={newDirName}
            onChange={(e) => setNewDirName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button variant="contained" color="primary" onClick={handleEditDirectory}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
