import type { SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Markdown } from 'src/components/markdown';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  content: string;
  coverUrl: string | null;
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
};

export function PostDetailsPreview({
  title,
  content,
  coverUrl,
  open,
  onClose,
  sx,
  ...other
}: Props) {
  return (
    <Dialog fullScreen open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="h6"> 预览 </Typography>

          <Button color="error" variant="outlined" onClick={onClose}>
            关闭
          </Button>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {coverUrl && (
          <Box
            component="img"
            alt={title}
            src={coverUrl}
            sx={{
              width: 1,
              height: 500,
              objectFit: 'cover',
            }}
          />
        )}

        <Box
          sx={{
            p: 3,
            mx: 'auto',
            ...sx,
          }}
        >
          <Typography variant="h3" component="h1">
            {title}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Markdown children={content} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
}
