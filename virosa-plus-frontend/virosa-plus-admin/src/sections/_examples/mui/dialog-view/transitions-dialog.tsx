import type { TransitionProps } from '@mui/material/transitions';

import { forwardRef } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// ----------------------------------------------------------------------

const Transition = forwardRef(
  (props: TransitionProps & { children: React.ReactElement }, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  )
);

export function TransitionsDialog() {
  const openDialog = useBoolean();

  return (
    <div>
      <Button variant="outlined" color="success" onClick={openDialog.onTrue}>
        Transitions dialogs
      </Button>

      <Dialog
        keepMounted
        open={openDialog.value}
        TransitionComponent={Transition}
        onClose={openDialog.onFalse}
      >
        <DialogTitle>{`Use Google's location service?`}</DialogTitle>

        <DialogContent sx={{ color: 'text.secondary' }}>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={openDialog.onFalse}>
            Disagree
          </Button>
          <Button variant="contained" onClick={openDialog.onFalse} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
