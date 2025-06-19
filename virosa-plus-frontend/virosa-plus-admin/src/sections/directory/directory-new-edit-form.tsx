import type { INodeItem } from 'src/types/node';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { nodeService } from 'src/lib/api-adapter';

import { Form } from 'src/components/hook-form/form-provider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

import { NodeType, NodeStatus } from 'src/types/node';

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
    name: Yup.string().required('请输入目录名称'),
    parentId: Yup.mixed().nullable(),
    orderNum: Yup.number().min(0, '排序号必须大于等于0').nullable(),
    status: Yup.number().required('请选择状态'),
});

// ----------------------------------------------------------------------

type Props = {
    isEdit?: boolean;
    currentDirectory?: INodeItem | null;
    onSubmit?: (data: any) => void;
    loading?: boolean;
    defaultParentId?: number;
};

export default function DirectoryNewEditForm({
    isEdit = false,
    currentDirectory,
    onSubmit,
    loading = false,
    defaultParentId,
}: Props) {
    const router = useRouter();
    const [directories, setDirectories] = useState<INodeItem[]>([]);
    const [loadingDirectories, setLoadingDirectories] = useState(false);

    const defaultValues = {
        name: currentDirectory?.name || '',
        parentId: currentDirectory?.parentId || defaultParentId || null,
        orderNum: currentDirectory?.orderNum || 0,
        status: currentDirectory?.status || NodeStatus.ENABLED,
    };

    const methods = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    // 获取所有目录，用于选择父目录
    const fetchDirectories = useCallback(async () => {
        try {
            setLoadingDirectories(true);
            const data = await nodeService.getNodeTree();
            // 过滤出只有目录类型的节点
            const filterDirectories = (nodes: INodeItem[]): INodeItem[] =>
                nodes.flatMap((node) => {
                    if (node.type === NodeType.DIRECTORY) {
                        const children = node.children ? filterDirectories(node.children) : [];
                        return [node, ...children];
                    }
                    return [];
                });
            setDirectories(filterDirectories(data));
            setLoadingDirectories(false);
        } catch (error) {
            console.error('获取目录列表失败:', error);
            setLoadingDirectories(false);
        }
    }, []);

    useEffect(() => {
        fetchDirectories();
    }, [fetchDirectories]);

    useEffect(() => {
        if (isEdit && currentDirectory) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, currentDirectory, reset, defaultValues]);

    const handleCancel = () => {
        router.push(paths.dashboard.directory.tree);
    };

    const onSubmitForm = handleSubmit(async (data) => {
        try {
            onSubmit?.(data);
        } catch (error) {
            console.error('表单提交失败:', error);
        }
    });

    return (
        <Form methods={methods} onSubmit={onSubmitForm}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                <Card sx={{ p: 3 }}>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="name" label="目录名称" />

                        <RHFSelect
                            native
                            name="parentId"
                            label="父目录"
                            InputLabelProps={{ shrink: true }}
                            SelectProps={{ native: true }}
                            disabled={loadingDirectories}
                            helperText={loadingDirectories ? '加载中...' : '选择父目录，不选则为顶级目录'}
                        >
                            <option value="">无 (顶级目录)</option>
                            {directories.map((dir) => (
                                <option key={dir.id} value={dir.id}>
                                    {dir.name}
                                </option>
                            ))}
                        </RHFSelect>

                        <RHFTextField name="orderNum" label="排序号" type="number" />

                        <RHFSelect
                            native
                            name="status"
                            label="状态"
                            InputLabelProps={{ shrink: true }}
                            SelectProps={{ native: true }}
                        >
                            <option value={NodeStatus.ENABLED}>启用</option>
                            <option value={NodeStatus.DISABLED}>禁用</option>
                        </RHFSelect>
                    </Box>

                    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                        <LoadingButton type="submit" variant="contained" loading={loading}>
                            {isEdit ? '保存修改' : '创建目录'}
                        </LoadingButton>
                    </Stack>
                </Card>

                <Stack spacing={3}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Typography variant="subtitle2">说明</Typography>

                            <Typography variant="body2">• 目录用于组织文章，可以创建多级目录结构</Typography>

                            <Typography variant="body2">
                                • 排序号决定了目录在同级中的显示顺序，数字越小排序越靠前
                            </Typography>

                            <Typography variant="body2">• 禁用状态的目录在前端将不会显示</Typography>

                            <Button color="inherit" variant="outlined" onClick={handleCancel}>
                                取消
                            </Button>
                        </Stack>
                    </Card>
                </Stack>
            </Box>
        </Form>
    );
}
