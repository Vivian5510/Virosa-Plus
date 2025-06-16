import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { megaMenuClasses } from '../styles';

// ----------------------------------------------------------------------

export const Nav = styled('nav')``;

// ----------------------------------------------------------------------

type NavLiProps = React.ComponentProps<'li'> & {
  disabled?: boolean;
};

export const NavLi = styled(
  (props: NavLiProps) => (
    <li {...props} className={mergeClasses([megaMenuClasses.li, props.className])} />
  ),
  { shouldForwardProp: (prop: string) => !['disabled', 'sx'].includes(prop) }
)({
  display: 'inline-block',
  variants: [
    {
      props: { disabled: true },
      style: { cursor: 'not-allowed' },
    },
  ],
});

// ----------------------------------------------------------------------

type NavUlProps = React.ComponentProps<'ul'>;

export const NavUl = styled((props: NavUlProps) => (
  <ul {...props} className={mergeClasses([megaMenuClasses.ul, props.className])} />
))(() => ({ display: 'flex', flexDirection: 'column' }));
