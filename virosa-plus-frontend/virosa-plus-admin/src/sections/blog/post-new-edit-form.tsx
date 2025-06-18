import type { IPostItem } from 'src/types/blog';

import { z as zod } from 'zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { _tags } from 'src/_mock';
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
  tags: zod.string().array().optional().default([]),
  publish: zod.string().optional().default('draft'),
});

// ----------------------------------------------------------------------

type Props = {
  currentPost?: IPostItem;
};

export function PostNewEditForm({ currentPost }: Props) {
  const router = useRouter();

  const showPreview = useBoolean();

  const defaultValues: NewPostSchemaType = {
    title: '',
    content: '',
    coverUrl: null,
    tags: [],
    publish: 'draft',
  };

  const methods = useForm<NewPostSchemaType>({
    mode: 'all',
    resolver: zodResolver(NewPostSchema),
    defaultValues,
    values: currentPost,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentPost?.id) {
        await postService.updatePost(currentPost.id, {
          ...data,
          publish: data.publish || 'draft',
        });
        toast.success('文章更新成功!');
      } else {
        await postService.createPost({
          ...data,
          publish: data.publish || 'draft',
        });
        toast.success('文章创建成功!');
      }

      reset();
      showPreview.onFalse();
      router.push(paths.dashboard.post.root);
    } catch (error) {
      console.error(error);
      toast.error('操作失败，请重试');
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  const renderDetails = () => (
    <Card>
      <CardHeader title="文章内容" subheader="标题、内容、封面图片..." sx={{ mb: 3 }} />

      <Divider />

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

  const renderProperties = () => (
    <Card>
      <CardHeader title="属性" subheader="标签和发布状态..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Autocomplete
          name="tags"
          label="标签"
          placeholder="+ 添加标签"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <FormControlLabel
          label="发布"
          control={
            <Switch
              checked={values.publish === 'published'}
              onChange={(e) => setValue('publish', e.target.checked ? 'published' : 'draft')}
              inputProps={{ id: 'publish-switch' }}
            />
          }
        />
      </Stack>
    </Card>
  );

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
