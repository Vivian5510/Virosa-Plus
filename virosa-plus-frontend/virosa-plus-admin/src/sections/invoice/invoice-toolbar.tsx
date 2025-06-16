import type { IInvoice } from 'src/types/invoice';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import { InvoicePDFViewer, InvoicePDFDownload } from './invoice-pdf';

// ----------------------------------------------------------------------

type Props = {
  invoice?: IInvoice;
  currentStatus: string;
  statusOptions: { value: string; label: string }[];
  onChangeStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InvoiceToolbar({ invoice, currentStatus, statusOptions, onChangeStatus }: Props) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderDownloadButton = () =>
    invoice ? <InvoicePDFDownload invoice={invoice} currentStatus={currentStatus} /> : null;

  const renderDetailsDialog = () => (
    <Dialog fullScreen open={open}>
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <DialogActions sx={{ p: 1.5 }}>
          <Button color="inherit" variant="contained" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
        <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
          {invoice && <InvoicePDFViewer invoice={invoice} currentStatus={currentStatus} />}
        </Box>
      </Box>
    </Dialog>
  );

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          mb: { xs: 3, md: 5 },
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-end', sm: 'center' },
        }}
      >
        <Box
          sx={{
            gap: 1,
            width: 1,
            flexGrow: 1,
            display: 'flex',
          }}
        >
          <Tooltip title="Edit">
            <IconButton
              component={RouterLink}
              href={paths.dashboard.invoice.edit(`${invoice?.id}`)}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
            <IconButton onClick={onOpen}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>

          {renderDownloadButton()}

          <Tooltip title="Print">
            <IconButton>
              <Iconify icon="solar:printer-minimalistic-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Send">
            <IconButton>
              <Iconify icon="iconamoon:send-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <Iconify icon="solar:share-bold" />
            </IconButton>
          </Tooltip>
        </Box>

        <TextField
          fullWidth
          select
          label="Status"
          value={currentStatus}
          onChange={onChangeStatus}
          sx={{ maxWidth: 160 }}
          slotProps={{
            htmlInput: { id: 'status-select' },
            inputLabel: { htmlFor: 'status-select' },
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {renderDetailsDialog()}
    </>
  );
}
