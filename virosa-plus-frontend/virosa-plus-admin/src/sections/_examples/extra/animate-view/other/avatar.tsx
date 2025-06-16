import type { Theme } from '@mui/material/styles';
import type { AvatarProps } from '@mui/material/Avatar';

import { varAlpha } from 'minimal-shared/utils';

import Avatar from '@mui/material/Avatar';

import { _mock } from 'src/_mock';

import { AnimateBorder } from 'src/components/animate';

// ----------------------------------------------------------------------

const AVATAR_VARIANTS = [
  {
    variant: 'circular',
    borders: [
      {
        outlineColor: 'cyan',
        primaryBorder: { size: 160, sx: { color: 'magenta' } },
        secondaryBorder: { sx: { color: 'yellow' } },
      },
      {
        primaryBorder: { size: 120, sx: { color: 'primary.main' } },
        secondaryBorder: { sx: { color: 'primary.main' } },
      },
      {
        outlineColor: (theme: Theme) => varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
        primaryBorder: { size: 180, sx: { color: 'primary.main' } },
        secondaryBorder: { sx: { color: 'warning.main' } },
      },
    ],
  },
  {
    variant: 'square',
    borders: [
      {
        outlineColor: 'cyan',
        primaryBorder: { size: 160, sx: { color: 'magenta' } },
        secondaryBorder: { sx: { color: 'yellow' } },
      },
      {
        primaryBorder: { size: 120, sx: { color: 'primary.main' } },
        secondaryBorder: { sx: { color: 'primary.main' } },
      },
      {
        outlineColor: (theme: Theme) => varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
        primaryBorder: { size: 180, sx: { color: 'primary.main' } },
        secondaryBorder: { sx: { color: 'warning.main' } },
      },
    ],
  },
  {
    variant: 'rounded',
    borders: [
      {
        outlineColor: 'cyan',
        primaryBorder: { size: 160, sx: { color: 'magenta' } },
        secondaryBorder: { sx: { color: 'yellow' } },
      },
      {
        primaryBorder: { size: 120, sx: { color: 'primary.main' } },
        secondaryBorder: { sx: { color: 'primary.main' } },
      },
      {
        outlineColor: (theme: Theme) => varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
        primaryBorder: { size: 180, sx: { color: 'primary.main' } },
        secondaryBorder: { sx: { color: 'warning.main' } },
      },
    ],
  },
];

export function AnimateAvatars() {
  return (
    <>
      {AVATAR_VARIANTS.map(({ variant, borders }) =>
        borders.map((borderProps, index) => (
          <AnimateBorder
            key={`${variant}-${index}`}
            sx={{
              p: '6px',
              width: 120,
              height: 120,
              borderRadius: variant === 'circular' ? '50%' : variant === 'rounded' ? '16px' : '0',
            }}
            slotProps={borderProps}
          >
            <Avatar
              variant={variant as AvatarProps['variant']}
              src={_mock.image.avatar(24)}
              sx={{ width: 1, height: 1 }}
            />
          </AnimateBorder>
        ))
      )}
    </>
  );
}
