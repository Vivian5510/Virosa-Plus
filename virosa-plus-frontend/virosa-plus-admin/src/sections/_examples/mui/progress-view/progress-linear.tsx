import LinearProgress from '@mui/material/LinearProgress';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

// ----------------------------------------------------------------------

type LinearProps = {
  progress: number;
  buffer: number;
};

export function ProgressLinear({ progress, buffer }: LinearProps) {
  return (
    <>
      <ComponentBox title="Indeterminate" sx={{ flexDirection: 'column' }}>
        {COLORS.map((color) => (
          <LinearProgress key={color} color={color} sx={{ mb: 2, width: 1 }} />
        ))}
      </ComponentBox>

      <ComponentBox title="Determinate" sx={{ flexDirection: 'column' }}>
        {COLORS.map((color) => (
          <LinearProgress
            key={color}
            color={color}
            value={progress}
            variant="determinate"
            sx={{ mb: 2, width: 1 }}
          />
        ))}
      </ComponentBox>

      <ComponentBox title="Buffer" sx={{ flexDirection: 'column' }}>
        {COLORS.map((color) => (
          <LinearProgress
            key={color}
            color={color}
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
            sx={{ mb: 2, width: 1 }}
          />
        ))}
      </ComponentBox>

      <ComponentBox title="Query" sx={{ flexDirection: 'column' }}>
        {COLORS.map((color) => (
          <LinearProgress
            key={color}
            color={color}
            variant="query"
            value={progress}
            valueBuffer={buffer}
            sx={{ mb: 2, width: 1 }}
          />
        ))}
      </ComponentBox>
    </>
  );
}
