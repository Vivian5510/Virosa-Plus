import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import { forwardRef } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const titleStyles: SxProps<Theme> = {
  mb: 2,
  color: 'text.secondary',
};

const rowStyles: SxProps<Theme> = {
  gap: 1,
  display: 'flex',
  flexWrap: 'wrap',
};

export function Styled() {
  const renderWithSx = () => (
    <>
      <Typography variant="body2" sx={titleStyles}>
        Styling methods with <strong>Sx</strong> function.
      </Typography>

      <Box sx={rowStyles}>
        <BoxSx
          sx={[
            (theme) => ({
              ...theme.applyStyles('dark', {
                bgcolor: theme.vars.palette.primary.darker,
              }),
            }),
          ]}
        />
        <BoxSx sx={{ bgcolor: 'primary.main' }} />
        <BoxSx sx={{ bgcolor: (theme) => theme.vars.palette.secondary.main }} />
        <BoxSx sx={(theme) => ({ bgcolor: theme.vars.palette.info.main })} />
        <BoxSx sx={[(theme) => ({ bgcolor: theme.vars.palette.success.main })]} />
      </Box>
    </>
  );

  const renderWithStyled = () => (
    <>
      <Typography variant="body2" sx={titleStyles}>
        Styling methods with <strong>styled()</strong> function.
      </Typography>

      <Box sx={rowStyles}>
        <StyledSimple />
        <StyledSimple sx={{ bgcolor: 'primary.main' }} />
        <StyledSimple sx={{ bgcolor: (theme) => theme.vars.palette.secondary.main }} />
        <StyledSimple sx={(theme) => ({ bgcolor: theme.vars.palette.info.main })} />
        <StyledSimple sx={[(theme) => ({ bgcolor: theme.vars.palette.success.main })]} />
      </Box>
    </>
  );

  const renderWithStyledState = () => (
    <>
      <Typography variant="body2" sx={titleStyles}>
        Styling methods with <strong>styled()</strong> function with <strong>state</strong>.
      </Typography>

      <Box sx={rowStyles}>
        <StyledWithState open className="item-1">
          Open
        </StyledWithState>

        <StyledWithState active className="item-2">
          Active
        </StyledWithState>

        <StyledWithState focused className="item-3">
          Focused
        </StyledWithState>

        <StyledWithState disabled className="item-4">
          Disabled
        </StyledWithState>
      </Box>
    </>
  );

  const renderWithStyledRef = () => (
    <>
      <Typography variant="body2" sx={titleStyles}>
        Styling methods with <strong>styled()</strong> function with <strong>ref</strong>.
      </Typography>

      <Box sx={rowStyles}>
        <StyledHtmlNoRef active className="item-1">
          Html no Ref
        </StyledHtmlNoRef>

        <Tooltip title="Html with Ref">
          <StyledHtmlWithRef active className="item-2">
            Html with Ref
          </StyledHtmlWithRef>
        </Tooltip>

        <StyledBoxNoRef active className="item-3">
          Box no Ref
        </StyledBoxNoRef>

        <Tooltip title="Box with Ref">
          <StyledBoxWithRef active className="item-4">
            Box with Ref
          </StyledBoxWithRef>
        </Tooltip>
      </Box>
    </>
  );

  const renderWithKeyframes = () => (
    <>
      <Typography variant="body2" sx={titleStyles}>
        Styling methods with <strong>keyframes()</strong>.
      </Typography>

      <Box sx={rowStyles}>
        <StyledWithKeyframes>With styled()</StyledWithKeyframes>
        <Box
          sx={[
            {
              '@keyframes opacity': {
                from: { opacity: 0.24 },
                to: { opacity: 1 },
              },
            },
            {
              ...baseStyles,
              color: 'secondary.contrastText',
              backgroundColor: 'secondary.main',
              animation: 'opacity 4s cubic-bezier(0.43, 0.13, 0.23, 0.96) infinite alternate',
            },
          ]}
        >
          With sx()
        </Box>
      </Box>
    </>
  );

  return (
    <>
      {renderWithSx()}

      <Divider sx={{ my: 3 }} />

      {renderWithStyled()}

      <Divider sx={{ my: 3 }} />

      {renderWithStyledState()}

      <Divider sx={{ my: 3 }} />

      {renderWithStyledRef()}

      <Divider sx={{ my: 3 }} />

      {renderWithKeyframes()}
    </>
  );
}

// ----------------------------------------------------------------------

const baseStyles: CSSObject = {
  width: 96,
  height: 96,
  fontSize: 14,
  fontWeight: 600,
  padding: '8px',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  borderRadius: '12px',
  justifyContent: 'center',
};

/** **************************************
 * @With Sx
 *************************************** */
