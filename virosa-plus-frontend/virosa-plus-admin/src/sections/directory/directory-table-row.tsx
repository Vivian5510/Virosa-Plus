
import type { INodeItem } from 'src/types/node';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

import { NodeType, NodeStatus } from 'src/types/node';

// ----------------------------------------------------------------------

type Props = {
    row: INodeItem;
    selected?: boolean;
    onSelectRow?: VoidFunction;
    onViewRow?: VoidFunction;
    onEditRow?: VoidFunction;
    onDeleteRow?: VoidFunction;
};

export default function DirectoryTableRow({
    row,
    selected,
    onSelectRow,
    onViewRow,
    onEditRow,
    onDeleteRow,
}: Props) {
    const { id, name, type, parentId, articleId, status, createTime } = row;

    const confirm = useBoolean();

    const popover = useBoolean();

    return (
        <>
            <TableRow hover selected={selected}>
                {onSelectRow && (
                    <TableCell padding="checkbox">
                        <Checkbox checked={selected} onClick={onSelectRow} />
                    </TableCell>
                )}

                <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Iconify
                            icon={type === NodeType.DIRECTORY ? 'mdi:folder' : 'mdi:file-document'}
                            sx={{
                                color: type === NodeType.DIRECTORY ? 'warning.main' : 'primary.main',
                                width: 24,
                                height: 24,
                            }}
                        />

                        <Link
                            noWrap
                            color="inherit"
                            onClick={onViewRow}
                            sx={{ cursor: 'pointer', typography: 'subtitle2' }}
                        >
                            {name}
                        </Link>
                    </Stack>
                </TableCell>

                <TableCell>
                    <Label
                        variant="soft"
                        color={type === NodeType.DIRECTORY ? 'warning' : 'info'}
                    >
                        {type === NodeType.DIRECTORY ? '目录' : '文件'}
                    </Label>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" noWrap>
                        {parentId || '-'}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" noWrap>
                        {articleId || '-'}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Typography variant="body2" noWrap>
                        {fDate(createTime)}
                    </Typography>
                </TableCell>

                <TableCell>
                    <Label
                        variant="soft"
                        color={status === NodeStatus.ENABLED ? 'success' : 'error'}
                    >
                        {status === NodeStatus.ENABLED ? '启用' : '禁用'}
                    </Label>
                </TableCell>

                <TableCell align="right">
                    <IconButton color={popover.value ? 'primary' : 'default'} onClick={popover.onTrue}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <CustomPopover
                open={popover.value}
                onClose={popover.onFalse}
                slotProps={{
                    arrow: {
                        placement: 'right-top'
                    }
                }}
                sx={{ width: 140 }}
            >
                <MenuItem
                    onClick={() => {
                        onViewRow?.();
                        popover.onFalse();
                    }}
                >
                    <Iconify icon="solar:eye-bold" />
                    查看
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onEditRow?.();
                        popover.onFalse();
                    }}
                >
                    <Iconify icon="solar:pen-bold" />
                    编辑
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        confirm.onTrue();
                        popover.onFalse();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    删除
                </MenuItem>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="删除"
                content={
                    <>
                        确定要删除 <strong>{name}</strong> 吗?
                        {type === NodeType.DIRECTORY && (
                            <Typography variant="body2" sx={{ mt: 1, color: 'error.main' }}>
                                注意：删除目录将同时删除其下所有子目录和文件！
                            </Typography>
                        )}
                    </>
                }
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        删除
                    </Button>
                }
            />
        </>
    );
}
