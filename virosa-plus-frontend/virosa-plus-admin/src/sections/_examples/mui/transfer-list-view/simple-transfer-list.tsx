import { useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

function not(a: number[], b: number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: number[], b: number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

// ----------------------------------------------------------------------

export function SimpleTransferList() {
  const theme = useTheme();

  const [checked, setChecked] = useState<number[]>([]);

  const [leftList, setLeftList] = useState<number[]>([0, 1, 2, 3]);
  const [rightList, setRightList] = useState<number[]>([4, 5, 6, 7]);

  const leftChecked = intersection(checked, leftList);
  const rightChecked = intersection(checked, rightList);

  const isRtl = theme.direction === 'rtl';

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRightList(rightList.concat(leftList));
    setLeftList([]);
  };

  const handleCheckedRight = () => {
    setRightList(rightList.concat(leftChecked));
    setLeftList(not(leftList, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeftList(leftList.concat(rightChecked));
    setRightList(not(rightList, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeftList(leftList.concat(rightList));
    setRightList([]);
  };

  const noData = (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        alignItems: 'center',
        color: 'text.secondary',
        justifyContent: 'center',
        fontWeight: 'fontWeightMedium',
      }}
    >
      No items
    </Box>
  );

  const renderList = (items: number[]) => (
    <Card sx={{ width: 220 }}>
      <List dense component="div" role="list" sx={{ overflow: 'auto', height: 200 }}>
        {items.length
          ? items.map((value: number) => (
              <ListItemButton
                key={value}
                role="listitem"
                onClick={handleToggle(value)}
                sx={{ px: 1, gap: 0.5 }}
              >
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    id: `simple-${value}-checkbox`,
                    'aria-label': `Simple ${value} checkbox`,
                  }}
                />

                <ListItemText primary={`List item ${value + 1}`} />
              </ListItemButton>
            ))
          : noData}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      sx={{
        py: 3,
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid>{renderList(leftList)}</Grid>

      <Grid container direction="column" sx={{ alignItems: 'center', px: 4, gap: 1.5 }}>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={isRtl ? handleAllLeft : handleAllRight}
          disabled={isRtl ? rightList.length === 0 : leftList.length === 0}
          aria-label="move all right"
        >
          <Iconify width={18} icon="eva:arrowhead-right-fill" />
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={isRtl ? handleCheckedLeft : handleCheckedRight}
          disabled={isRtl ? rightChecked.length === 0 : leftChecked.length === 0}
          aria-label="move selected right"
        >
          <Iconify width={18} icon="eva:arrow-ios-forward-fill" />
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={isRtl ? handleCheckedRight : handleCheckedLeft}
          disabled={isRtl ? leftChecked.length === 0 : rightChecked.length === 0}
          aria-label="move selected left"
        >
          <Iconify width={18} icon="eva:arrow-ios-back-fill" />
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={isRtl ? handleAllRight : handleAllLeft}
          disabled={isRtl ? leftList.length === 0 : rightList.length === 0}
          aria-label="move all left"
        >
          <Iconify width={18} icon="eva:arrowhead-left-fill" />
        </Button>
      </Grid>

      <Grid>{renderList(rightList)}</Grid>
    </Grid>
  );
}
