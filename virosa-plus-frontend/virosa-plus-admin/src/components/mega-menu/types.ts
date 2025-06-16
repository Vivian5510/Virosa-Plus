import type { LinkProps } from '@mui/material/Link';
import type { MasonryProps } from '@mui/lab/Masonry';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import type { CarouselOptions } from '../carousel';

// ----------------------------------------------------------------------

/**
 * Item
 */
export type NavItemRenderProps = {
  navIcon?: Record<string, React.ReactNode>;
  navInfo?: (val: string) => Record<string, React.ReactElement>;
};

export type NavItemStateProps = {
  open?: boolean;
  active?: boolean;
  disabled?: boolean;
};

export type NavItemSlotProps = {
  sx?: SxProps<Theme>;
  icon?: SxProps<Theme>;
  texts?: SxProps<Theme>;
  title?: SxProps<Theme>;
  caption?: SxProps<Theme>;
  info?: SxProps<Theme>;
  arrow?: SxProps<Theme>;
};

export type NavSlotProps = {
  rootItem?: Pick<NavItemSlotProps, 'sx' | 'icon' | 'title' | 'info' | 'arrow'>;
  subItem?: SxProps<Theme>;
  subheader?: SxProps<Theme>;
  dropdown?: SxProps<Theme>;
  tags?: SxProps<Theme>;
  moreLink?: SxProps<Theme>;
  masonry?: Omit<MasonryProps<'ul'>, 'ref' | 'children'>;
  carousel?: {
    sx?: SxProps<Theme>;
    options?: CarouselOptions;
  };
};

export type NavCarouselProps = React.ComponentProps<'div'> &
  NavSlotProps['carousel'] & {
    slides: {
      name: string;
      path: string;
      coverUrl: string;
    }[];
  };

export type NavItemOptionsProps = {
  hasChild?: boolean;
  externalLink?: boolean;
  enabledRootRedirect?: boolean;
  render?: NavItemRenderProps;
  slotProps?: NavItemSlotProps;
};

export type NavItemDataProps = Pick<NavItemStateProps, 'disabled'> & {
  path: string;
  title: string;
  icon?: string | React.ReactNode;
  info?: string[] | React.ReactNode;
  slides?: NavCarouselProps['slides'];
  moreLink?: { path: string; title: string };
  tags?: { path: string; title: string }[];
  children?: {
    subheader?: string;
    items: { title: string; path: string }[];
  }[];
};

export type NavItemProps = ButtonBaseProps &
  NavItemDataProps &
  NavItemStateProps &
  NavItemOptionsProps;

export type NavSubItemProps = LinkProps &
  Pick<NavItemProps, 'title' | 'path' | 'active'> &
  Pick<NavSlotProps, 'subItem'>;

/**
 * List
 */
export type NavListProps = Pick<NavItemProps, 'render' | 'enabledRootRedirect'> & {
  cssVars?: CSSObject;
  data: NavItemDataProps;
  slotProps?: NavSlotProps;
  slots?: {
    button?: React.ReactElement;
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export type NavSubListProps = React.ComponentProps<'li'> & {
  sx?: SxProps<Theme>;
  slotProps?: NavSlotProps;
  data: NavItemDataProps['children'];
};

/**
 * Main
 */
export type MegaMenuProps = React.ComponentProps<'nav'> &
  Omit<NavListProps, 'data'> & {
    sx?: SxProps<Theme>;
    data: NavItemDataProps[];
  };
