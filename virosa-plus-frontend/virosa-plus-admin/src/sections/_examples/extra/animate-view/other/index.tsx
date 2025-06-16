import { useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { AnimateCountUp, AnimateLogoZoom, AnimateLogoRotate } from 'src/components/animate';

import { SvgPath } from './svg-path';
import { BorderEffects } from './border';
import { AnimateAvatars } from './avatar';
import { AnimateTapHover } from './tap-hover';
import { ComponentBox } from '../../../layout';

// ----------------------------------------------------------------------

export function AnimateOther() {
  const [count, setCount] = useState(0);

  const renderTapHover = () => (
    <ComponentBox title="Tap & hover" sx={{ flexDirection: 'column' }}>
      <AnimateTapHover />
    </ComponentBox>
  );

  const renderLogo = () => (
    <ComponentBox title="Logo" sx={{ gap: 5 }}>
      <AnimateLogoZoom />
      <AnimateLogoRotate />
    </ComponentBox>
  );

  const renderCountUp = () => (
    <ComponentBox key={count} title="Count up" sx={{ flexDirection: 'column' }}>
      <IconButton
        onClick={() => setCount(count + 1)}
        sx={{ position: 'absolute', right: 16, top: 16 }}
      >
        <Iconify icon="eva:refresh-fill" />
      </IconButton>

      <AnimateCountUp component="h6" variant="h1" to={500} unit="+" />
      <AnimateCountUp component="h6" variant="h1" from={200} to={500.14} toFixed={2} unit="k" />
    </ComponentBox>
  );

  const renderAvatar = () => (
    <ComponentBox title="Avatar">
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <AnimateAvatars />
      </Box>
    </ComponentBox>
  );

  const renderPath = () => (
    <ComponentBox title="Path">
      <IconButton
        onClick={() => setCount(count + 1)}
        sx={{ position: 'absolute', right: 16, top: 16 }}
      >
        <Iconify icon="eva:refresh-fill" />
      </IconButton>

      <SvgPath key={count} />
    </ComponentBox>
  );

  const renderBorderEffects = () => (
    <ComponentBox title="Border">
      <Box
        sx={{
          rowGap: 5,
          columnGap: 3,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <BorderEffects />
      </Box>
    </ComponentBox>
  );

  return (
    <Box
      sx={[
        () => ({
          rowGap: 5,
          columnGap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
        }),
      ]}
    >
      {renderTapHover()}
      {renderPath()}
      {renderCountUp()}
      {renderLogo()}
      {renderAvatar()}
      {renderBorderEffects()}
    </Box>
  );
}
