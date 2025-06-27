import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  blog: icon('ic-blog'),
  external: icon('ic-external'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [{ title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard }],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: '文章管理',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
        children: [
          { title: '文章列表', path: paths.dashboard.post.root },
          { title: '创建文章', path: paths.dashboard.post.new },
        ],
      },
      {
        title: '目录管理',
        path: paths.dashboard.directory.root,
        icon: <Iconify icon="mdi:folder-outline" />,
        children: [{ title: '目录树', path: paths.dashboard.directory.tree }],
      },
    ],
  },
  /**
   * External
   */
  {
    subheader: 'External',
    items: [
      {
        title: 'GitHub',
        path: 'https://github.com/Vivian5510/Virosa-Plus',
        icon: ICONS.external,
        info: <Iconify width={18} icon="prime:external-link" />,
      },
    ],
  },
];
