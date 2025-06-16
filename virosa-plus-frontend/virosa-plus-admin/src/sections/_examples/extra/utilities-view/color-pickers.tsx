import type { Theme, SxProps } from '@mui/material/styles';

import { useState } from 'react';

import Box from '@mui/material/Box';

import { ColorPicker, ColorPreview } from 'src/components/color-utils';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = [
  '#FF9800',
  '#673AB7',
  '#8BC34A',
  '#009688',
  '#3F51B5',
  '#03A9F4',
  '#607D8B',
  '#4CAF50',
  '#00BCD4',
  '#CDDC39',
  '#E91E63',
  '#FFC107',
  '#9C27B0',
  '#FF5722',
  '#795548',
  '#2196F3',
  '#9E9E9E',
  '#F44336',
  '#FFEB3B',
];

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
};

export function ColorPickers() {
  const [singleColor, setSingleColor] = useState<string>(COLORS[0]);
  const [multipleColors, setMultipleColors] = useState<string[]>([COLORS[7], COLORS[8]]);

  return (
    <>
      <ComponentBox title="Single" sx={componentBoxStyles}>
        <ColorPicker
          options={COLORS.slice(0, 6)}
          value={singleColor}
          onChange={(newValue) => setSingleColor(newValue as typeof singleColor)}
        />

        <Box component="span" sx={{ typography: 'body2' }}>
          {singleColor}
        </Box>
      </ComponentBox>

      <ComponentBox title="Multiple" sx={componentBoxStyles}>
        <ColorPicker
          limit={6}
          variant="rounded"
          options={COLORS.slice(0, 16)}
          value={multipleColors}
          onChange={(newValue) => setMultipleColors(newValue as typeof multipleColors)}
        />

        <Box component="span" sx={{ typography: 'body2' }}>
          {JSON.stringify(multipleColors, null, 2)}
        </Box>
      </ComponentBox>

      <ComponentBox title="Preview">
        <ColorPreview colors={COLORS} limit={6} />
      </ComponentBox>
    </>
  );
}
