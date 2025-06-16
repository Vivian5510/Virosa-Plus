import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';

import { _mock } from 'src/_mock';

import { getVariant } from '../get-variant';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  selectedVariant: string;
};

export function ContainerView({ selectedVariant, sx, ...other }: Props) {
  const isKenburns = selectedVariant.includes('kenburns');

  return (
    <Box
      sx={[
        () => ({
          borderRadius: 2,
          flex: '1 1 auto',
          overflow: 'hidden',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isKenburns ? (
        <Box
          component={m.img}
          src={_mock.image.cover(7)}
          {...getVariant(selectedVariant)}
          sx={{ width: 1, height: 1, objectFit: 'cover' }}
        />
      ) : (
        <Box component={m.div} {...getVariant(selectedVariant)} sx={{ height: 1, width: 1 }} />
      )}
    </Box>
  );
}
