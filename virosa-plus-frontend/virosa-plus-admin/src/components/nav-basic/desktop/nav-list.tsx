import { useEffect, useCallback } from 'react';
import { usePopoverHover } from 'minimal-shared/hooks';
import { isActiveLink, isExternalLink } from 'minimal-shared/utils';

import { useTheme } from '@mui/material/styles';
import { popoverClasses } from '@mui/material/Popover';

import { usePathname } from 'src/routes/hooks';

import { NavItem } from './nav-item';
import { navBasicClasses } from '../styles';
import { NavUl, NavLi, NavDropdown, NavDropdownPaper } from '../components';

import type { NavListProps, NavSubListProps } from '../types';

// ----------------------------------------------------------------------

export function NavList({
  data,
  depth,
  render,
  cssVars,
  slotProps,
  enabledRootRedirect,
}: NavListProps) {
  const theme = useTheme();

  const pathname = usePathname();

  const isActive = isActiveLink(pathname, data.path, !!data.children);

  const {
    open,
    onOpen,
    onClose,
    anchorEl,
    elementRef: navItemRef,
  } = usePopoverHover<HTMLButtonElement>();

  const isRtl = theme.direction === 'rtl';
  const id = open ? `${data.title}-popover` : undefined;

  useEffect(() => {
    // If the pathname changes, close the menu
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      onOpen();
    }
  }, [data.children, onOpen]);

  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      aria-describedby={id}
      // slots
      path={data.path}
      icon={data.icon}
      info={data.info}
      title={data.title}
      caption={data.caption}
      // state
      active={isActive}
      open={open}
      disabled={data.disabled}
      // options
      depth={depth}
      render={render}
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      enabledRootRedirect={enabledRootRedirect}
      // styles
      slotProps={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      // actions
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
    />
  );

  const renderDropdown = () =>
    !!data.children && (
      <NavDropdown
        disableScrollLock
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={
          depth === 1
            ? { vertical: 'bottom', horizontal: isRtl ? 'right' : 'left' }
            : { vertical: 'center', horizontal: isRtl ? 'left' : 'right' }
        }
        transformOrigin={
          depth === 1
            ? { vertical: 'top', horizontal: isRtl ? 'right' : 'left' }
            : { vertical: 'center', horizontal: isRtl ? 'right' : 'left' }
        }
        slotProps={{
          paper: {
            onMouseEnter: handleOpenMenu,
            onMouseLeave: onClose,
            className: navBasicClasses.dropdown.root,
          },
        }}
        sx={{
          ...cssVars,
          [`& .${popoverClasses.paper}`]: { ...(depth === 1 && { pt: 1, ml: -0.75 }) },
        }}
      >
        <NavDropdownPaper
          className={navBasicClasses.dropdown.paper}
          sx={slotProps?.dropdown?.paper}
        >
          <NavSubList
            data={data.children}
            depth={depth}
            render={render}
            cssVars={cssVars}
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        </NavDropdownPaper>
      </NavDropdown>
    );

  return (
    <NavLi disabled={data.disabled}>
      {renderNavItem()}

      {/*
       * TODO: Fix the issue with the transition effect on close.
       * Add `open` condition to disable transition effect on close.
       * If you don't care about the effect when turned off, you can ignore it because it's safe or wait for MUI to help fix this issue.
       * https://github.com/mui/material-ui/issues/43106
       */}
      {open && renderDropdown()}
    </NavLi>
  );
}

// ----------------------------------------------------------------------

function NavSubList({
  data,
  render,
  cssVars,
  depth = 0,
  slotProps,
  enabledRootRedirect,
}: NavSubListProps) {
  return (
    <NavUl sx={{ gap: 0.5 }}>
      {data.map((list) => (
        <NavList
          key={list.title}
          data={list}
          render={render}
          depth={depth + 1}
          cssVars={cssVars}
          slotProps={slotProps}
          enabledRootRedirect={enabledRootRedirect}
        />
      ))}
    </NavUl>
  );
}
