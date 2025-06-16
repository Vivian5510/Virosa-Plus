import { useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;

const marks = [
  { value: 0, label: '0°C' },
  { value: 20, label: '20°C' },
  { value: 37, label: '37°C' },
  { value: 100, label: '100°C' },
];

const prices = [
  { value: 0, label: '$0' },
  { value: 25, label: '250' },
  { value: 50, label: '500' },
  { value: 75, label: '750' },
  { value: 100, label: '1000' },
];

// ----------------------------------------------------------------------

function valuePrice(value: number) {
  return value > 0 ? `$${value}0` : `${value}`;
}

function valueLabelFormatPrice(value: number) {
  return value > 0 ? `$${value}` : value;
}

function valuetext(value: number) {
  return `$${value}°C`;
}

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

// ----------------------------------------------------------------------

export function SliderView() {
  const [value, setValue] = useState<number>(30);
  const [price, setPrice] = useState<number[]>([20, 37]);

  const handleChangeValue = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleChangePrice = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  const DEMO_COMPONENTS = [
    {
      name: 'Volume',
      component: (
        <ComponentBox sx={{ flexWrap: 'unset' }}>
          <Iconify width={24} icon="eva:volume-mute-fill" />
          <Slider value={value} onChange={handleChangeValue} aria-labelledby="continuous-slider" />
          <Iconify width={24} icon="eva:volume-up-fill" />
        </ComponentBox>
      ),
    },
    {
      name: 'Disabled',
      component: (
        <ComponentBox>
          <Slider disabled defaultValue={30} />
        </ComponentBox>
      ),
    },
    {
      name: 'Temperature',
      component: (
        <ComponentBox>
          <Slider
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Sizes',
      component: (
        <ComponentBox>
          <Slider
            size="medium"
            marks
            min={10}
            step={10}
            max={110}
            defaultValue={30}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
          <Slider
            size="small"
            marks
            min={10}
            step={10}
            max={110}
            defaultValue={30}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Small steps',
      component: (
        <ComponentBox>
          <Slider
            defaultValue={0.00000005}
            getAriaValueText={valuetext}
            step={0.00000001}
            marks
            min={-0.00000005}
            max={0.0000001}
            valueLabelDisplay="auto"
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Custom marks',
      component: (
        <ComponentBox>
          <Slider
            defaultValue={20}
            getAriaValueText={valuetext}
            step={10}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Restricted values',
      component: (
        <ComponentBox>
          <Slider
            defaultValue={20}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Range',
      component: (
        <ComponentBox sx={{ flexDirection: 'column' }}>
          <Slider
            scale={(x) => x * 10}
            step={10}
            marks={prices}
            value={price}
            onChange={handleChangePrice}
            valueLabelDisplay="on"
            getAriaValueText={valuePrice}
            valueLabelFormat={valueLabelFormatPrice}
          />

          <Box
            sx={(theme) => ({
              p: 2,
              gap: 3,
              borderRadius: 1,
              display: 'flex',
              typography: 'subtitle2',
              bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
            })}
          >
            <Box component="span">Min: {valuePrice(price[0])}</Box>

            <Box component="span">Max: {valuePrice(price[1])}</Box>
          </Box>
        </ComponentBox>
      ),
    },
    {
      name: 'Color',
      component: (
        <ComponentBox sx={{ flexDirection: 'column' }}>
          {COLORS.map((color) => (
            <Slider
              key={color}
              color={color}
              marks
              min={10}
              step={10}
              max={110}
              defaultValue={30}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          ))}
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Slider',
        moreLinks: ['https://mui.com/material-ui/react-slider/'],
      }}
    />
  );
}
