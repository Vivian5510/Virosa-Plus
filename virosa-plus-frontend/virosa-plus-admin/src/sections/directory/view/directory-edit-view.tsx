import type { INodeItem } from 'src/types/node';

import { useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';

import { nodeService } from 'src/lib/api-adapter';

import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import DirectoryNewEditForm from '../directory-new-edit-form';

export default function DirectoryEditView() {
  const { id } = useParams();
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const [currentDirectory, setCurrentDirectory] = useState<INodeItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // 获取目录详情
  const getDirectory = useCallback(async () => {
    try {
      setLoadingData(true);
      if (!id) {
        enqueueSnackbar('目录ID不存在', { variant: 'error' });
        setLoadingData(false);
        return;
      }
      const data = await nodeService.getNodeById(id);
      setCurrentDirectory(data);
      setLoadingData(false);
    } catch (error) {
      console.error('获取目录详情失败:', error);
      enqueueSnackbar('获取目录详情失败', { variant: 'error' });
      setLoadingData(false);
    }
  }, [id, enqueueSnackbar]);

  useEffect(() => {
    if (id) {
      getDirectory();
    } else {
      setLoadingData(false);
      enqueueSnackbar('目录ID不存在', { variant: 'error' });
    }
  }, [id, getDirectory, enqueueSnackbar]);

  // 处理表单提交
  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        if (!id) {
          enqueueSnackbar('目录ID不存在', { variant: 'error' });
          setLoading(false);
          return;
        }
        await nodeService.updateNode({
          id,
          ...data,
        });
        enqueueSnackbar('目录修改成功');
        setLoading(false);
      } catch (error) {
        console.error('修改目录失败:', error);
        enqueueSnackbar('修改失败', { variant: 'error' });
        setLoading(false);
      }
    },
    [id, enqueueSnackbar]
  );

  if (loadingData) {
    return (
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{ textAlign: 'center', mt: 5 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="编辑目录"
        links={[
          { name: '控制台', href: paths.dashboard.root },
          { name: '目录管理', href: paths.dashboard.directory.root },
          { name: '编辑目录' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <DirectoryNewEditForm
        isEdit
        currentDirectory={currentDirectory}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
}
