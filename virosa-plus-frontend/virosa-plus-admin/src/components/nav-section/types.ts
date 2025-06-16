import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

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
  rootItem?: NavItemSlotProps;
  subItem?: NavItemSlotProps;
  subheader?: SxProps<Theme>;
  dropdown?: {
    paper?: SxProps<Theme>;
  };
};

export type NavItemOptionsProps = {
  depth?: number;
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
  caption?: string;
  roles?: string[];
  children?: NavItemDataProps[];
};

export type NavItemProps = ButtonBaseProps &
  NavItemDataProps &
  NavItemStateProps &
  NavItemOptionsProps;

/**
 * List
 */
export type NavListProps = Pick<NavItemProps, 'render' | 'depth' | 'enabledRootRedirect'> & {
  cssVars?: CSSObject;
  data: NavItemDataProps;
  slotProps?: NavSlotProps;
  currentRole?: string;
};

export type NavSubListProps = Omit<NavListProps, 'data'> & {
  data: NavItemDataProps[];
};

export type NavGroupProps = Omit<NavListProps, 'data' | 'depth'> & {
  subheader?: string;
  items: NavItemDataProps[];
};

/**
 * Main
 */
export type NavSectionProps = React.ComponentProps<'nav'> &
  Omit<NavListProps, 'data' | 'depth'> & {
    sx?: SxProps<Theme>;
    data: {
      subheader?: string;
      items: NavItemDataProps[];
    }[];
  };
