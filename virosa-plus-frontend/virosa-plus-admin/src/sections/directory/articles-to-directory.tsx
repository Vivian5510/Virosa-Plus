import type { INodeItem, IPostItem } from 'src/types/blog';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

import { nodeService, postService } from 'src/lib/api-adapter';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

// 简单的骨架屏组件
const DirectoryItemSkeleton = () => (
    <Stack direction="row" alignItems="center" spacing={2}>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="text" width={120} height={24} />
        <Box sx={{ flexGrow: 1 }} />
        <Skeleton variant="rectangular" width={60} height={24} />
    </Stack>
);

// ----------------------------------------------------------------------

type ArticlesToDirectoryProps = {
    post?: IPostItem;
    articleId?: string;
};

export default function ArticlesToDirectory({ post, articleId }: ArticlesToDirectoryProps) {
    const [currentTab, setCurrentTab] = useState('目录树');
    const [nodes, setNodes] = useState<INodeItem[]>([]);
    const [articleNodes, setArticleNodes] = useState<INodeItem[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [articleLoading, setArticleLoading] = useState(true);

    // 获取所有目录树
    const fetchNodeTree = useCallback(async () => {
        try {
            setLoading(true);
            const response = await nodeService.getNodeTree();
            setNodes(response || []);
        } catch (error) {
            console.error('获取目录树失败', error);
            toast.error('获取目录树失败');
        } finally {
            setLoading(false);
        }
    }, []);

    // 获取当前文章关联的目录
    const fetchArticleNodes = useCallback(async () => {
        // 使用传入的articleId或文章对象中的id
        const id = articleId || post?.id;
        if (!id) return;

        try {
            setArticleLoading(true);
            // 假设后端API提供了获取文章关联目录的功能
            const response = await postService.getArticleDirectories(id);
            setArticleNodes(response || []);
        } catch (error) {
            console.error('获取文章关联目录失败', error);
            toast.error('获取文章关联目录失败');
        } finally {
            setArticleLoading(false);
        }
    }, [articleId, post?.id]);

    useEffect(() => {
        fetchNodeTree();
        const id = articleId || post?.id;
        if (id) {
            fetchArticleNodes();
        }
    }, [fetchNodeTree, fetchArticleNodes, articleId, post?.id]);

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    // 添加文章到目录
    const handleAddToDirectory = async () => {
        const id = articleId || post?.id;
        if (!id || !selectedNodeId) {
            toast.warning('请先选择一个目录');
            return;
        }

        // 检查是否已关联
        const isAlreadyLinked = articleNodes.some((node) => node.id.toString() === selectedNodeId);
        if (isAlreadyLinked) {
            toast.info('该文章已关联到此目录');
            return;
        }

        try {
            // 假设这里的API是关联文章到目录
            await postService.addArticleToDirectory(id, selectedNodeId);
            toast.success('文章关联到目录成功');
            await fetchArticleNodes(); // 刷新数据
        } catch (error) {
            console.error('关联文章到目录失败', error);
            toast.error('关联文章到目录失败');
        }
    };

    // 移除文章从目录的关联
    const handleRemoveFromDirectory = async (nodeId: string) => {
        const id = articleId || post?.id;
        if (!id) return;

        try {
            // 假设这里的API是删除文章与目录的关联
            await nodeService.removeArticleFromDirectory(nodeId);
            toast.success('文章从目录移除成功');
            await fetchArticleNodes(); // 刷新数据
        } catch (error) {
            console.error('移除文章与目录关联失败', error);
            toast.error('移除文章与目录关联失败');
        }
    };

    // 处理节点点击
    const handleNodeClick = (event: React.SyntheticEvent, nodeId: string) => {
        setSelectedNodeId(nodeId);
    };

    const renderTree = (items: INodeItem[]) =>
        items.map((node) => (
            <TreeItem
                key={node.id}
                itemId={String(node.id)}
                label={
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
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

    const renderArticleNodes = (items: INodeItem[]) => {
        if (items.length === 0) {
            return (
                <EmptyContent title="暂无关联目录" description="此文章尚未关联到任何目录" sx={{ py: 5 }} />
            );
        }

        return items.map((node) => (
            <Stack
                key={node.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    p: 1.5,
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: 'background.neutral',
                    '&:hover': {
                        bgcolor: 'background.paper',
                        boxShadow: (theme) => theme.shadows[2]
                    }
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:folder-bold" sx={{ color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="body2">{node.name || node.title}</Typography>
                </Stack>
                <Button
                    size="small"
                    color="error"
                    startIcon={<Iconify icon="mdi:link-off" />}
                    onClick={() => handleRemoveFromDirectory(node.id.toString())}
                >
                    取消关联
                </Button>
            </Stack>
        ));
    };

    const renderLoading = () => (
        <Stack spacing={3} sx={{ p: 3 }}>
            <DirectoryItemSkeleton />
            <DirectoryItemSkeleton />
            <DirectoryItemSkeleton />
        </Stack>
    );

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 380
        }}>
            <CardHeader
                title="目录关联"
                sx={{
                    pb: 1,
                    '& .MuiCardHeader-title': {
                        fontSize: '1.125rem',
                        fontWeight: 'bold'
                    }
                }}
            />

            <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                sx={{
                    px: 2,
                    '& .MuiTab-root': {
                        fontWeight: 'medium'
                    }
                }}
            >
                <Tab value="目录树" label="选择目录" />
                <Tab value="已关联" label="已关联目录" />
            </Tabs>

            <Divider />

            {currentTab === '目录树' ? (
                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {loading ? (
                        renderLoading()
                    ) : (
                        <SimpleTreeView
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                maxHeight: 400,
                                minHeight: 200,
                                border: (theme: any) => `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                p: 2
                            }}
                            onItemClick={handleNodeClick}
                        >
                            {nodes.length > 0 ? (
                                renderTree(nodes)
                            ) : (
                                <EmptyContent title="无可用目录" description="请先创建目录" sx={{ py: 5 }} />
                            )}
                        </SimpleTreeView>
                    )}

                    {!loading && nodes.length > 0 && (
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!selectedNodeId}
                            startIcon={<Iconify icon="mdi:link-plus" />}
                            onClick={handleAddToDirectory}
                            sx={{ mt: 2, alignSelf: 'flex-start' }}
                        >
                            关联到此目录
                        </Button>
                    )}
                </Box>
            ) : (
                <Box sx={{ p: 3, flexGrow: 1 }}>
                    {articleLoading ? (
                        renderLoading()
                    ) : (
                        <Stack spacing={1} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                            {renderArticleNodes(articleNodes)}
                        </Stack>
                    )}
                </Box>
            )}
        </Card>
    );
}
