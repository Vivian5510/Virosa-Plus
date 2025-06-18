import { useState, useCallback } from 'react';

import Grid from '@mui/material/Grid';

import { paths } from 'src/routes/paths';

import { useGetNodeTree } from 'src/actions/blog';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DirectoryTree } from '../directory-tree';
import { DirectoryTreeSkeleton } from '../directory-skeleton';

// ----------------------------------------------------------------------

export function DirectoryView() {
  const { nodeTree, nodeTreeLoading, nodeTreeError } = useGetNodeTree();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="目录管理"
        links={[{ name: '控制面板', href: paths.dashboard.root }, { name: '目录管理' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={3}>
        <Grid xs={12}>
          {nodeTreeLoading ? (
            <DirectoryTreeSkeleton />
          ) : (
            <DirectoryTree
              key={refreshKey}
              nodes={nodeTree}
              loading={nodeTreeLoading}
              onRefresh={handleRefresh}
            />
          )}
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
