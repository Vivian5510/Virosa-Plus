import { useBoolean } from 'minimal-shared/hooks';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// ----------------------------------------------------------------------

export function AlertDialog() {
  const openDialog = useBoolean();

  return (
    <>
      <Button color="info" variant="outlined" onClick={openDialog.onTrue}>
        Open alert dialog
      </Button>

      <Dialog open={openDialog.value} onClose={openDialog.onFalse}>
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
    </>
  );
}
