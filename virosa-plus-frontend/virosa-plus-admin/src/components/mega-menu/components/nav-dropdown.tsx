import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { megaMenuClasses } from '../styles';

// ----------------------------------------------------------------------

export type NavDropdownProps = React.ComponentProps<'div'> & {
  open?: boolean;
  isMultiList?: boolean;
  variant?: 'vertical' | 'horizontal';
};

export const NavDropdown = styled(
  (props: NavDropdownProps) => (
    <div {...props} className={mergeClasses([megaMenuClasses.dropdown.root, props.className])}>
      <div className={megaMenuClasses.dropdown.paper}>{props.children}</div>
    </div>
  ),
  {
    shouldForwardProp: (prop: string) => !['open', 'variant', 'isMultiList', 'sx'].includes(prop),
  }
)(({ isMultiList, theme }) => ({
  opacity: 0,
  visibility: 'hidden',
  position: 'absolute',
  pointerEvents: 'none',
  transform: 'scale(0.92)',
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(['opacity', 'visibility', 'transform'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.sharp,
  }),
  [`& .${megaMenuClasses.dropdown.paper}`]: {
    ...theme.mixins.paperStyles(theme, { dropdown: true }),
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(isMultiList ? 2.5 : 2),
  },
  variants: [
    {
      props: { open: true },
      style: {
        opacity: 1,
        transform: 'scale(1)',
        visibility: 'visible',
        pointerEvents: 'auto',
      },
    },
    {
      props: { variant: 'horizontal' },
      style: {
        minWidth: 180,
        paddingTop: theme.spacing(0.75),
        ...(isMultiList && { left: 0, width: '100%' }),
      },
    },
    {
      props: { variant: 'vertical' },
      style: {
        top: -24,
        minWidth: 240,
        left: 'var(--nav-width)',
        paddingLeft: theme.spacing(0.75),
        ...(isMultiList && { width: 'var(--nav-dropdown-width, 800px)' }),
      },
    },
  ],
}));
