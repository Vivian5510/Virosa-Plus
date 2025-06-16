import { CONFIG } from 'src/global-config';

import type { WorkspacesPopoverProps } from './components/workspaces-popover';

// ----------------------------------------------------------------------

export const _workspaces: WorkspacesPopoverProps['data'] = [
  {
    id: 'team-1',
    name: 'Team 1',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/logo-1.webp`,
    plan: 'Free',
  },
  {
    id: 'team-2',
    name: 'Team 2',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/logo-2.webp`,
    plan: 'Pro',
  },
  {
    id: 'team-3',
    name: 'Team 3',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/logo-3.webp`,
    plan: 'Pro',
  },
];
