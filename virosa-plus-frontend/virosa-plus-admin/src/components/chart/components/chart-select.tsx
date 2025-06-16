import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { varAlpha } from 'minimal-shared/utils';
import { usePopover } from 'minimal-shared/hooks';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from 'src/components/iconify';

import { CustomPopover } from '../../custom-popover';

import type { CustomPopoverProps } from '../../custom-popover';

// ----------------------------------------------------------------------

type ChartSelectProps = Omit<ButtonBaseProps, 'onChange'> & {
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
  slotProps?: {
    button?: ButtonBaseProps;
    popover?: CustomPopoverProps;
  };
};

export function ChartSelect({ options, value, onChange, slotProps, ...other }: ChartSelectProps) {
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const renderMenuActions = () => (
    <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose} {...slotProps?.popover}>
      <MenuList>
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === value}
            onClick={() => {
              onClose();
              onChange(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <ButtonBase
        onClick={onOpen}
        {...slotProps?.button}
        sx={[
          (theme) => ({
            pr: 1,
            pl: 1.5,
            gap: 1.5,
            height: 34,
            borderRadius: 1,
            typography: 'subtitle2',
            border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
          }),
          ...(Array.isArray(slotProps?.button?.sx)
            ? (slotProps?.button?.sx ?? [])
            : [slotProps?.button?.sx]),
        ]}
        {...other}
      >
        {value}

        <Iconify
          width={16}
          icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
        />
      </ButtonBase>

      {renderMenuActions()}
    </>
  );
}
