import type { BoxProps } from '@mui/material/Box';
import type { PaperProps } from '@mui/material/Paper';

import { m, AnimatePresence } from 'framer-motion';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { getVariant } from '../get-variant';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedVariant: string;
};

export function ContainerView({ open, onOpen, onClose, selectedVariant, sx, ...other }: Props) {
  return (
    <>
      <Box
        sx={[
          () => ({
            borderRadius: 2,
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.neutral',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Button size="large" variant="contained" onClick={onOpen}>
          Click me!
        </Button>
      </Box>

      <AnimatePresence>
        {open && (
          <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={onClose}
            PaperComponent={(props: PaperProps) => (
              <m.div {...getVariant(selectedVariant, 320)}>
                <Paper {...props}>{props.children}</Paper>
              </m.div>
            )}
          >
            <DialogTitle id="alert-dialog-title">{`Use Google's location service?`}</DialogTitle>

            <DialogContent>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Disagree</Button>
              <Button variant="contained" onClick={onClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
