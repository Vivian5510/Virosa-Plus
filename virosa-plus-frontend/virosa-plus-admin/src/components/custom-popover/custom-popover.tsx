import Popover from '@mui/material/Popover';
import { listClasses } from '@mui/material/List';
import { menuItemClasses } from '@mui/material/MenuItem';

import { Arrow } from './styles';
import { calculateAnchorOrigin } from './utils';

import type { CustomPopoverProps } from './types';

// ----------------------------------------------------------------------

export function CustomPopover({
  open,
  onClose,
  children,
  anchorEl,
  slotProps,
  ...other
}: CustomPopoverProps) {
  const { arrow: arrowProps, paper: paperProps, ...otherSlotProps } = slotProps ?? {};

  const arrowSize = arrowProps?.size ?? 14;
  const arrowOffset = arrowProps?.offset ?? 17;
  const arrowPlacement = arrowProps?.placement ?? 'top-right';

  const { paperStyles, anchorOrigin, transformOrigin } = calculateAnchorOrigin(arrowPlacement);

  return (
    <Popover
      open={!!open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        ...otherSlotProps,
        paper: {
          ...paperProps,
          sx: [
            paperStyles,
            {
              overflow: 'inherit',
              [`& .${listClasses.root}`]: { minWidth: 140 },
              [`& .${menuItemClasses.root}`]: { gap: 2 },
            },
            ...(Array.isArray(paperProps?.sx) ? (paperProps?.sx ?? []) : [paperProps?.sx]),
          ],
        },
      }}
      {...other}
    >
      {!arrowProps?.hide && (
        <Arrow
          size={arrowSize}
          offset={arrowOffset}
          placement={arrowPlacement}
          sx={arrowProps?.sx}
        />
      )}

      {children}
    </Popover>
  );
}