function BoxSx({ sx }: BoxProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          ...baseStyles,
          bgcolor: theme.vars.palette.grey[500],
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

/** **************************************
 * @With Simple
 *************************************** */
const StyledSimple = styled('div')(({ theme }) => ({
  ...baseStyles,
  backgroundColor: theme.vars.palette.error.main,
}));

/** **************************************
 * @With State
 *************************************** */
type StyledWithStateProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
  open?: boolean;
  active?: boolean;
  focused?: boolean;
  disabled?: boolean;
};

const StyledWithState = styled(
  (props: StyledWithStateProps) => (
    <div {...props} className={mergeClasses(['root', props.className])} />
  ),
  {
    shouldForwardProp: (prop: string) =>
      !['open', 'active', 'focused', 'disabled', 'sx'].includes(prop),
  }
)(({ theme }) => ({
  ...baseStyles,
  backgroundColor: theme.vars.palette.background.neutral,
  variants: [
    {
      props: { open: true },
      style: {
        color: theme.vars.palette.primary.contrastText,
        backgroundColor: theme.vars.palette.primary.main,
      },
    },
    {
      props: { active: true },
      style: {
        color: theme.vars.palette.secondary.contrastText,
        backgroundColor: theme.vars.palette.secondary.main,
      },
    },
    {
      props: { focused: true },
      style: {
        color: theme.vars.palette.error.contrastText,
        backgroundColor: theme.vars.palette.error.main,
      },
    },
    {
      props: { disabled: true },
      style: {
        color: theme.vars.palette.info.contrastText,
        backgroundColor: theme.vars.palette.info.main,
      },
    },
  ],
}));

/** **************************************
 * @With Html Ref
 *************************************** */

type StyledHtmlProps = React.ComponentProps<'ul'> & { active?: boolean };

const StyledHtmlNoRef = styled(
  (props: StyledHtmlProps) => <ul {...props} className={mergeClasses(['root', props.className])} />,
  { shouldForwardProp: (prop: string) => !['active', 'sx'].includes(prop) }
)(({ theme }) => ({
  ...baseStyles,
  backgroundColor: theme.vars.palette.background.neutral,
  variants: [
    {
      props: { active: true },
      style: {
        color: theme.vars.palette.primary.contrastText,
        backgroundColor: theme.vars.palette.primary.main,
      },
    },
  ],
}));

const StyledHtmlWithRef = styled(
  forwardRef<HTMLUListElement, StyledHtmlProps>((props, ref) => (
    <ul {...props} ref={ref} className={mergeClasses(['root', props.className])} />
  )),
  { shouldForwardProp: (prop: string) => !['active', 'sx'].includes(prop) }
)(({ theme }) => ({
  ...baseStyles,
  backgroundColor: theme.vars.palette.background.neutral,
  variants: [
    {
      props: { active: true },
      style: {
        color: theme.vars.palette.primary.contrastText,
        backgroundColor: theme.vars.palette.primary.dark,
      },
    },
  ],
}));

/** **************************************
 * @With Box Ref
 *************************************** */

type StyledBoxProps = BoxProps<'ul'> & { active?: boolean };

const StyledBoxNoRef = styled(
  (props: StyledBoxProps) => (
    <Box {...props} component="ul" className={mergeClasses(['root', props.className])} />
  ),
  { shouldForwardProp: (prop: string) => !['active', 'sx'].includes(prop) }
)(({ theme }) => ({
  ...baseStyles,
  backgroundColor: theme.vars.palette.background.neutral,
  variants: [
    {
      props: { active: true },
      style: {
        color: theme.vars.palette.secondary.contrastText,
        backgroundColor: theme.vars.palette.secondary.main,
      },
    },
  ],
}));

const StyledBoxWithRef = styled(
  forwardRef<HTMLUListElement, StyledBoxProps>((props, ref) => (
    <Box {...props} ref={ref} component="ul" className={mergeClasses(['root', props.className])} />
  )),
  { shouldForwardProp: (prop: string) => !['active', 'sx'].includes(prop) }
)(({ theme }) => ({
  ...baseStyles,
  backgroundColor: theme.vars.palette.background.neutral,
  variants: [
    {
      props: { active: true },
      style: {
        color: theme.vars.palette.secondary.contrastText,
        backgroundColor: theme.vars.palette.secondary.dark,
      },
    },
  ],
}));

/** **************************************
 * @With Keyframes
 *************************************** */

const StyledWithKeyframes = styled('div')(({ theme }) => ({
  '@keyframes opacity': {
    from: { opacity: 0.24 },
    to: { opacity: 1 },
  },
  ...baseStyles,
  animation: 'opacity 4s cubic-bezier(0.43, 0.13, 0.23, 0.96) infinite alternate',
  color: theme.vars.palette.primary.contrastText,
  backgroundColor: theme.vars.palette.primary.main,
}));
