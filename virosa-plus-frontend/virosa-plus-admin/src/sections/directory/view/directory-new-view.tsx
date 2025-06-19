import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useLocation, useNavigate } from 'src/routes/shims';

import { nodeService } from 'src/lib/api-adapter';

import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { NodeType } from 'src/types/node';

import DirectoryNewEditForm from '../directory-new-edit-form';

// ----------------------------------------------------------------------

export default function DirectoryNewView() {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // 从URL查询参数中获取parentId
  const queryParams = new URLSearchParams(location.search);
  const parentId = queryParams.get('parentId');

  const handleCreateDirectory = useCallback(
    async (data: any) => {
      try {
        setLoading(true);

        const directoryData = {
          name: data.name,
          type: NodeType.DIRECTORY,
          parentId: data.parentId || null,
          orderNum: data.orderNum || 0,
        };

        await nodeService.createDirectory(directoryData.name, directoryData.parentId);

        enqueueSnackbar('创建成功');
        navigate(paths.dashboard.directory.tree);
      } catch (error) {
        console.error('创建目录失败:', error);
        enqueueSnackbar('创建失败', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    },
    [enqueueSnackbar, navigate]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="新建目录"
        links={[
          { name: '控制台', href: paths.dashboard.root },
          { name: '目录管理', href: paths.dashboard.directory.root },
          { name: '新建目录' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <DirectoryNewEditForm
          onSubmit={handleCreateDirectory}
          isEdit={false}
          loading={loading}
          defaultParentId={parentId ? Number(parentId) : undefined}
        />
      </Card>
    </Container>
  );
}
