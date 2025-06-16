import { varAlpha } from 'minimal-shared/utils';

import Paper from '@mui/material/Paper';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

type TimelineType = {
  key: number;
  title: string;
  des: string;
  time: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'inherit' | 'grey' | 'secondary';
  icon: React.ReactElement;
};

const TIMELINES: TimelineType[] = [
  {
    key: 1,
    title: 'Default',
    des: 'Morbi mattis ullamcorper',
    time: '09:30 am',
    icon: <Iconify width={24} icon="eva:folder-add-fill" />,
  },
  {
    key: 2,
    title: 'Primary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'primary',
    icon: <Iconify width={24} icon="eva:image-2-fill" />,
  },
  {
    key: 3,
    title: 'Secondary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'secondary',
    icon: <Iconify width={24} icon="eva:pantone-fill" />,
  },
  {
    key: 4,
    title: 'Info',
    des: 'Morbi mattis ullamcorper',
    time: '10:30 am',
    color: 'info',
    icon: <Iconify width={24} icon="eva:tv-fill" />,
  },
  {
    key: 5,
    title: 'Success',
    des: 'Morbi mattis ullamcorper',
    time: '11:00 am',
    color: 'success',
    icon: <Iconify width={24} icon="eva:activity-fill" />,
  },
  {
    key: 6,
    title: 'Warning',
    des: 'Morbi mattis ullamcorper',
    time: '11:30 am',
    color: 'warning',
    icon: <Iconify width={24} icon="eva:cube-fill" />,
  },
  {
    key: 7,
    title: 'Error',
    des: 'Morbi mattis ullamcorper',
    time: '12:00 am',
    color: 'error',
    icon: <Iconify width={24} icon="eva:film-fill" />,
  },
];

// ----------------------------------------------------------------------

export function TimelineView() {
  const lastItem = TIMELINES[TIMELINES.length - 1].key;

  const reduceTimeLine = TIMELINES.slice(TIMELINES.length - 3);

  const DEMO_COMPONENTS = [
    {
      name: 'Left',
      component: (
        <ComponentBox>
          <Timeline position="left">
            {reduceTimeLine.map((item) => (
              <TimelineItem key={item.key}>
                <TimelineSeparator>
                  <TimelineDot />
                  {lastItem === item.key ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>{item.title}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ComponentBox>
      ),
    },
    {
      name: 'Right',
      component: (
        <ComponentBox>
          <Timeline position="right">
            {reduceTimeLine.map((item) => (
              <TimelineItem key={item.key}>
                <TimelineSeparator>
                  <TimelineDot />
                  {lastItem === item.key ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>{item.title}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ComponentBox>
      ),
    },
    {
      name: 'Alternating',
      component: (
        <ComponentBox>
          <Timeline position="alternate">
            {reduceTimeLine.map((item) => (
              <TimelineItem key={item.key}>
                <TimelineSeparator>
                  <TimelineDot />
                  {lastItem === item.key ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>{item.title}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ComponentBox>
      ),
    },
    {
      name: 'Filled',
      component: (
        <ComponentBox>
          <Timeline position="alternate">
            {TIMELINES.map((item) => (
              <TimelineItem key={item.key}>
                <TimelineSeparator>
                  <TimelineDot color={item.color} />
                  {lastItem === item.key ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>{item.title}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ComponentBox>
      ),
    },
    {
      name: 'Outlined',
      component: (
        <ComponentBox>
          <Timeline position="alternate">
            {TIMELINES.map((item) => (
              <TimelineItem key={item.key}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color={item.color} />
                  {lastItem === item.key ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>{item.title}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ComponentBox>
      ),
    },
    {
      name: 'Opposite content',
      component: (
        <ComponentBox>
          <Timeline position="alternate">
            {TIMELINES.map((item) => (
              <TimelineItem key={item.key}>
                <TimelineOppositeContent>
                  <Typography sx={{ color: 'text.secondary' }}>{item.time}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={item.color} />
                  {lastItem === item.key ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography> {item.title}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ComponentBox>
      ),
    },
    {
      name: 'Customized',
      component: (
        <ComponentBox>
          <Timeline position="alternate">
            {TIMELINES.map((item) => (
              <TimelineItem key={item.key}>
                <TimelineOppositeContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.time}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={item.color}>{item.icon}</TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    sx={[
                      (theme) => ({
                        p: 3,
                        bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
                      }),
                    ]}
                  >
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.des}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Timeline',
        moreLinks: ['https://mui.com/material-ui/react-timeline/'],
      }}
    />
  );
}
