import type { MotionProps } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import { useRef } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varContainer, MotionViewport } from 'src/components/animate';

import { getVariant } from '../get-variant';

// ----------------------------------------------------------------------

type Props = BoxProps &
  MotionProps & {
    selectedVariant: string;
  };

export function ContainerView({ selectedVariant, sx, ...other }: Props) {
  const scrollRef = useRef(null);

  return (
    <Box
      ref={scrollRef}
      component={m.div}
      variants={varContainer()}
      sx={[
        () => ({
          py: 5,
          gap: 3,
          borderRadius: 2,
          display: 'flex',
          flex: '1 1 auto',
          overflowX: 'auto',
          flexDirection: 'column',
          bgcolor: 'background.neutral',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {Array.from({ length: 40 }, (_, index) => (
        <Box
          key={index}
          component={MotionViewport}
          variants={getVariant(selectedVariant)}
          viewport={{ root: scrollRef, once: true, amount: 0.1 }}
          sx={[
            (theme) => ({
              py: 4,
              width: 1,
              mx: 'auto',
              maxWidth: 480,
              flexShrink: 0,
              borderRadius: 1,
              textAlign: 'center',
              bgcolor: 'background.paper',
              boxShadow: theme.vars.customShadows.z8,
            }),
          ]}
        >
          <Typography variant="body2">Item {index + 1}</Typography>
        </Box>
      ))}
    </Box>
  );
}
