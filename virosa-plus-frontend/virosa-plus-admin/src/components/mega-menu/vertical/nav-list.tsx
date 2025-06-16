import { useRef, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';
import { isActiveLink, isExternalLink } from 'minimal-shared/utils';

import { usePathname } from 'src/routes/hooks';

import { NavLi, NavItem, NavDropdown, NavDropdownContent } from '../components';

import type { NavListProps } from '../types';

// ----------------------------------------------------------------------

export function NavList({ data, render, slotProps, enabledRootRedirect }: NavListProps) {
  const pathname = usePathname();
  const navItemRef = useRef<HTMLButtonElement | null>(null);

  const isActive = isActiveLink(pathname, data.path, !!data.children);
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const isSingleList = data.children?.length === 1;
  const isMultiList = !isSingleList;

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      onOpen();
    }
  }, [data.children, onOpen]);

  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      // slots
      path={data.path}
      icon={data.icon}
      info={data.info}
      title={data.title}
      // state
      open={open}
      active={isActive}
      disabled={data.disabled}
      // options
      render={render}
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      enabledRootRedirect={enabledRootRedirect}
      // styles
      slotProps={slotProps?.rootItem}
      // actions
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
    />
  );

  const renderDropdown = () =>
    !!data.children && (
      <NavDropdown
        variant="vertical"
        open={open}
        isMultiList={isMultiList}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={onClose}
        sx={slotProps?.dropdown}
      >
        <NavDropdownContent isMultiList={isMultiList} data={data} slotProps={slotProps} />
      </NavDropdown>
    );

  return (
    <NavLi disabled={data.disabled} sx={{ position: 'relative' }}>
      {renderNavItem()}
      {renderDropdown()}
    </NavLi>
  );
}
