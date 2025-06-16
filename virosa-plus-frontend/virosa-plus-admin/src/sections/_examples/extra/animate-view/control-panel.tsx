import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import type { VariantOption } from './variant-keys';

// ----------------------------------------------------------------------

export type ControlPanelProps = BoxProps & {
  options: VariantOption[];
  selectedVariant: string;
  onChangeVariant: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ControlPanel({
  sx,
  options,
  selectedVariant,
  onChangeVariant,
  ...other
}: ControlPanelProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          p: 2.5,
          width: 280,
          flexShrink: 0,
          overflowX: 'auto',
          borderLeft: `solid 1px ${theme.vars.palette.divider}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <RadioGroup value={selectedVariant} onChange={onChangeVariant}>
        {options.map((variant) => (
          <Box key={variant.type} sx={{ my: 1.5 }}>
            <Typography variant="overline" sx={{ px: 1, mb: 1, display: 'block' }}>
              {variant.type}
            </Typography>

            {variant.values.map((value) => (
              <FormControlLabel
                key={value}
                value={value}
                label={value}
                control={<Radio sx={{ display: 'none' }} />}
                sx={{
                  px: 1,
                  py: 0.5,
                  mx: 0,
                  my: 0.25,
                  width: '100%',
                  borderRadius: 0.75,
                  color: 'text.secondary',
                  ...(selectedVariant === value && {
                    bgcolor: 'warning.main',
                    color: 'warning.contrastText',
                  }),
                }}
              />
            ))}
          </Box>
        ))}
      </RadioGroup>
    </Box>
  );
}
