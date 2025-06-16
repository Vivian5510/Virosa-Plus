import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthSplitLayout } from 'src/layouts/auth-split';
import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

/** **************************************
 * Split layout
 *************************************** */
const SplitLayout = {
  SignInPage: lazy(() => import('src/pages/auth-demo/split/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth-demo/split/sign-up')),
  VerifyPage: lazy(() => import('src/pages/auth-demo/split/verify')),
  ResetPasswordPage: lazy(() => import('src/pages/auth-demo/split/reset-password')),
  UpdatePasswordPage: lazy(() => import('src/pages/auth-demo/split/update-password')),
};

const authSplit = {
  path: 'split',
  children: [
    {
      path: 'sign-in',
      element: (
        <AuthSplitLayout
          slotProps={{
            section: { title: 'Hi, Welcome back' },
          }}
        >
          <SplitLayout.SignInPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <AuthSplitLayout>
          <SplitLayout.SignUpPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'verify',
      element: (
        <AuthSplitLayout>
          <SplitLayout.VerifyPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <AuthSplitLayout>
          <SplitLayout.ResetPasswordPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'update-password',
      element: (
        <AuthSplitLayout>
          <SplitLayout.UpdatePasswordPage />
        </AuthSplitLayout>
      ),
    },
  ],
};

/** **************************************
 * Centered layout
 *************************************** */
const CenteredLayout = {
  SignInPage: lazy(() => import('src/pages/auth-demo/centered/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth-demo/centered/sign-up')),
  VerifyPage: lazy(() => import('src/pages/auth-demo/centered/verify')),
  ResetPasswordPage: lazy(() => import('src/pages/auth-demo/centered/reset-password')),
  UpdatePasswordPage: lazy(() => import('src/pages/auth-demo/centered/update-password')),
};

const authCentered = {
  path: 'centered',
  element: (
    <AuthCenteredLayout>
      <Outlet />
    </AuthCenteredLayout>
  ),
  children: [
    { path: 'sign-in', element: <CenteredLayout.SignInPage /> },
    { path: 'sign-up', element: <CenteredLayout.SignUpPage /> },
    { path: 'verify', element: <CenteredLayout.VerifyPage /> },
    { path: 'reset-password', element: <CenteredLayout.ResetPasswordPage /> },
    { path: 'update-password', element: <CenteredLayout.UpdatePasswordPage /> },
  ],
};

// ----------------------------------------------------------------------

export const authDemoRoutes: RouteObject[] = [
  {
    path: 'auth-demo',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authSplit, authCentered],
  },
];
