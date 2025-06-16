import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';

import { _mock } from 'src/_mock';

import { AnimateText, MotionContainer } from 'src/components/animate';

import { getVariant } from '../get-variant';

// ----------------------------------------------------------------------

const TEXT = 'Minimals';

const IMG = [
  _mock.image.cover(2),
  _mock.image.cover(3),
  _mock.image.cover(4),
  _mock.image.cover(5),
];

type Props = BoxProps & {
  isText: boolean;
  isMulti: boolean;
  selectedVariant: string;
};

export function ContainerView({ isText, isMulti, selectedVariant, sx, ...other }: Props) {
  const items = isMulti ? IMG : IMG.slice(0, 1);

  const renderText = () => (
    <AnimateText
      component="h1"
      variant="h1"
      textContent={TEXT}
      variants={getVariant(selectedVariant, 400)}
      sx={{ overflow: 'hidden' }}
    />
  );

  const renderItems = () => (
    <MotionContainer
      sx={{
        gap: 3,
        width: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          component={m.img}
          src={item}
          variants={getVariant(selectedVariant, 800)}
          sx={[
            (theme) => ({
              width: 480,
              borderRadius: 1,
              objectFit: 'cover',
              height: isMulti ? 80 : 320,
              boxShadow: theme.vars.customShadows.z8,
            }),
          ]}
        />
      ))}
    </MotionContainer>
  );

  return (
    <Box
      sx={[
        () => ({
          borderRadius: 2,
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isText ? renderText() : renderItems()}
    </Box>
  );
}
