import { useEffect, cloneElement } from 'react';
import { useBoolean } from 'minimal-shared/hooks';
import { mergeClasses } from 'minimal-shared/utils';

import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';

import { Scrollbar } from 'src/components/scrollbar';

import { NavList } from './nav-list';
import { Nav, NavUl } from '../components';
import { megaMenuVars, megaMenuClasses } from '../styles';

import type { MegaMenuProps } from '../types';

// ----------------------------------------------------------------------

export function MegaMenuMobile({
  sx,
  data,
  slots,
  render,
  className,
  slotProps,
  cssVars: overridesVars,
  ...other
}: MegaMenuProps) {
  const theme = useTheme();

  const pathname = usePathname();

  const drawerRootOpen = useBoolean();

  const cssVars = { ...megaMenuVars(theme, 'mobile'), ...overridesVars };

  useEffect(() => {
    // If the pathname changes, close the drawer
    if (drawerRootOpen.value) {
      drawerRootOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderButton = slots?.button ? (
    cloneElement(slots.button, { onClick: drawerRootOpen.onTrue })
  ) : (
    <IconButton onClick={drawerRootOpen.onTrue}>
      <SvgIcon>
        <path
          opacity="0.32"
          d="M15.7798 4.5H5.2202C4.27169 4.5 3.5 5.06057 3.5 5.75042C3.5 6.43943 4.27169 7 5.2202 7H15.7798C16.7283 7 17.5 6.43943 17.5 5.75042C17.5 5.06054 16.7283 4.5 15.7798 4.5Z"
          fill="currentColor"
        />
        <path
          d="M18.7798 10.75H8.2202C7.27169 10.75 6.5 11.3106 6.5 12.0004C6.5 12.6894 7.27169 13.25 8.2202 13.25H18.7798C19.7283 13.25 20.5 12.6894 20.5 12.0004C20.5 11.3105 19.7283 10.75 18.7798 10.75Z"
          fill="currentColor"
        />
        <path
          d="M15.7798 17H5.2202C4.27169 17 3.5 17.5606 3.5 18.2504C3.5 18.9394 4.27169 19.5 5.2202 19.5H15.7798C16.7283 19.5 17.5 18.9394 17.5 18.2504C17.5 17.5606 16.7283 17 15.7798 17Z"
          fill="currentColor"
        />
      </SvgIcon>
    </IconButton>
  );

  return (
    <>
      {renderButton}

      <Drawer
        open={drawerRootOpen.value}
        onClose={drawerRootOpen.onFalse}
        sx={{
          ...cssVars,
          [`& .${drawerClasses.paper}`]: {
            display: 'flex',
            flexDirection: 'column',
            width: 'var(--nav-width)',
          },
        }}
      >
        {slots?.topArea}

        <Scrollbar fillContent>
          <Nav
            className={mergeClasses([megaMenuClasses.mobile, className])}
            sx={[
              () => ({
                /* Put styles */
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
                  cssVars={cssVars}
                  slotProps={slotProps}
                  onCloseDrawerRoot={drawerRootOpen.onFalse}
                />
              ))}
            </NavUl>
          </Nav>
        </Scrollbar>

        {slots?.bottomArea}
      </Drawer>
    </>
  );
}
