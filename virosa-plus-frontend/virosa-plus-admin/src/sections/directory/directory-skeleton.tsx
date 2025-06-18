import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

export function DirectoryTreeSkeleton() {
    return (
        <Card>
            <Stack spacing={3} sx={{ p: 3 }}>
                <DirectoryItemSkeleton />
                <DirectoryItemSkeleton />
                <DirectoryItemSkeleton />
            </Stack>
        </Card>
    );
}

export function DirectoryItemSkeleton() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={120} height={24} />
            <Box sx={{ flexGrow: 1 }} />
            <Skeleton variant="rectangular" width={60} height={24} />
        </Stack>
    );
} 