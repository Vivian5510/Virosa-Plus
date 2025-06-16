import type { FileUploadType } from 'src/components/upload';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';

import { Markdown } from 'src/components/markdown';
import { Scrollbar } from 'src/components/scrollbar';
import { EmptyContent } from 'src/components/empty-content';

import { PostDetailsHero } from './post-details-hero';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  open: boolean;
  content: string;
  isValid: boolean;
  description: string;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  coverUrl: FileUploadType;
};

export function PostDetailsPreview({
  open,
  title,
  content,
  isValid,
  onClose,
  coverUrl,
  onSubmit,
  description,
  isSubmitting,
}: Props) {
  let previewUrl = '';

  if (coverUrl) {
    if (typeof coverUrl === 'string') {
      previewUrl = coverUrl;
    } else {
      previewUrl = URL.createObjectURL(coverUrl);
    }
  }

  const hasHero = title || previewUrl;

  const hasContent = title || description || content || previewUrl;

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Preview
        </Typography>

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Post
        </LoadingButton>
      </DialogActions>

      <Divider />

      {hasContent ? (
        <Scrollbar>
          {(hasHero || previewUrl) && <PostDetailsHero title={title} coverUrl={previewUrl} />}
          <Container sx={{ mt: 5, mb: 10 }}>
            <Box sx={{ mx: 'auto', maxWidth: 720 }}>
              <Typography variant="h6">{description}</Typography>
              <Markdown>{content}</Markdown>
            </Box>
          </Container>
        </Scrollbar>
      ) : (
        <EmptyContent filled title="Empty content!" />
      )}
    </Dialog>
  );
}
