import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { fPercent } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    title: string;
    coverUrl: string;
    totalLesson: number;
    currentLesson: number;
  }[];
};

export function CourseContinue({ title, subheader, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        sx={{
          p: 3,
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {list.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: Props['list'][number];
};

function Item({ item, sx, ...other }: ItemProps) {
  const percent = (item.currentLesson / item.totalLesson) * 100;

  return (
    <Box
      sx={[{ gap: 2, display: 'flex', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Avatar
        alt={item.title}
        src={item.coverUrl}
        variant="rounded"
        sx={{ width: 56, height: 56 }}
      />

      <Box
        sx={{
          minWidth: 0,
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
        }}
      >
        <Link color="inherit" noWrap sx={{ mb: 0.5, typography: 'subtitle2' }}>
          {item.title}
        </Link>

        <Box component="span" sx={{ color: 'text.secondary', typography: 'caption' }}>
          Lessons: {item.currentLesson}/{item.totalLesson}
        </Box>

        <Box
          sx={{
            width: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <LinearProgress
            color="warning"
            variant="determinate"
            value={percent}
            sx={[
              (theme) => ({
                width: 1,
                height: 6,
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
                [` .${linearProgressClasses.bar}`]: { opacity: 0.8 },
              }),
            ]}
          />
          <Box
            component="span"
            sx={{
              width: 40,
              typography: 'caption',
              color: 'text.secondary',
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
