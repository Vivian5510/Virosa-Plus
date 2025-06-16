import type { IconContainerProps } from '@mui/material/Rating';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const labels: {
  [index: string]: string;
} = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: { icon: <Iconify icon="ic:round-sentiment-very-dissatisfied" />, label: 'Very Dissatisfied' },
  2: { icon: <Iconify icon="ic:round-sentiment-dissatisfied" />, label: 'Dissatisfied' },
  3: { icon: <Iconify icon="ic:round-sentiment-neutral" />, label: 'Neutral' },
  4: { icon: <Iconify icon="ic:round-sentiment-satisfied" />, label: 'Satisfied' },
  5: { icon: <Iconify icon="ic:round-sentiment-very-satisfied" />, label: 'Very Satisfied' },
};

// ----------------------------------------------------------------------

export function RatingView() {
  const [hover, setHover] = useState(-1);
  const [value, setValue] = useState<number | null>(2);

  const DEMO_COMPONENTS = [
    {
      name: 'Controlled',
      component: (
        <ComponentBox>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Read only',
      component: (
        <ComponentBox>
          <Rating name="read-only" value={value} readOnly />
        </ComponentBox>
      ),
    },
    {
      name: 'Disabled',
      component: (
        <ComponentBox>
          <Rating name="disabled" value={value} disabled />
        </ComponentBox>
      ),
    },
    {
      name: 'Pristine',
      component: (
        <ComponentBox>
          <Rating name="pristine" value={null} />
        </ComponentBox>
      ),
    },
    {
      name: 'Custom empty icon',
      component: (
        <ComponentBox>
          <Rating name="customized-empty" defaultValue={2} precision={0.5} />
        </ComponentBox>
      ),
    },
    {
      name: 'Custom icon and color',
      component: (
        <ComponentBox>
          <Rating
            name="customized-color"
            defaultValue={2}
            getLabelText={(ratingValue) => `${ratingValue} Heart${ratingValue !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<Iconify icon="solar:heart-bold" />}
            emptyIcon={<Iconify icon="solar:heart-bold" />}
            sx={{ color: 'info.main', '&:hover': { color: 'info.dark' } }}
          />
        </ComponentBox>
      ),
    },
    {
      name: '10 stars',
      component: (
        <ComponentBox>
          <Rating name="customized-10" defaultValue={2} max={10} />
        </ComponentBox>
      ),
    },
    {
      name: 'Custom icon set',
      component: (
        <ComponentBox>
          <Rating
            name="customized-icons"
            defaultValue={2}
            getLabelText={(ratingValue) => customIcons[ratingValue].label}
            IconContainerComponent={IconContainer}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Hover feedback',
      component: (
        <ComponentBox>
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => setValue(newValue)}
            onChangeActive={(event, newHover) => setHover(newHover)}
          />
          {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
        </ComponentBox>
      ),
    },
    {
      name: 'Half ratings',
      component: (
        <ComponentBox>
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        </ComponentBox>
      ),
    },
    {
      name: 'Sizes',
      component: (
        <ComponentBox>
          <Rating name="size-small" defaultValue={2} size="small" />
          <Rating name="size-medium" defaultValue={2} />
          <Rating name="size-large" defaultValue={2} size="large" />
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Rating',
        moreLinks: ['https://mui.com/material-ui/react-rating/'],
      }}
    />
  );
}

// ----------------------------------------------------------------------

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;

  return <span {...other}>{customIcons[value].icon}</span>;
}
