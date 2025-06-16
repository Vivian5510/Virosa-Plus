import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

export const megaMenuClasses = {
  mobile: createClasses('mega__menu__mobile'),
  vertical: createClasses('mega__menu__desktop__vertical'),
  horizontal: createClasses('mega__menu__desktop__horizontal'),
  carousel: {
    root: createClasses('nav__carousel_root'),
    item: createClasses('nav__carousel_item'),
  },
  li: createClasses('nav__li'),
  ul: createClasses('nav__ul'),
  subheader: createClasses('nav__subheader'),
  dropdown: {
    root: createClasses('nav__dropdown__root'),
    paper: createClasses('nav__dropdown__paper'),
  },
  item: {
    root: createClasses('nav__item__root'),
    sub: createClasses('nav__item__sub'),
    icon: createClasses('nav__item__icon'),
    info: createClasses('nav__item__info'),
    texts: createClasses('nav__item__texts'),
    title: createClasses('nav__item__title'),
    arrow: createClasses('nav__item__arrow'),
    caption: createClasses('nav__item__caption'),
  },
  state: {
    open: '--open',
    active: '--active',
    disabled: '--disabled',
  },
};
