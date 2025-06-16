import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { Toolbar } from './toolbar';
import { ContainerView } from './container';
import { ControlPanel } from '../control-panel';

import type { ControlPanelProps } from '../control-panel';

// ----------------------------------------------------------------------

export function AnimateScroll({ options }: Pick<ControlPanelProps, 'options'>) {
  const [count, setCount] = useState(0);

  const [selectedVariant, setSelectedVariant] = useState('slideInUp');

  const handleChangeVariant = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCount(count + 1);
      setSelectedVariant(event.target.value);
    },
    [count]
  );

  return (
    <Card sx={{ height: 640, display: 'flex' }}>
      <Box
        sx={{
          p: 2.5,
          gap: 2.5,
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
        }}
      >
        <Toolbar onRefresh={() => setCount(count + 1)} />
        <ContainerView key={count} selectedVariant={selectedVariant} />
      </Box>

      <ControlPanel
        options={options}
        selectedVariant={selectedVariant}
        onChangeVariant={handleChangeVariant}
      />
    </Card>
  );
}
