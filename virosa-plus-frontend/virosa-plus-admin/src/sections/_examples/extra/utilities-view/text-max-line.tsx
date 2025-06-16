import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

const content = `
Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna. Proin
sapien ipsum, porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc et
pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor.
`;

export function TextMaxLine() {
  return (
    <>
      <ComponentBox
        title="1 Line"
        sx={{ flexDirection: 'column', alignItems: 'unset', minWidth: 0 }}
      >
        <Typography noWrap sx={{ width: 1 }}>
          {content}
        </Typography>
      </ComponentBox>

      <ComponentBox
        title="2 Line"
        sx={{ flexDirection: 'column', alignItems: 'unset', minWidth: 0 }}
      >
        <Typography
          sx={[
            (theme) => ({
              ...theme.mixins.maxLine({ line: 2 }),
            }),
          ]}
        >
          {content}
        </Typography>
      </ComponentBox>

      <ComponentBox
        title="3 Line"
        sx={{ flexDirection: 'column', alignItems: 'unset', minWidth: 0 }}
      >
        <Typography
          sx={[
            (theme) => ({
              ...theme.mixins.maxLine({ line: 3 }),
            }),
          ]}
        >
          {content}
        </Typography>
      </ComponentBox>

      <ComponentBox
        title="4 Line"
        sx={{ flexDirection: 'column', alignItems: 'unset', minWidth: 0 }}
      >
        <Typography
          sx={[
            (theme) => ({
              ...theme.mixins.maxLine({ line: 4 }),
            }),
          ]}
        >
          {content}
        </Typography>
      </ComponentBox>

      <ComponentBox
        title="As Link"
        sx={{ flexDirection: 'column', alignItems: 'unset', minWidth: 0 }}
      >
        <Link
          href="#"
          color="primary"
          sx={[
            (theme) => ({
              ...theme.mixins.maxLine({ line: 3 }),
              maxWidth: 300,
            }),
          ]}
        >
          {content}
        </Link>
      </ComponentBox>

      <ComponentBox
        title="Persistent"
        sx={{ flexDirection: 'column', alignItems: 'unset', minWidth: 0 }}
      >
        <Typography
          variant="h6"
          sx={[
            (theme) => ({
              ...theme.mixins.maxLine({
                line: 3,
                persistent: theme.typography.h6,
              }),
              bgcolor: 'background.neutral',
            }),
          ]}
        >
          Donec posuere vulputate arcu.
        </Typography>
      </ComponentBox>
    </>
  );
}
