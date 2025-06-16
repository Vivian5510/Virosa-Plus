import { useState } from 'react';

import Grid from '@mui/material/Grid2';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const LABELS = ['1col', '2col', '3col', '4col', '6col', '12col'];

// ----------------------------------------------------------------------

export function GridView() {
  const theme = useTheme();

  const [column, setColumn] = useState<number>(3);
  const [spacing, setSpacing] = useState<number>(2);

  const handleChangeSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number(event.target.value));
  };

  const handleChangeColumn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(event.target.value));
  };

  const DEMO_COMPONENTS = [
    {
      name: 'Spacing',
      component: (
        <ComponentBox sx={{ flexDirection: 'column' }}>
          <RadioGroup
            row
            name="spacing"
            value={spacing.toString()}
            onChange={handleChangeSpacing}
            sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
          >
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <FormControlLabel
                key={value}
                value={value.toString()}
                label={`${(value * 8).toString()}px`}
                control={<Radio />}
              />
            ))}
          </RadioGroup>

          <Grid container spacing={spacing} sx={{ width: 1 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
              <Grid key={value} size={{ xs: 1 }}>
                <Paper sx={{ height: 80, boxShadow: theme.vars.customShadows.z8 }} />
              </Grid>
            ))}
          </Grid>
        </ComponentBox>
      ),
    },
    {
      name: 'Column',
      component: (
        <ComponentBox>
          <RadioGroup
            row
            name="column"
            value={column.toString()}
            onChange={handleChangeColumn}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {[12, 6, 4, 3, 2, 1].map((value, index) => (
              <FormControlLabel
                key={value}
                value={value.toString()}
                label={LABELS[index]}
                control={<Radio />}
              />
            ))}
          </RadioGroup>

          <Grid container spacing={3} sx={{ width: 1 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value, index) => (
              <Grid key={value} size={{ xs: column }}>
                <Paper sx={{ py: 3, textAlign: 'center', boxShadow: theme.vars.customShadows.z8 }}>
                  {index + 1}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Grid',
      }}
    />
  );
}
