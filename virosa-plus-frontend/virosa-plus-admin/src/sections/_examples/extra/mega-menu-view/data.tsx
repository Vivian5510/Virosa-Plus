import type { MegaMenuProps } from 'src/components/mega-menu';

import { _mock } from 'src/_mock';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const arr_1 = [
  { title: 'Metallic processing machinery', path: '#' },
  { title: 'Machinery for food, beverage & cereal', path: '#' },
  { title: 'Laser equipment', path: '#' },
  { title: 'Mould', path: '#' },
  { title: 'Textile machinery & parts', path: '#' },
  { title: 'Cutting & fold-bend machine', path: '#' },
  { title: 'Paper machinery', path: '#' },
  { title: 'Rubber machinery', path: '#' },
  { title: 'Chemical equipment & machinery', path: '#' },
  { title: 'Mixing equipment', path: '#' },
  { title: 'Machinery for garment, shoes & accessories', path: '#' },
  { title: 'Crushing & culling machine', path: '#' },
];

const arr_2 = [
  { title: 'Plastic machinery', path: '#' },
  { title: 'Woodworking machinery', path: '#' },
  { title: 'Blow molding machine', path: '#' },
  { title: 'Plastic recycling machine', path: '#' },
  { title: 'Injection molding machine', path: '#' },
];

const arr_3 = [
  { title: 'Building material making machinery', path: '#' },
  { title: 'Lifting equipment', path: '#' },
  { title: 'Excavator', path: '#' },
  { title: 'Concrete machinery', path: '#' },
  { title: 'Stone processing machinery', path: '#' },
];

const arr_4 = [
  { title: 'Agriculture machinery', path: '#' },
  { title: 'Livestock machineryfeed', path: '#' },
  { title: 'Feed processing machinery', path: '#' },
  { title: 'Tiller', path: '#' },
  { title: 'Harvesting machine', path: '#' },
];

const arr_5 = [
  { title: 'Cnc machine tools', path: '#' },
  { title: 'Lathe', path: '#' },
  { title: 'Grinding machine ', path: '#' },
  { title: 'Drilling machine ', path: '#' },
  { title: 'Milling machine ', path: '#' },
];

// ----------------------------------------------------------------------

export const MEGA_MENU_ITEMS: MegaMenuProps['data'] = [
  {
    title: 'Item 1',
    path: '#',
    icon: <Iconify icon="solar:home-2-outline" />,
    slides: Array.from({ length: 16 }, (_, index) => ({
      name: _mock.productName(index),
      coverUrl: _mock.image.product(index),
      path: '#',
    })),
    moreLink: { title: 'More Categories', path: '#' },
    tags: [
      { title: 'Paper cup', path: '#' },
      { title: 'Lotion pump', path: '#' },
      { title: 'Brush cutter', path: '#' },
      { title: 'Display rack', path: '#' },
      { title: 'Glass bottle', path: '#' },
    ],
    children: [
      { subheader: 'Other machinery & parts', items: arr_1 },
      { subheader: 'Plastic & woodworking', items: arr_2 },
      { subheader: 'Construction machinery', items: arr_3 },
      { subheader: 'Agriculture machinery', items: arr_4 },
      { subheader: 'Machine tools', items: arr_5 },
    ],
  },
  {
    title: 'Item 2',
    path: '#',
    icon: <Iconify icon="solar:atom-outline" />,
    children: [
      { subheader: 'Other machinery & parts', items: arr_1 },
      { subheader: 'Plastic & woodworking', items: arr_2 },
      { subheader: 'Construction machinery', items: arr_3 },
      { subheader: 'Agriculture machinery', items: arr_4 },
      { subheader: 'Machine tools', items: arr_5 },
    ],
  },
  {
    title: 'Item 3',
    path: '#',
    icon: <Iconify icon="solar:chart-square-outline" />,
    info: <Label color="info">+3</Label>,
    children: [{ items: arr_1 }],
  },
  {
    title: 'Item 4',
    path: '#',
    icon: <Iconify icon="solar:confetti-minimalistic-outline" />,
    info: '+72',
    children: [
      {
        items: [
          { title: 'Foods', path: '#' },
          { title: 'Cosmetics  ', path: '#' },
          { title: 'Clothes ', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Item 5',
    path: '/components',
    icon: <Iconify icon="solar:gallery-circle-outline" />,
    children: [
      {
        items: [
          { title: 'Foods', path: '#' },
          { title: 'Cosmetics  ', path: '/components/extra/mega-menu' },
          { title: 'Clothes ', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Item 6',
    path: '#',
    icon: <Iconify icon="solar:hanger-2-outline" />,
    children: [
      {
        items: [
          { title: 'Foods', path: '#' },
          { title: 'Cosmetics  ', path: '#' },
          { title: 'Clothes ', path: '#' },
        ],
      },
    ],
  },
  { title: 'Item 7', path: '/components', icon: <Iconify icon="solar:letter-outline" /> },
  {
    title: 'Item 8',
    path: 'https://www.google.com/',
    icon: <Iconify icon="solar:airbuds-case-open-outline" />,
    disabled: true,
  },
];

// ----------------------------------------------------------------------

export const MEGA_MENU_ITEMS_WITH_RENDER: MegaMenuProps['data'] = [
  {
    title: 'Item 1',
    path: '#',
    icon: 'icon.item1',
    slides: Array.from({ length: 16 }, (_, index) => ({
      name: _mock.productName(index),
      coverUrl: _mock.image.product(index),
      path: '#',
    })),
    moreLink: { title: 'More Categories', path: '#' },
    tags: [
      { title: 'Paper cup', path: '#' },
      { title: 'Lotion pump', path: '#' },
      { title: 'Brush cutter', path: '#' },
      { title: 'Display rack', path: '#' },
      { title: 'Glass bottle', path: '#' },
    ],
    children: [
      { subheader: 'Other machinery & parts', items: arr_1 },
      { subheader: 'Plastic & woodworking', items: arr_2 },
      { subheader: 'Construction machinery', items: arr_3 },
      { subheader: 'Agriculture machinery', items: arr_4 },
      { subheader: 'Machine tools', items: arr_5 },
    ],
  },
  {
    title: 'Item 2',
    path: '#',
    icon: 'icon.item2',
    children: [
      { subheader: 'Other machinery & parts', items: arr_1 },
      { subheader: 'Plastic & woodworking', items: arr_2 },
      { subheader: 'Construction machinery', items: arr_3 },
      { subheader: 'Agriculture machinery', items: arr_4 },
      { subheader: 'Machine tools', items: arr_5 },
    ],
  },
  {
    title: 'Item 3',
    path: '#',
    icon: 'icon.item3',
    info: ['info.item3', '+3'],
    children: [{ items: arr_1 }],
  },
  {
    title: 'Item 4',
    path: '/components',
    icon: 'icon.item4',
    info: ['info.item4', '+72'],
    children: [
      {
        items: [
          { title: 'Foods', path: '#' },
          { title: 'Cosmetics  ', path: '/components/extra/mega-menu' },
          { title: 'Clothes ', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Item 5',
    path: '#',
    icon: 'icon.item5',
    disabled: true,
    children: [
      {
        items: [
          { title: 'Foods', path: '#' },
          { title: 'Cosmetics  ', path: '#' },
          { title: 'Clothes ', path: '#' },
        ],
      },
    ],
  },
  { title: 'Item 6', path: '#', icon: 'icon.item5' },
];
