import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';

import { paths } from '../paths';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));
const Page404 = lazy(() => import('src/pages/error/404'));

export const routesSection: RouteObject[] = [
  {
    path: '/',
    /**
     * 直接重定向到Dashboard页面
     */
    element: <Navigate to={paths.dashboard.root} replace />,
  },

  // Auth
  ...authRoutes,
  ...authDemoRoutes,

  // Dashboard
  ...dashboardRoutes,

  // Main
  ...mainRoutes,

  // Components
  ...componentsRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
