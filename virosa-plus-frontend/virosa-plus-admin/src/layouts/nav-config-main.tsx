import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

import type { NavMainProps } from './main/nav/types';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'Components',
    path: paths.components,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Other',
        items: [
          // { title: 'About us', path: paths.about },
          // { title: 'Contact us', path: paths.contact },
          // { title: 'FAQs', path: paths.faqs },
          // { title: 'Maintenance', path: paths.maintenance },
          // { title: 'Coming soon', path: paths.comingSoon },
        ],
      },
      {
        subheader: 'Concepts',
        items: [
          // 产品相关页面已移除
          // { title: 'Shop', path: paths.product.root },
          // { title: 'Product', path: paths.product.demo.details },
          // { title: 'Checkout', path: paths.product.checkout },
          // 博客前台页面已移除
          // { title: 'Posts', path: paths.dashboard.post.root },
          // { title: 'Post', path: paths.dashboard.post.details('demo') },
        ],
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 403', path: paths.page403 },
          { title: 'Page 404', path: paths.page404 },
          { title: 'Page 500', path: paths.page500 },
        ],
      },
      { subheader: 'Dashboard', items: [{ title: 'Dashboard', path: CONFIG.auth.redirectPath }] },
    ],
  },
  {
    title: 'Docs',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: paths.docs,
  },
];
