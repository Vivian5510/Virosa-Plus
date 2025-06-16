import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { Iconify } from 'src/components/iconify';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const SIZES = ['small', 'medium', 'large'] as const;

// ----------------------------------------------------------------------

type Props = {
  variant?: 'text' | 'contained' | 'outlined' | 'soft';
};

export function ButtonVariants({ variant = 'text' }: Props) {
  return (
    <>
      <ComponentBox title="Base" sx={{ gap: 1 }}>
        <Button variant={variant} color="inherit">
          Default
        </Button>
        <Button variant={variant} color="primary">
          Primary
        </Button>
        <Button variant={variant} color="secondary">
          Secondary
        </Button>
        <Button variant={variant} color="primary" disabled>
          Disabled
        </Button>
        <Button variant={variant}>Link</Button>
      </ComponentBox>

      <ComponentBox title="Colors" sx={{ gap: 1 }}>
        {COLORS.map((color) => (
          <Button key={color} variant={variant} color={color}>
            {color === 'inherit' ? 'default' : color}
          </Button>
        ))}
      </ComponentBox>

      <ComponentBox title="With icon & loading" sx={{ gap: 1 }}>
        <Button
          color="error"
          variant={variant}
          startIcon={<Iconify icon="ic:round-access-alarm" />}
        >
          Icon Left
        </Button>

        <Button variant={variant} color="error" endIcon={<Iconify icon="ic:round-access-alarm" />}>
          Icon Right
        </Button>

        <LoadingButton loading variant={variant}>
          Submit
        </LoadingButton>

        <LoadingButton loading loadingIndicator="Loading..." variant={variant}>
          Fetch data
        </LoadingButton>

        <LoadingButton
          loading
          size="large"
          loadingPosition="start"
          startIcon={<Iconify icon="ic:round-access-alarm" />}
          variant={variant}
        >
          Start
        </LoadingButton>

        <LoadingButton
          loading
          size="large"
          loadingPosition="end"
          endIcon={<Iconify icon="ic:round-access-alarm" />}
          variant={variant}
        >
          End
        </LoadingButton>
      </ComponentBox>

      <ComponentBox title="Sizes" sx={{ gap: 1 }}>
        {SIZES.map((size) => (
          <Button key={size} variant={variant} color="info" size={size}>
            {size}
          </Button>
        ))}

        {SIZES.map((size) => (
          <LoadingButton
            key={size}
            loading
            size={size}
            loadingPosition="start"
            startIcon={<Iconify icon="ic:round-access-alarm" />}
            variant={variant}
          >
            {size}
          </LoadingButton>
        ))}

        {SIZES.map((size) => (
          <LoadingButton
            key={size}
            loading
            size={size}
            loadingPosition="end"
            endIcon={<Iconify icon="ic:round-access-alarm" />}
            variant={variant}
          >
            {size}
          </LoadingButton>
        ))}
      </ComponentBox>
    </>
  );
}
