import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { fData } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Upload, UploadBox, UploadAvatar } from 'src/components/upload';

import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

export function UploadView() {
  const showPreview = useBoolean();

  const [files, setFiles] = useState<(File | string)[]>([]);
  const [file, setFile] = useState<File | string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<File | string | null>(null);

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);

  const handleDropAvatar = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setAvatarUrl(newFile);
  }, []);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const DEMO_COMPONENTS = [
    {
      name: 'Upload single file',
      component: (
        <Upload value={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
      ),
    },
    {
      name: 'Upload multi file',
      component: (
        <>
          <FormControlLabel
            label="Show thumbnails"
            control={
              <Switch
                checked={showPreview.value}
                onClick={showPreview.onToggle}
                inputProps={{ id: 'show-thumbnails-switch' }}
              />
            }
            sx={{ mb: 3, width: 1, justifyContent: 'flex-end' }}
          />
          <Upload
            multiple
            thumbnail={showPreview.value}
            value={files}
            onDrop={handleDropMultiFile}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.info('ON UPLOAD')}
          />
        </>
      ),
    },
    {
      name: 'Upload avatar',
      component: (
        <UploadAvatar
          value={avatarUrl}
          onDrop={handleDropAvatar}
          validator={(fileData) => {
            if (fileData.size > 1000000) {
              return { code: 'file-too-large', message: `File is larger than ${fData(1000000)}` };
            }
            return null;
          }}
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 3,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.disabled',
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif
              <br /> max size of {fData(3145728)}
            </Typography>
          }
        />
      ),
    },
    {
      name: 'Upload box',
      component: (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <UploadBox />
          <UploadBox
            placeholder={
              <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                <Iconify icon="eva:cloud-upload-fill" width={40} />
                <Typography variant="body2">Upload file</Typography>
              </Stack>
            }
            sx={{
              mb: 3,
              py: 2.5,
              flexGrow: 1,
              height: 'auto',
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Upload',
        moreLinks: ['https://react-dropzone.js.org/#section-basic-example'],
      }}
    />
  );
}
