import { useTheme } from '@mui/material/styles';

import { NavList } from './nav-list';
import { Nav, NavUl } from '../components';
import { navBasicVars, navBasicClasses } from '../styles';

import type { NavBasicProps } from '../types';

// ----------------------------------------------------------------------

export function NavBasicMobile({
  sx,
  data,
  render,
  slotProps,
  enabledRootRedirect,
  cssVars: overridesVars,
  ...other
}: NavBasicProps) {
  const theme = useTheme();

  const cssVars = { ...navBasicVars.mobile(theme), ...overridesVars };

  return (
    <Nav
      className={navBasicClasses.mobile}
      sx={[{ ...cssVars }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <NavUl sx={{ flex: '1 1 auto', gap: 'var(--nav-item-gap)' }}>
        {data.map((list) => (
          <NavList
            key={list.title}
            depth={1}
            data={list}
            render={render}
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </Nav>
  );
}
