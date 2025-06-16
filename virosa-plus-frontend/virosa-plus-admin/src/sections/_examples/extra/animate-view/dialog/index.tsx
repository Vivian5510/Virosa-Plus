import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { ContainerView } from './container';
import { ControlPanel } from '../control-panel';

import type { ControlPanelProps } from '../control-panel';

// ----------------------------------------------------------------------

export function AnimateDialog({ options }: Pick<ControlPanelProps, 'options'>) {
  const openDialog = useBoolean();

  const [selectedVariant, setSelectedVariant] = useState('slideInUp');

  const handleChangeVariant = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVariant(event.target.value);
  }, []);

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
        <ContainerView
          open={openDialog.value}
          onOpen={openDialog.onTrue}
          onClose={openDialog.onFalse}
          selectedVariant={selectedVariant}
        />
      </Box>

      <ControlPanel
        options={options}
        selectedVariant={selectedVariant}
        onChangeVariant={handleChangeVariant}
      />
    </Card>
  );
}
