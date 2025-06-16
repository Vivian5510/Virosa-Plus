import type { Theme, SxProps } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import { alpha as hexAlpha } from '@mui/material/styles';

import { AnimateBorder } from 'src/components/animate';

// ----------------------------------------------------------------------

const boxSize: SxProps<Theme> = {
  width: 96,
  height: 96,
};

export function BorderEffects() {
  const createBorder = (borderRadius: string, borderWidth: string) => (
    <AnimateBorder
      sx={{ ...boxSize, borderRadius }}
      slotProps={{
        outlineColor: (theme) =>
          `linear-gradient(135deg, ${varAlpha(theme.vars.palette.secondary.lightChannel, 0.08)} 50%, ${varAlpha(theme.vars.palette.error.mainChannel, 0.24)})`,
        primaryBorder: {
          size: 60,
          width: borderWidth,
          sx: (theme) => ({
            color: theme.vars.palette.secondary.main,
          }),
        },
        secondaryBorder: {
          sx: (theme) => ({
            color: theme.vars.palette.error.main,
          }),
        },
      }}
    />
  );

  return (
    <>
      <AnimateBorder
        sx={{ ...boxSize, borderRadius: 2 }}
        slotProps={{
          outlineColor: hexAlpha('#000', 0.08),
          primaryBorder: {
            size: 60,
            sx: { color: 'black' },
          },
        }}
      />

      <AnimateBorder
        sx={{ ...boxSize, borderRadius: 2 }}
        slotProps={{
          outlineColor: hexAlpha('#087f5b', 0.08),
          primaryBorder: {
            width: '4px',
            size: 60,
            sx: { color: '#087f5b' },
          },
        }}
      />

      <AnimateBorder
        sx={{ ...boxSize, borderRadius: 2 }}
        slotProps={{
          outlineColor: (theme) =>
            `linear-gradient(135deg, ${varAlpha(theme.vars.palette.secondary.lightChannel, 0.08)} 50%, ${varAlpha(theme.vars.palette.secondary.mainChannel, 0.24)})`,
          primaryBorder: {
            width: '4px',
            size: 60,
            sx: (theme) => ({
              color: theme.vars.palette.secondary.main,
            }),
          },
          secondaryBorder: {
            sx: (theme) => ({
              color: theme.vars.palette.error.main,
            }),
          },
        }}
      />

      <AnimateBorder
        sx={boxSize}
        slotProps={{
          outlineColor: (theme) =>
            `linear-gradient(135deg, ${hexAlpha('#087f5b', 0.08)} 50%, ${hexAlpha('#e67700', 0.24)})`,
          primaryBorder: {
            size: 60,
            width: '4px',
            sx: { color: '#087f5b' },
          },
          secondaryBorder: {
            sx: { color: '#e67700' },
          },
        }}
      />

      {createBorder('32px 0 0 0', '4px 0 0 4px')}
      {createBorder('0 32px 0 0', '4px 4px 0 0')}
      {createBorder('0 0 32px 0', '0 4px 4px 0')}
      {createBorder('0 0 0 32px', '0 0 4px 4px')}

      {createBorder('0 32px 0 32px', '4px')}
      {createBorder('32px 0 32px 0', '4px')}
      {createBorder('32px 32px 32px 0', '4px')}
      {createBorder('0 32px 32px 32px', '4px')}

      <AnimateBorder
        sx={{ borderRadius: 2 }}
        slotProps={{
          outlineColor: (theme) =>
            `linear-gradient(135deg, ${varAlpha(theme.vars.palette.secondary.lightChannel, 0.08)} 50%, ${varAlpha(theme.vars.palette.secondary.mainChannel, 0.24)})`,
          primaryBorder: {
            size: 60,
            sx: (theme) => ({
              color: theme.vars.palette.secondary.main,
            }),
          },
          secondaryBorder: {
            sx: (theme) => ({
              color: theme.vars.palette.error.main,
            }),
          },
        }}
      >
        <ButtonBase
          sx={{
            py: 2,
            px: 3,
            fontWeight: 'fontWeightBold',
          }}
        >
          ButtonBase
        </ButtonBase>
      </AnimateBorder>

      <AnimateBorder
        sx={{
          borderRadius: 2,
          bgcolor: 'grey.800',
          color: 'common.white',
        }}
        slotProps={{
          outlineColor: (theme) =>
            `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.lightChannel, 0.08)} 50%, ${varAlpha(theme.vars.palette.warning.mainChannel, 0.24)})`,
          primaryBorder: {
            size: 100,
            width: '3px',
            sx: (theme) => ({
              color: theme.vars.palette.primary.main,
            }),
          },
          secondaryBorder: {
            sx: (theme) => ({
              color: theme.vars.palette.warning.main,
            }),
          },
        }}
      >
        <Button size="large" sx={{ py: 2, px: 3 }}>
          Button
        </Button>
      </AnimateBorder>
    </>
  );
}
