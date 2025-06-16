import type { BoxProps } from '@mui/material/Box';
import type { IDateValue } from 'src/types/common';
import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { fDateTime } from 'src/utils/format-time';
import { fPercent } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  list: {
    id: string;
    title: string;
    totalLesson: number;
    currentLesson: number;
    reminderAt: IDateValue;
  }[];
};

export function CourseReminders({ title, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
        {list.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            sx={[
              (theme) => ({
                color: [
                  theme.vars.palette.info.main,
                  theme.vars.palette.error.main,
                  theme.vars.palette.secondary.main,
                  theme.vars.palette.success.main,
                ][index],
              }),
            ]}
          />
        ))}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CourseItemProps = BoxProps & {
  item: Props['list'][number];
};

function Item({ item, sx, ...other }: CourseItemProps) {
  const percent = (item.currentLesson / item.totalLesson) * 100;

  return (
    <Box sx={[{ gap: 1.5, display: 'flex' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Box
        sx={{
          width: 6,
          my: '3px',
          height: 16,
          flexShrink: 0,
          opacity: 0.24,
          borderRadius: 1,
          bgcolor: 'currentColor',
        }}
      />

      <Box
        sx={{
          gap: 1,
          minWidth: 0,
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
        }}
      >
        <Link variant="subtitle2" color="inherit" noWrap sx={{ color: 'text.primary' }}>
          {item.title}
        </Link>

        <Box
          sx={{
            gap: 0.5,
            display: 'flex',
            alignItems: 'center',
            typography: 'caption',
            color: 'text.secondary',
          }}
        >
          <Iconify width={16} icon="solar:calendar-date-bold" />
          {fDateTime(item.reminderAt)}
        </Box>

        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <LinearProgress
            color="warning"
            variant="determinate"
            value={percent}
            sx={[
              (theme) => ({
                width: 1,
                height: 6,
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
                [` .${linearProgressClasses.bar}`]: { bgcolor: 'currentColor' },
              }),
            ]}
          />
          <Box
            component="span"
            sx={{
              width: 40,
              typography: 'caption',
              color: 'text.primary',
              fontWeight: 'fontWeightMedium',
            }}
          >
            {fPercent(percent)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
