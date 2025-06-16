import type { IJobItem } from 'src/types/job';
import type { Grid2Props } from '@mui/material/Grid2';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';

// ----------------------------------------------------------------------

type Props = Grid2Props & {
  job?: IJobItem;
};

export function JobDetailsContent({ job, sx, ...other }: Props) {
  const renderContent = () => (
    <Card
      sx={{
        p: 3,
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4">{job?.title}</Typography>

      <Markdown children={job?.content} />

      <Stack spacing={2}>
        <Typography variant="h6">Skills</Typography>
        <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
          {job?.skills.map((skill) => <Chip key={skill} label={skill} variant="soft" />)}
        </Box>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Benefits</Typography>
        <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
          {job?.benefits.map((benefit) => <Chip key={benefit} label={benefit} variant="soft" />)}
        </Box>
      </Stack>
    </Card>
  );

  const renderOverview = () => (
    <Card
      sx={{
        p: 3,
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {[
        {
          label: 'Date posted',
          value: fDate(job?.createdAt),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Expiration date',
          value: fDate(job?.expiredDate),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Employment type',
          value: job?.employmentTypes,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Offered salary',
          value: job?.salary.negotiable ? 'Negotiable' : fCurrency(job?.salary.price),
          icon: <Iconify icon="solar:wad-of-money-bold" />,
        },
        {
          label: 'Experience',
          value: job?.experience,
          icon: <Iconify icon="carbon:skill-level-basic" />,
        },
      ].map((item) => (
        <Box key={item.label} sx={{ gap: 1.5, display: 'flex' }}>
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            slotProps={{
              primary: {
                sx: { typography: 'body2', color: 'text.secondary' },
              },
              secondary: {
                sx: { mt: 0.5, color: 'text.primary', typography: 'subtitle2' },
              },
            }}
          />
        </Box>
      ))}
    </Card>
  );

  const renderCompany = () => (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        mt: 3,
        gap: 2,
        borderRadius: 2,
        display: 'flex',
      }}
    >
      <Avatar
        alt={job?.company.name}
        src={job?.company.logo}
        variant="rounded"
        sx={{ width: 64, height: 64 }}
      />

      <Stack spacing={1}>
        <Typography variant="subtitle1">{job?.company.name}</Typography>
        <Typography variant="body2">{job?.company.fullAddress}</Typography>
        <Typography variant="body2">{job?.company.phoneNumber}</Typography>
      </Stack>
    </Paper>
  );

  return (
    <Grid container spacing={3} sx={sx} {...other}>
      <Grid size={{ xs: 12, md: 8 }}>{renderContent()}</Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        {renderOverview()}
        {renderCompany()}
      </Grid>
    </Grid>
  );
}
