import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

import type { WalktourTooltipProps } from './types';

// ----------------------------------------------------------------------

export function WalktourTooltip({
  size,
  step,
  index,
  backProps,
  skipProps,
  continuous,
  closeProps,
  isLastStep,
  primaryProps,
  tooltipProps,
}: WalktourTooltipProps) {
  const {
    title,
    content,
    slotProps,
    hideFooter,
    showProgress,
    showSkipButton,
    hideBackButton,
    hideCloseButton,
  } = step;

  const progress = ((index + 1) / size) * 100;

  const renderSkipBtn = () =>
    index > 0 &&
    !isLastStep && (
      <Button {...skipProps} disableRipple {...slotProps?.skipBtn}>
        {skipProps.title}
      </Button>
    );

  const renderBackBtn = () =>
    index > 0 && (
      <Button {...backProps} disableRipple variant="outlined" {...slotProps?.backBtn}>
        {backProps.title}
      </Button>
    );

  const renderNextBtn = () =>
    continuous && (
      <Button
        {...primaryProps}
        disableRipple
        role="button"
        variant="contained"
        color={isLastStep ? 'primary' : 'inherit'}
        {...slotProps?.nextBtn}
      >
        {primaryProps.title}
      </Button>
    );

  const renderCloseBtn = () =>
    !isLastStep && (
      <IconButton
        {...closeProps}
        {...slotProps?.closeBtn}
        sx={[
          (theme) => ({
            p: 0.5,
            top: 10,
            right: 10,
            position: 'absolute',
            border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
          }),
          ...(Array.isArray(slotProps?.closeBtn?.sx)
            ? (slotProps?.closeBtn?.sx ?? [])
            : [slotProps?.closeBtn?.sx]),
        ]}
      >
        <Iconify icon="mingcute:close-line" width={16} />
      </IconButton>
    );

  const renderProgress = () => (
    <LinearProgress
      variant="determinate"
      value={progress}
      {...slotProps?.progress}
      sx={[
        (theme) => ({
          height: 2,
          borderRadius: 0,
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.2),
          [`& .${linearProgressClasses.bar}`]: {
            background: `linear-gradient(135deg, ${theme.vars.palette.primary.light} 0%, ${theme.vars.palette.primary.main} 100%)`,
          },
        }),
        ...(Array.isArray(slotProps?.progress?.sx)
          ? (slotProps?.progress?.sx ?? [])
          : [slotProps?.progress?.sx]),
      ]}
    />
  );

  return (
    <Box
      {...tooltipProps}
      {...slotProps?.root}
      sx={[
        (theme) => ({
          width: 360,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: theme.vars.customShadows.dialog,
        }),
        ...(Array.isArray(slotProps?.root?.sx)
          ? (slotProps?.root?.sx ?? [])
          : [slotProps?.root?.sx]),
      ]}
    >
      <Box sx={{ px: 3, pt: 3, position: 'relative' }}>
        {title && (
          <Typography variant="h6" {...slotProps?.title}>
            {title}
          </Typography>
        )}

        {!hideCloseButton && renderCloseBtn()}
      </Box>

      {content && (
        <Box
          {...slotProps?.content}
          sx={[
            {
              px: 3,
              pt: 2,
              pb: 4,
            },
            ...(Array.isArray(slotProps?.content?.sx)
              ? (slotProps?.content?.sx ?? [])
              : [slotProps?.content?.sx]),
          ]}
        >
          {content}
        </Box>
      )}

      {showProgress && renderProgress()}

      {!hideFooter && (
        <Box
          sx={[
            (theme) => ({
              p: 2.5,
              gap: 1.5,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: `solid 1px ${theme.vars.palette.divider}`,
            }),
          ]}
        >
          {showSkipButton && renderSkipBtn()}

          <Box sx={{ flexGrow: 1 }} />

          {!hideBackButton && renderBackBtn()}

          {renderNextBtn()}
        </Box>
      )}
    </Box>
  );
}
