import type { IPostItem } from 'src/types/blog';
import type { SelectChangeEvent } from '@mui/material/Select';

import { mutate } from 'swr';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ARTICLE_TYPE_OPTIONS } from 'src/_mock';
import { postService } from 'src/lib/api-adapter';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { PostDetailsPreview } from './post-details-preview';

// ----------------------------------------------------------------------

export type NewPostSchemaType = zod.infer<typeof NewPostSchema>;

export const NewPostSchema = zod.object({
  title: zod.string().min(1, { message: '标题是必填项!' }),
  content: zod.string().min(1, { message: '内容是必填项!' }),
  coverUrl: zod.any().nullable(),
  type: zod.string().optional(), // 文章类型，对应后端ArticleType枚举
  author: zod.string().optional().default('Rosy'), // 作者名称
  extraInfo: zod.string().optional(), // 额外信息
  externalLink: zod.string().optional(), // 外部链接
  tags: zod.string().array().optional().default([]), // 保留tags以兼容现有数据
});

// ----------------------------------------------------------------------

type Props = {
  currentPost?: IPostItem;
};

export function PostNewEditForm({ currentPost }: Props) {
  const router = useRouter();
  const showPreview = useBoolean();

  // 表单初始化状态
  const [isInitialized, setIsInitialized] = useState(false);

  // 直接从currentPost中获取初始类型，不依赖useMemo
  const initialType =
    currentPost?.type ||
    (currentPost?.tags && currentPost.tags.length > 0 ? currentPost.tags[0] : '随笔');

  // 使用独立状态管理当前选择的类型
  const [currentType, setCurrentType] = useState(initialType);

  // 调试日志
  console.log('文章数据:', {
    id: currentPost?.id,
    title: currentPost?.title,
    type: currentPost?.type,
    tags: currentPost?.tags,
    initialType,
    currentType,
  });

  // 表单初始化
  const methods = useForm<NewPostSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(NewPostSchema),
    defaultValues: {
      title: '',
      content: '',
      coverUrl: null,
      type: '',
      author: 'Rosy',
      extraInfo: '',
      externalLink: '',
      tags: [],
    },
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // 表单初始化 - 在组件挂载后和currentPost变化时执行一次
  useEffect(() => {
    const initializeForm = async () => {
      setIsInitialized(false);

      // 确定初始类型值
      let typeValue = '随笔';
      if (currentPost?.type) {
        typeValue = currentPost.type;
        console.log('使用文章原始type值:', typeValue);
      } else if (currentPost?.tags && currentPost.tags.length > 0) {
        typeValue = currentPost.tags[0];
        console.log('使用文章tags[0]作为type值:', typeValue);
      }

      // 更新状态
      setCurrentType(typeValue);

      if (currentPost) {
        // 使用reset方法一次性设置所有值
        reset({
          title: currentPost.title || '',
          content: currentPost.content || '',
          coverUrl: currentPost.coverUrl || null,
          type: typeValue, // 使用确定的类型值
          author: currentPost.author || 'Rosy',
          extraInfo: currentPost.extraInfo || '',
          externalLink: currentPost.externalLink || '',
          tags: currentPost.tags || [],
        });

        console.log('表单已初始化，类型设置为:', typeValue);
      }

      // 延迟一点标记初始化完成，确保DOM更新
      setTimeout(() => setIsInitialized(true), 100);
    };

    initializeForm();
  }, [currentPost, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // 确保tags数组包含type值，以便后端处理
      const tagsWithType = data.type ? [data.type] : [];

      // 确保type字段有值
      if (!data.type) {
        data.type = currentType || '随笔';
      }

      // 打印表单数据
      console.log('表单提交数据:', {
        title: data.title,
        type: data.type,
        currentType,
        tags: tagsWithType,
      });

      const postData = {
        ...data,
        tags: tagsWithType,
        // 文章默认为已发布状态
        publish: 'published',
        isPublished: 1, // 设置为已发布状态
      };

      console.log('提交的文章数据:', postData);

      if (currentPost?.id) {
        const response = await postService.updatePost(currentPost.id, postData);
        console.log('更新文章响应:', response);
        toast.success('文章更新成功!');

        // 刷新所有可能的文章数据缓存
        console.log('正在刷新文章缓存...');

        // 刷新文章详情
        mutate(`articles/${currentPost.id}`);

        // 刷新文章列表（多种可能的参数组合）
        mutate(['articles/page', { pageNum: 1, pageSize: 10 }]);
        mutate(['articles/page', { pageNum: 1, pageSize: 10, publish: '' }]);
        mutate(['articles/page', { pageNum: 1, pageSize: 10, publish: 'published' }]);
        mutate('articles/latest');
        mutate('articles/search');

        // 延迟跳转，确保数据已刷新
        setTimeout(() => {
          reset();
          showPreview.onFalse();
          router.push(paths.dashboard.post.root);
        }, 500);
      } else {
        const response = await postService.createPost(postData);
        console.log('创建文章响应:', response);
        toast.success('文章创建成功!');

        // 刷新文章列表（多种可能的参数组合）
        console.log('正在刷新文章缓存...');
        mutate(['articles/page', { pageNum: 1, pageSize: 10 }]);
        mutate(['articles/page', { pageNum: 1, pageSize: 10, publish: '' }]);
        mutate(['articles/page', { pageNum: 1, pageSize: 10, publish: 'published' }]);
        mutate('articles/latest');

        // 延迟跳转，确保数据已刷新
        setTimeout(() => {
          reset();
          showPreview.onFalse();
          router.push(paths.dashboard.post.root);
        }, 500);
      }
    } catch (error: any) {
      console.error('文章操作失败:', error);

      // 提取错误消息
      let errorMessage = '操作失败，请重试';
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      }

      toast.error(errorMessage);
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  // 直接处理类型变化，不依赖react-hook-form的内部机制
  const handleTypeChange = (event: SelectChangeEvent) => {
    const newType = event.target.value;

    console.log('类型选择变化:', {
      oldType: currentType,
      newType,
      availableOptions: ARTICLE_TYPE_OPTIONS.map((opt) => opt.value),
      event: event.target,
    });

    // 更新状态
    setCurrentType(newType);

    // 更新表单值
    setValue('type', newType, { shouldValidate: true });

    // 确认更新后的值
    setTimeout(() => {
      const formValues = methods.getValues();
      console.log('更新后的表单值:', {
        type: formValues.type,
        currentType: newType,
      });
    }, 0);
  };

  const renderDetails = () => (
    <Card>
      <CardHeader title="文章主题" />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="文章标题" />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">文章内容</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">封面图片</Typography>
          <Field.Upload name="coverUrl" maxSize={3145728} onDelete={handleRemoveFile} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = () => {
    // 查找当前类型对应的标签文本
    const currentTypeLabel =
      ARTICLE_TYPE_OPTIONS.find((option) => option.value === currentType)?.label || '选择类型';

    return (
      <Card>
        <CardHeader title="附加信息" />

        <Stack spacing={3} sx={{ p: 3 }}>
          {/* 文章类型选择器 */}
          <FormControl fullWidth>
            <InputLabel id="article-type-label">文章类型</InputLabel>
            <Select
              labelId="article-type-label"
              id="article-type-select"
              value={currentType}
              onChange={handleTypeChange}
              label="文章类型"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
                // 设置弹出方向为"上方"
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
              }}
            >
              {ARTICLE_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 作者信息 */}
          <Field.Text name="author" label="作者" placeholder="请输入作者名称" />

          {/* 额外信息 */}
          <Field.Text
            name="extraInfo"
            label="额外信息"
            placeholder="如音乐的专辑名、书的出版社等"
          />

          {/* 外部链接 */}
          <Field.Text name="externalLink" label="外部链接" placeholder="如音乐链接、视频链接等" />
        </Stack>
      </Card>
    );
  };

  const renderActions = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <div>
        <Button color="inherit" variant="outlined" size="large" onClick={showPreview.onTrue}>
          预览
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? '创建文章' : '保存更改'}
        </LoadingButton>
      </div>
    </Box>
  );

  // 在表单初始化完成前显示加载状态
  if (!isInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderProperties()}
        {renderActions()}
      </Stack>

      <PostDetailsPreview
        title={values.title}
        content={values.content}
        coverUrl={
          typeof values.coverUrl === 'string'
            ? values.coverUrl
            : values.coverUrl?.preview
              ? values.coverUrl?.preview
              : null
        }
        open={showPreview.value}
        onClose={showPreview.onFalse}
      />
    </Form>
  );
}
