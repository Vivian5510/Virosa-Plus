import type { Theme, SxProps } from '@mui/material/styles';
import type { Variant } from '@mui/material/styles/createTypography';

import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const TYPOGRAPHY_VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'overline',
  'button',
] as const;

const COLOR_VARIANTS = ['primary', 'secondary', 'disabled'];
const MAIN_COLOR_VARIANTS = ['primary', 'secondary', 'info', 'warning', 'error'];

const componentBoxStyles: SxProps<Theme> = {
  py: 3,
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const BASE_COMPONENTS = TYPOGRAPHY_VARIANTS.map((variant) => ({
  name: variant[0].toUpperCase() + variant.substring(1),
  component: <BlockVariant variant={variant} />,
}));

const DEMO_COMPONENTS = [
  ...BASE_COMPONENTS,
  {
    name: 'Colors',
    component: (
      <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
        {COLOR_VARIANTS.map((color) => (
          <ComponentBox key={color} sx={{ ...componentBoxStyles, color: `text.${color}` }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
              text {color}
            </Typography>
            <Typography variant="body2">
              Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque auctor
              neque nec urna. Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus.
            </Typography>
          </ComponentBox>
        ))}

        {MAIN_COLOR_VARIANTS.map((color) => (
          <ComponentBox key={color} sx={{ ...componentBoxStyles, color: `${color}.main` }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
              {color}
            </Typography>
            <Typography variant="body2">
              Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque auctor
              neque nec urna. Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus.
            </Typography>
          </ComponentBox>
        ))}
      </Box>
    ),
  },
];

// ----------------------------------------------------------------------

export function TypographyView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Typography',
        moreLinks: ['https://mui.com/components/typography'],
      }}
    />
  );
}

// ----------------------------------------------------------------------

type BlockVariantProps = {
  variant: Variant;
};

function BlockVariant({ variant }: BlockVariantProps) {
  const typographyRef = useRef<HTMLDivElement>(null);

  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration | null>(null);

  const handleUpdate = useCallback(() => {
    if (typographyRef.current) {
      const resolvedStyle = getComputedStyle(typographyRef.current);
      setComputedStyle(resolvedStyle);
    }
  }, []);

  useEffect(() => {
    handleUpdate();
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleUpdate);
    };
  }, [handleUpdate]);

  const lineHeight =
    parseInt(computedStyle?.lineHeight ?? '0px', 10) /
    parseInt(computedStyle?.fontSize ?? '0px', 10);

  return (
    <ComponentBox sx={componentBoxStyles}>
      <Typography ref={typographyRef} variant={variant}>
        How can you choose a typeface?
      </Typography>

      <Box
        sx={{
          gap: 0.5,
          display: 'flex',
          typography: 'body2',
          color: 'text.secondary',
          flexDirection: 'column',
          fontFamily: '"Lucida Console", Courier, monospace',
        }}
      >
        <span>fontSize: {computedStyle?.fontSize ?? '-'}</span>
        <span>lineHeight: {Number.isNaN(lineHeight) ? '-' : lineHeight.toFixed(2)}</span>
        <span>fontWeight: {computedStyle?.fontWeight ?? '-'}</span>
      </Box>
    </ComponentBox>
  );
}
