import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'] as const;

const SIZES = ['small', 'medium', 'large'] as const;

const VARIANTS = ['contained', 'outlined', 'text', 'soft'] as const;

// ----------------------------------------------------------------------

export function ButtonGroups() {
  return (
    <>
      <ComponentBox title="Contained">
        {COLORS.map((color) => (
          <ButtonGroup key={color} variant="contained" color={color}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="contained" color="info">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </ComponentBox>

      <ComponentBox title="Outlined">
        {COLORS.map((color) => (
          <ButtonGroup key={color} variant="outlined" color={color}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="outlined" color="info">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </ComponentBox>

      <ComponentBox title="Text">
        {COLORS.map((color) => (
          <ButtonGroup key={color} variant="text" color={color}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="text" color="info">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </ComponentBox>

      <ComponentBox title="Soft">
        {COLORS.map((color) => (
          <ButtonGroup key={color} variant="soft" color={color}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="soft" color="info">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </ComponentBox>

      <ComponentBox title="Sizes">
        {SIZES.map((size) => (
          <ButtonGroup key={size} size={size} variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}
      </ComponentBox>

      <ComponentBox title="Orientation">
        {VARIANTS.map((variant) => (
          <ButtonGroup key={variant} variant={variant} orientation="vertical">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="soft" color="info" orientation="vertical">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </ComponentBox>
    </>
  );
}
