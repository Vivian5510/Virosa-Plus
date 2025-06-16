import { useState } from 'react';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const PLACEMENTS = ['top', 'start', 'bottom', 'end'] as const;

// ----------------------------------------------------------------------

export function RadioButtonView() {
  const [value, setValue] = useState('a1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const DEMO_COMPONENTS = [
    {
      name: 'Basic',
      component: (
        <ComponentBox>
          <FormControl component="fieldset">
            <RadioGroup row defaultValue="nn">
              <Radio size="medium" value="nn" />
              <Radio size="medium" value="gg" />
              <Radio size="medium" disabled value="hh" />
            </RadioGroup>
          </FormControl>
        </ComponentBox>
      ),
    },
    {
      name: 'Sizes',
      component: (
        <ComponentBox>
          <RadioGroup row defaultValue="g">
            <FormControlLabel value="g" control={<Radio size="medium" />} label="Normal" />
            <FormControlLabel value="p" control={<Radio size="small" />} label="Small" />
          </RadioGroup>
        </ComponentBox>
      ),
    },
    {
      name: 'Placement',
      component: (
        <ComponentBox>
          <FormControl component="fieldset">
            <RadioGroup row defaultValue="top">
              {PLACEMENTS.map((placement) => (
                <FormControlLabel
                  key={placement}
                  value={placement}
                  label={placement}
                  labelPlacement={placement}
                  control={<Radio size="medium" />}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </ComponentBox>
      ),
    },
    {
      name: 'Colors',
      component: (
        <ComponentBox>
          <FormControl component="fieldset">
            <FormLabel component="legend" id="colors-radios" sx={{ mb: 1, typography: 'body2' }}>
              Colors
            </FormLabel>
            <RadioGroup aria-labelledby="colors-radios" value={value} onChange={handleChange}>
              {COLORS.map((color) => (
                <FormControlLabel
                  key={color}
                  value={color}
                  control={<Radio size="medium" color={color} />}
                  label={color}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}

              <FormControlLabel
                disabled
                value="a8"
                control={<Radio size="medium" color="error" />}
                label="Disabled"
              />
            </RadioGroup>
          </FormControl>
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Radio group',
        moreLinks: ['https://mui.com/material-ui/react-radio-button/'],
      }}
    />
  );
}
