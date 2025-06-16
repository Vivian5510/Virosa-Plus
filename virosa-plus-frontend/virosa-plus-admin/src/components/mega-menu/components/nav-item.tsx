import { forwardRef } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from '../../iconify';
import { createNavItem } from '../utils';
import { navItemStyles, megaMenuClasses } from '../styles';

import type { NavItemProps } from '../types';

// ----------------------------------------------------------------------

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>((props, ref) => {
  const {
    path,
    icon,
    info,
    title,
    /********/
    open,
    active,
    disabled,
    /********/
    render,
    hasChild,
    slotProps,
    className,
    externalLink,
    enabledRootRedirect,
    ...other
  } = props;

  const navItem = createNavItem({
    path,
    icon,
    info,
    render,
    hasChild,
    externalLink,
    enabledRootRedirect,
  });

  const ownerState: StyledState = { open, active, disabled };

  return (
    <ItemRoot
      ref={ref}
      aria-label={title}
      {...ownerState}
      {...navItem.baseProps}
      className={mergeClasses([megaMenuClasses.item.root, className], {
        [megaMenuClasses.state.open]: open,
        [megaMenuClasses.state.active]: active,
        [megaMenuClasses.state.disabled]: disabled,
      })}
      sx={slotProps?.sx}
      {...other}
    >
      {icon && (
        <ItemIcon {...ownerState} className={megaMenuClasses.item.icon} sx={slotProps?.icon}>
          {navItem.renderIcon}
        </ItemIcon>
      )}

      {title && (
        <ItemTitle {...ownerState} className={megaMenuClasses.item.title} sx={slotProps?.title}>
          {title}
        </ItemTitle>
      )}

      {info && (
        <ItemInfo {...ownerState} className={megaMenuClasses.item.info} sx={slotProps?.info}>
          {navItem.renderInfo}
        </ItemInfo>
      )}

      {hasChild && (
        <ItemArrow
          {...ownerState}
          icon="eva:arrow-ios-forward-fill"
          className={megaMenuClasses.item.arrow}
          sx={slotProps?.arrow}
        />
      )}
    </ItemRoot>
  );
});

// ----------------------------------------------------------------------

type StyledState = Pick<NavItemProps, 'active' | 'open' | 'disabled'>;

const shouldForwardProp = (prop: string) => !['active', 'open', 'disabled', 'sx'].includes(prop);

/**
 * @slot root
 */
const ItemRoot = styled(ButtonBase, { shouldForwardProp })<StyledState>(({ theme }) => ({
  width: '100%',
  minHeight: 'var(--nav-item-height)',
  padding: 'var(--nav-item-padding)',
  borderRadius: 'var(--nav-item-radius)',
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': { backgroundColor: 'var(--nav-item-hover-bg)' },
  variants: [
    {
      props: { active: true },
      style: {
        color: 'var(--nav-item-active-color)',
        backgroundColor: 'var(--nav-item-active-bg)',
        '&:hover': { backgroundColor: 'var(--nav-item-active-hover-bg)' },
      },
    },
    { props: { open: true }, style: { backgroundColor: 'var(--nav-item-hover-bg)' } },
    {
      props: { open: true, active: true },
      style: { backgroundColor: 'var(--nav-item-active-hover-bg)' },
    },
    { props: { disabled: true }, style: navItemStyles.disabled },
  ],
}));

/**
 * @slot icon
 */
const ItemIcon = styled('span', { shouldForwardProp })(() => ({
  ...navItemStyles.icon,
  width: 'var(--nav-icon-size)',
  height: 'var(--nav-icon-size)',
  margin: 'var(--nav-icon-margin)',
}));

/** @slot title */
const ItemTitle = styled('span', { shouldForwardProp })(({ theme }) => ({
  ...navItemStyles.title(theme),
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeightMedium,
  variants: [
    { props: { active: true }, style: { fontWeight: theme.typography.fontWeightSemiBold } },
  ],
}));

/**
 * @slot icon
 */
const ItemInfo = styled('span', { shouldForwardProp })(() => ({ ...navItemStyles.info }));

/**
 * @slot arrow
 */
const ItemArrow = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
  ...navItemStyles.arrow(theme),
}));
