import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';

import { hexToRgbChannel } from 'minimal-shared/utils';
import { useCopyToClipboard } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { toast } from 'src/components/snackbar';

import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const COLOR_PALETTE = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const COLOR_VARIATIONS = ['lighter', 'light', 'main', 'dark', 'darker'] as const;

const GREY_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

const boxStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
};

// ----------------------------------------------------------------------

export function ColorsView() {
  const theme = useTheme();

  const { copy } = useCopyToClipboard();

  const onCopy = (color: string) => {
    if (color) {
      toast.success(`Copied: ${color}`);
      copy(color);
    }
  };

  const BASE_COMPONENTS = COLOR_PALETTE.map((color) => ({
    name: color[0].toUpperCase() + color.substring(1),
    component: (
      <Box sx={boxStyles}>
        {COLOR_VARIATIONS.map((variation) => (
          <ColorCard
            key={variation}
            variation={variation}
            varColor={theme.vars.palette[color][variation]}
            hexColor={theme.palette[color][variation]}
            onClick={() => onCopy(theme.palette[color][variation])}
          />
        ))}
      </Box>
    ),
  }));

  const DEMO_COMPONENTS = [
    ...BASE_COMPONENTS,
    {
      name: 'Grey',
      component: (
        <Box sx={boxStyles}>
          {GREY_SHADES.map((variation) => (
            <ColorCard
              key={variation}
              variation={variation}
              varColor={theme.vars.palette.grey[variation]}
              hexColor={theme.palette.grey[variation]}
              onClick={() => onCopy(theme.palette.grey[variation])}
            />
          ))}
        </Box>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Color',
        moreLinks: ['https://mui.com/customization/color', 'https://colors.eva.design'],
      }}
    />
  );
}

// ----------------------------------------------------------------------

type ColorCardProps = BoxProps & {
  varColor: string;
  hexColor: string;
  variation: string;
};

function ColorCard({ varColor, hexColor, variation, sx, ...other }: ColorCardProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          p: 2,
          gap: 1,
          display: 'flex',
          cursor: 'pointer',
          bgcolor: varColor,
          flexDirection: 'column',
          color: theme.palette.getContrastText(hexColor),
          transition: theme.transitions.create(['opacity', 'background-color'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter,
          }),
          '&:hover': { opacity: 0.8 },
          '& span': { opacity: 0.64 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', flexGrow: 1 }}>
        {variation}
      </Typography>

      <Stack sx={{ typography: 'caption' }}>
        <span>Var</span>
        {varColor}
      </Stack>

      <Stack sx={{ typography: 'caption' }}>
        <span>Hex</span>

        {hexColor}
      </Stack>

      <Stack sx={{ typography: 'caption' }}>
        <span>Rgb</span>
        {hexToRgbChannel(hexColor)}
      </Stack>
    </Box>
  );
}
