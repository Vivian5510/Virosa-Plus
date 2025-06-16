import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function ContactForm({ sx, ...other }: BoxProps) {
  return (
    <Box sx={sx} {...other}>
      <Typography variant="h3">
        Feel free to contact us. <br />
        We&apos;ll be glad to hear from you buddy.
      </Typography>
      <Box
        sx={{
          my: 5,
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField fullWidth label="Name" />
        <TextField fullWidth label="Email" />
        <TextField fullWidth label="Subject" />
        <TextField fullWidth label="Enter your message here." multiline rows={4} />
      </Box>

      <Button size="large" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
