import type { Theme, SxProps } from '@mui/material/styles';

import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

type ChatLayoutProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
  slots: {
    nav: React.ReactNode;
    main: React.ReactNode;
    header: React.ReactNode;
    details: React.ReactNode;
  };
};

export function ChatLayout({ slots, sx, ...other }: ChatLayoutProps) {
  return (
    <LayoutRoot sx={sx} {...other}>
      <LayoutNav>{slots.nav}</LayoutNav>

      <LayoutContainer>
        <LayoutHeader>{slots.header}</LayoutHeader>

        <LayoutContent>
          <LayoutMain>{slots.main}</LayoutMain>
          <LayoutDetails>{slots.details}</LayoutDetails>
        </LayoutContent>
      </LayoutContainer>
    </LayoutRoot>
  );
}

// ----------------------------------------------------------------------

const LayoutRoot = styled('div')(({ theme }) => ({
  minHeight: 0,
  flex: '1 1 0',
  display: 'flex',
  position: 'relative',
  boxShadow: theme.vars.customShadows.card,
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.vars.palette.background.paper,
}));

const LayoutHeader = styled('div')(({ theme }) => ({
  height: 72,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1, 1, 2.5),
  borderBottom: `solid 1px ${theme.vars.palette.divider}`,
}));

const LayoutNav = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const LayoutContainer = styled('div')(() => ({
  minWidth: 0,
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
}));

const LayoutContent = styled('div')(() => ({
  minHeight: 0,
  display: 'flex',
  flex: '1 1 auto',
}));

const LayoutMain = styled('div')(() => ({
  minWidth: 0,
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
}));

const LayoutDetails = styled('div')(() => ({
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
}));
