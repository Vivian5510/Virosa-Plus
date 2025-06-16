import { useState } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const OPTIONS = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

const MAX_HEIGHT_OPTIONS = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

// ----------------------------------------------------------------------

export function MenuView() {
  const simpleMenu = usePopover();
  const selectedMenu = usePopover();
  const maxHeightMenu = usePopover();

  const [selectedIndex, setSelectedIndex] = useState(1);

  const DEMO_COMPONENTS = [
    {
      name: 'Simple',
      component: (
        <ComponentBox>
          <Button variant="outlined" onClick={simpleMenu.onOpen}>
            Open Menu
          </Button>
          <Menu
            id="simple-menu"
            open={simpleMenu.open}
            onClose={simpleMenu.onClose}
            anchorEl={simpleMenu.anchorEl}
          >
            {['Profile', 'My account', 'Logout'].map((option) => (
              <MenuItem key={option} selected={option === 'Profile'} onClick={simpleMenu.onClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </ComponentBox>
      ),
    },
    {
      name: 'Selected',
      component: (
        <ComponentBox>
          <nav aria-label="Device settings">
            <ListItemButton
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              onClick={selectedMenu.onOpen}
            >
              <ListItemText primary="When device is locked" secondary={OPTIONS[selectedIndex]} />
            </ListItemButton>
          </nav>

          <Menu
            id="lock-menu"
            open={selectedMenu.open}
            onClose={selectedMenu.onClose}
            anchorEl={selectedMenu.anchorEl}
          >
            {OPTIONS.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === selectedIndex}
                onClick={() => {
                  setSelectedIndex(index);
                  selectedMenu.onClose();
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </ComponentBox>
      ),
    },
    {
      name: 'Max height',
      component: (
        <ComponentBox>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={maxHeightMenu.onOpen}
            color={maxHeightMenu.open ? 'inherit' : 'default'}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>

          <Menu
            id="long-menu"
            open={maxHeightMenu.open}
            onClose={maxHeightMenu.onClose}
            anchorEl={maxHeightMenu.anchorEl}
            slotProps={{ paper: { sx: { width: '20ch', maxHeight: 48 * 4.5 } } }}
          >
            {MAX_HEIGHT_OPTIONS.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={maxHeightMenu.onClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Menu',
        moreLinks: ['https://mui.com/material-ui/react-menu/'],
      }}
    />
  );
}
