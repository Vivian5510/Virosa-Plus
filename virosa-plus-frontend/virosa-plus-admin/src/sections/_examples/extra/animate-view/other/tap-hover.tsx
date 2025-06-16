import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { _mock } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { varTap, varHover, transitionTap, transitionHover } from 'src/components/animate';

// ----------------------------------------------------------------------

const rowStyles: SxProps<Theme> = {
  columnGap: 3,
  display: 'flex',
  alignItems: 'center',
};

const buttonProps = {
  component: m.button,
  transition: transitionTap(),
  color: 'primary',
} as const;

export function AnimateTapHover() {
  const renderImage = () => (
    <Box sx={{ height: 240, overflow: 'hidden', borderRadius: 2 }}>
      <Box
        component={m.img}
        whileHover={varHover(1.5)}
        transition={transitionHover()}
        src={_mock.image.cover(2)}
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
      />
    </Box>
  );

  const renderFabs = () => (
    <Box sx={rowStyles}>
      <Fab {...buttonProps} whileHover={varHover()} whileTap={varTap()} size="small">
        <Iconify width={24} icon="mingcute:add-line" />
      </Fab>
      <Fab {...buttonProps} whileHover={varHover()} whileTap={varTap()} size="medium">
        <Iconify width={24} icon="mingcute:add-line" />
      </Fab>
      <Fab {...buttonProps} whileHover={varHover(1.08)} whileTap={varTap()}>
        <Iconify width={24} icon="mingcute:add-line" />
      </Fab>
    </Box>
  );

  const renderIconButtons = () => (
    <Box sx={rowStyles}>
      <IconButton {...buttonProps} whileHover={varHover()} whileTap={varTap()} size="small">
        <Iconify width={24} icon="mingcute:add-line" />
      </IconButton>
      <IconButton {...buttonProps} whileHover={varHover()} whileTap={varTap()}>
        <Iconify width={24} icon="mingcute:add-line" />
      </IconButton>
      <IconButton {...buttonProps} whileHover={varHover()} whileTap={varTap()} size="large">
        <Iconify width={24} icon="mingcute:add-line" />
      </IconButton>
    </Box>
  );

  const renderButtons = () => (
    <Box sx={rowStyles}>
      <Button {...buttonProps} whileTap={varTap(0.95)} variant="contained" size="small">
        Small
      </Button>
      <Button {...buttonProps} whileTap={varTap(0.95)} variant="contained">
        Medium
      </Button>
      <Button {...buttonProps} whileTap={varTap(0.95)} variant="contained" size="large">
        Large
      </Button>
    </Box>
  );

  return (
    <>
      {renderImage()}
      {renderFabs()}
      {renderIconButtons()}
      {renderButtons()}
    </>
  );
}
