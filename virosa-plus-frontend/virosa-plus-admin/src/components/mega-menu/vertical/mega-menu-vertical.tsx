import { mergeClasses } from 'minimal-shared/utils';
import { useClientRect } from 'minimal-shared/hooks';

import { useTheme } from '@mui/material/styles';

import { NavList } from './nav-list';
import { Nav, NavUl } from '../components';
import { megaMenuVars, megaMenuClasses } from '../styles';

import type { MegaMenuProps } from '../types';

// ----------------------------------------------------------------------

export function MegaMenuVertical({
  sx,
  data,
  render,
  slotProps,
  className,
  enabledRootRedirect,
  cssVars: overridesVars,
  ...other
}: MegaMenuProps) {
  const theme = useTheme();

  const navRect = useClientRect();

  const cssVars = {
    ...megaMenuVars(theme, 'vertical'),
    ...overridesVars,
  };

  return (
    <Nav
      ref={navRect.elementRef}
      className={mergeClasses([megaMenuClasses.vertical, className])}
      sx={[
        () => ({
          ...cssVars,
          flex: '1 1 auto',
          width: 'var(--nav-width)',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <NavUl sx={{ gap: 'var(--nav-item-gap)' }}>
        {data.map((list) => (
          <NavList
            key={list.title}
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
