import { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const PLACEMENTS = ['top', 'start', 'bottom', 'end'] as const;

// ----------------------------------------------------------------------

export function CheckboxView() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const DEMO_COMPONENTS = [
    {
      name: 'Basic',
      component: (
        <ComponentBox>
          <Checkbox
            size="medium"
            inputProps={{
              id: 'unchecked-checkbox',
              'aria-label': 'Unchecked checkbox',
            }}
          />
          <Checkbox
            size="medium"
            defaultChecked
            inputProps={{
              id: 'checked-checkbox',
              'aria-label': 'Checked checkbox',
            }}
          />
          <Checkbox
            size="medium"
            defaultChecked
            indeterminate
            inputProps={{
              id: 'indeterminate-checkbox',
              'aria-label': 'Indeterminate checkbox',
            }}
          />
          <Checkbox
            size="medium"
            disabled
            inputProps={{
              id: 'disabled-checkbox',
              'aria-label': 'Disabled checkbox',
            }}
          />
          <Checkbox
            size="medium"
            disabled
            defaultChecked
            inputProps={{
              id: 'disabled-checked-checkbox',
              'aria-label': 'Disabled checked checkbox',
            }}
          />
          <Checkbox
            size="medium"
            disabled
            indeterminate
            inputProps={{
              id: 'disabled-indeterminate-checkbox',
              'aria-label': 'Disabled indeterminate checkbox',
            }}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Size & custom icon',
      component: (
        <ComponentBox>
          <FormControlLabel
            label="Normal"
            control={
              <Checkbox size="medium" defaultChecked inputProps={{ id: 'medium-size-checkbox' }} />
            }
          />
          <FormControlLabel
            label="Small"
            control={
              <Checkbox size="small" defaultChecked inputProps={{ id: 'small-size-checkbox' }} />
            }
          />
          <FormControlLabel
            label="Custom icon"
            control={
              <Checkbox
                color="info"
                size="small"
                icon={<Iconify icon="solar:heart-bold" />}
                checkedIcon={<Iconify icon="solar:heart-bold" />}
                inputProps={{ id: 'favorite-checkbox' }}
              />
            }
          />

          <FormControlLabel
            label="Custom icon"
            control={
              <Checkbox
                color="error"
                size="small"
                icon={<Iconify icon="eva:award-fill" />}
                checkedIcon={<Iconify icon="eva:award-fill" />}
                inputProps={{ id: 'award-checkbox' }}
              />
            }
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Placement',
      component: (
        <ComponentBox>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              {PLACEMENTS.map((placement) => (
                <FormControlLabel
                  key={placement}
                  value={placement}
                  label={placement}
                  labelPlacement={placement}
                  control={<Checkbox size="medium" inputProps={{ id: `${placement}-checkbox` }} />}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </FormGroup>
          </FormControl>
        </ComponentBox>
      ),
    },
    {
      name: 'Colors',
      component: (
        <ComponentBox>
          <FormGroup>
            {COLORS.map((color) => (
              <FormControlLabel
                key={color}
                label={color}
                control={
                  <Checkbox
                    size="medium"
                    defaultChecked
                    color={color}
                    inputProps={{ id: `${color}-checkbox` }}
                  />
                }
                sx={{ textTransform: 'capitalize' }}
              />
            ))}

            <FormControlLabel
              disabled
              label="Disabled"
              control={
                <Checkbox
                  size="medium"
                  defaultChecked
                  color="error"
                  inputProps={{ id: 'color-disabled-checkbox' }}
                />
              }
            />
          </FormGroup>

          <FormControl component="fieldset">
            <FormGroup>
              {COLORS.map((color) => (
                <FormControlLabel
                  key={color}
                  label={color}
                  control={
                    <Checkbox
                      size="medium"
                      defaultChecked
                      indeterminate
                      color={color}
                      inputProps={{ id: `${color}-indeterminate-checkbox` }}
                    />
                  }
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}

              <FormControlLabel
                disabled
                label="Disabled"
                control={
                  <Checkbox
                    size="medium"
                    defaultChecked
                    indeterminate
                    color="error"
                    inputProps={{ id: 'color-disabled-indeterminate-checkbox' }}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </ComponentBox>
      ),
    },
    {
      name: 'Indeterminate',
      component: (
        <ComponentBox>
          <div>
            <FormControlLabel
              label="Parent"
              control={
                <Checkbox
                  size="medium"
                  checked={checked[0] && checked[1]}
                  indeterminate={checked[0] !== checked[1]}
                  onChange={handleChange1}
                  inputProps={{ id: 'Parent-checkbox' }}
                />
              }
            />
            <div>
              <FormControlLabel
                label="Child 1"
                control={
                  <Checkbox
                    size="medium"
                    checked={checked[0]}
                    onChange={handleChange2}
                    inputProps={{ id: 'child-1-checkbox' }}
                  />
                }
              />
              <FormControlLabel
                label="Child 2"
                control={
                  <Checkbox
                    size="medium"
                    checked={checked[1]}
                    onChange={handleChange3}
                    inputProps={{ id: 'child-2-checkbox' }}
                  />
                }
              />
            </div>
          </div>
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Checkboxes',
        moreLinks: ['https://mui.com/material-ui/react-checkbox/'],
      }}
    />
  );
}
