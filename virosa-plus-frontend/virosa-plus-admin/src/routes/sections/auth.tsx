import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import('src/pages/auth/jwt/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/jwt/sign-up')),
};

const authJwt = {
  path: 'jwt',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout
            slotProps={{
              section: { title: 'Hi, Welcome back' },
            }}
          >
            <Jwt.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <Jwt.SignUpPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
  ],
};

/** **************************************
 * Amplify
 *************************************** */
const Amplify = {
  SignInPage: lazy(() => import('src/pages/auth/amplify/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/amplify/sign-up')),
  VerifyPage: lazy(() => import('src/pages/auth/amplify/verify')),
  UpdatePasswordPage: lazy(() => import('src/pages/auth/amplify/update-password')),
  ResetPasswordPage: lazy(() => import('src/pages/auth/amplify/reset-password')),
};

const authAmplify = {
  path: 'amplify',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout
            slotProps={{
              section: { title: 'Hi, Welcome back' },
            }}
          >
            <Amplify.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <Amplify.SignUpPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'verify',
      element: (
        <AuthSplitLayout>
          <Amplify.VerifyPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <AuthSplitLayout>
          <Amplify.ResetPasswordPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'update-password',
      element: (
        <AuthSplitLayout>
          <Amplify.UpdatePasswordPage />
        </AuthSplitLayout>
      ),
    },
  ],
};

/** **************************************
 * Firebase
 *************************************** */
const Firebase = {
  SignInPage: lazy(() => import('src/pages/auth/firebase/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/firebase/sign-up')),
  VerifyPage: lazy(() => import('src/pages/auth/firebase/verify')),
  ResetPasswordPage: lazy(() => import('src/pages/auth/firebase/reset-password')),
};

const authFirebase = {
  path: 'firebase',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout
            slotProps={{
              section: { title: 'Hi, Welcome back' },
            }}
          >
            <Firebase.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <Firebase.SignUpPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'verify',
      element: (
        <AuthSplitLayout>
          <Firebase.VerifyPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <AuthSplitLayout>
          <Firebase.ResetPasswordPage />
        </AuthSplitLayout>
      ),
    },
  ],
};

/** **************************************
 * Auth0
 *************************************** */
const Auth0 = {
  SignInPage: lazy(() => import('src/pages/auth/auth0/sign-in')),
  CallbackPage: lazy(() => import('src/pages/auth/auth0/callback')),
};

const authAuth0 = {
  path: 'auth0',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout
            slotProps={{
              section: { title: 'Hi, Welcome back' },
            }}
          >
            <Auth0.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'callback',
      element: (
        <GuestGuard>
          <Auth0.CallbackPage />
        </GuestGuard>
      ),
    },
  ],
};

/** **************************************
 * Supabase
 *************************************** */
const Supabase = {
  SignInPage: lazy(() => import('src/pages/auth/supabase/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/supabase/sign-up')),
  VerifyPage: lazy(() => import('src/pages/auth/supabase/verify')),
  UpdatePasswordPage: lazy(() => import('src/pages/auth/supabase/update-password')),
  ResetPasswordPage: lazy(() => import('src/pages/auth/supabase/reset-password')),
};

const authSupabase = {
  path: 'supabase',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout
            slotProps={{
              section: { title: 'Hi, Welcome back' },
            }}
          >
            <Supabase.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <Supabase.SignUpPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'verify',
      element: (
        <AuthSplitLayout>
          <Supabase.VerifyPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <AuthSplitLayout>
          <Supabase.ResetPasswordPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: 'update-password',
      element: (
        <AuthSplitLayout>
          <Supabase.UpdatePasswordPage />
        </AuthSplitLayout>
      ),
    },
  ],
};

// ----------------------------------------------------------------------

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authJwt, authAmplify, authFirebase, authAuth0, authSupabase],
  },
];
