import type { CardProps } from '@mui/material/Card';
import type { InputProps } from '@mui/material/Input';
import type { DialogProps } from '@mui/material/Dialog';
import type { Theme, SxProps } from '@mui/material/styles';

import { useBoolean } from 'minimal-shared/hooks';
import { useId, useState, useCallback } from 'react';
import {
  varAlpha,
  transformValue,
  transformValueOnBlur,
  transformValueOnChange,
} from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogActions from '@mui/material/DialogActions';
import Input, { inputClasses } from '@mui/material/Input';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

const STEP = 50;
const MIN_AMOUNT = 0;
const MAX_AMOUNT = 1000;

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  }[];
};

export function BankingQuickTransfer({ title, subheader, list, sx, ...other }: Props) {
  const carousel = useCarousel({
    loop: true,
    dragFree: true,
    slidesToShow: 'auto',
    slideSpacing: '20px',
  });

  const confirmDialog = useBoolean();

  const [amount, setAmount] = useState<string | number>(200);

  const contactInfo = list.find((_, index) => index === carousel.dots.selectedIndex);

  const handleChangeSlider = useCallback((event: Event, newValue: number | number[]) => {
    setAmount(newValue as number);
  }, []);

  const handleChangeAmountInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const transformedValue = transformValueOnChange(event.target.value);
    setAmount(transformedValue);
  }, []);

  const handleBlurAmountInput = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const transformedValue = transformValueOnBlur(event.target.value);

    if (typeof transformedValue === 'number') {
      if (transformedValue > MAX_AMOUNT) {
        setAmount(MAX_AMOUNT);
      } else {
        setAmount(transformedValue);
      }
    }
  }, []);

  const renderCarousel = () => (
    <Box sx={{ position: 'relative' }}>
      <CarouselArrowFloatButtons
        {...carousel.arrows}
        options={carousel.options}
        slotProps={{ prevBtn: { svgSize: 14 }, nextBtn: { svgSize: 14 } }}
        sx={[
          (theme) => ({
            p: 0.5,
            borderRadius: '50%',
            bgcolor: varAlpha(theme.vars.palette.text.primaryChannel, 0.48),
            '&:hover': { bgcolor: theme.vars.palette.text.primary },
          }),
        ]}
      />

      <Carousel carousel={carousel} sx={{ py: 5 }}>
        {list.map((contact, index) => (
          <Tooltip key={contact.id} title={contact.name} arrow placement="top">
            <Avatar
              src={contact.avatarUrl}
              onClick={() => carousel.dots.onClickDot(index)}
              sx={[
                (theme) => ({
                  mx: 'auto',
                  opacity: 0.48,
                  cursor: 'pointer',
                  transition: theme.transitions.create(['all']),
                  ...(index === carousel.dots.selectedIndex && {
                    opacity: 1,
                    transform: 'scale(1.25)',
                    boxShadow: `-4px 12px 24px 0 ${varAlpha(theme.vars.palette.common.blackChannel, 0.12)}`,
                    ...theme.applyStyles('dark', {
                      boxShadow: `-4px 12px 24px 0 ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                    }),
                  }),
                }),
              ]}
            />
          </Tooltip>
        ))}
      </Carousel>
    </Box>
  );

  const renderInput = () => (
    <>
      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        Insert amount
      </Typography>

      <InputAmount
        disableUnderline
        value={transformValue(amount)}
        onBlur={handleBlurAmountInput}
        onChange={handleChangeAmountInput}
        sx={{ my: 3 }}
      />

      <Slider
        value={typeof amount === 'number' ? amount : 0}
        valueLabelDisplay="auto"
        step={STEP}
        marks
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        onChange={handleChangeSlider}
      />

      <Box sx={{ my: 4, display: 'flex', alignItems: 'center', typography: 'subtitle1' }}>
        <Box component="span" sx={{ flexGrow: 1 }}>
          Your balance
        </Box>
        {fCurrency(34212)}
      </Box>

      <Button
        fullWidth
        size="large"
        color="inherit"
        variant="contained"
        disabled={amount === 0}
        onClick={confirmDialog.onTrue}
      >
        Transfer now
      </Button>
    </>
  );

  const renderConfrimDialog = () => (
    <ConfirmTransferDialog
      contactInfo={contactInfo}
      open={confirmDialog.value}
      value={transformValue(amount)}
      onBlur={handleBlurAmountInput}
      onChange={handleChangeAmountInput}
      onClose={() => {
        setAmount(0);
        confirmDialog.onFalse();
      }}
    />
  );

  return (
    <>
      <Box
        sx={[
          (theme) => ({
            borderRadius: 2,
            bgcolor: 'background.neutral',
            boxShadow: theme.vars.customShadows.z1,
            border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <CardHeader title={title} subheader={subheader} />

        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', flexGrow: 1 }}>
              Recent
            </Typography>

            <Button
              size="small"
              color="inherit"
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
              sx={{ mr: -1 }}
            >
              View all
            </Button>
          </Box>

          {renderCarousel()}
          {renderInput()}
        </Box>
      </Box>

      {renderConfrimDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

type ConfirmTransferDialogProps = InputProps &
  DialogProps & {
    onClose: () => void;
    contactInfo?: {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    };
  };

function ConfirmTransferDialog({
  open,
  value,
  onBlur,
  onClose,
  onChange,
  contactInfo,
}: ConfirmTransferDialogProps) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>Transfer to</DialogTitle>

      <Box
        sx={{
          px: 3,
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar src={contactInfo?.avatarUrl} sx={{ width: 48, height: 48 }} />

          <ListItemText
            primary={contactInfo?.name}
            secondary={contactInfo?.email}
            slotProps={{
              secondary: { sx: { mt: 0.5 } },
            }}
          />
        </Box>

        <InputAmount onBlur={onBlur} onChange={onChange} value={value} />

        <TextField fullWidth multiline rows={3} placeholder="Write a message..." />
      </Box>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" disabled={value === '0'} onClick={onClose}>
          Transfer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function InputAmount({ value, sx, inputProps, ...other }: InputProps) {
  const id = useId();

  const inputStyles: SxProps<Theme> = {
    p: 0,
    typography: 'h3',
    textAlign: 'center',
  };

  const renderAdornment = () => (
    <Box
      sx={{
        gap: 0.5,
        height: 1,
        mx: 'auto',
        display: 'flex',
        transform: 'translateX(-8px)',
      }}
    >
      <Box component="span" sx={{ typography: 'h5', transform: 'translate(0px, 4px)' }}>
        $
      </Box>
      <Box component="span" sx={{ ...inputStyles, mx: 'auto', visibility: 'hidden' }}>
        {value as string}
      </Box>
    </Box>
  );

  return (
    <Input
      value={value}
      inputProps={{
        id: `amount-${id}-input`,
        ...inputProps,
      }}
      endAdornment={renderAdornment()}
      sx={[
        {
          height: 48,
          display: 'flex',
          alignSelf: 'center',
          [`& .${inputClasses.input}`]: {
            ...inputStyles,
            position: 'absolute',
            zIndex: 1,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}
