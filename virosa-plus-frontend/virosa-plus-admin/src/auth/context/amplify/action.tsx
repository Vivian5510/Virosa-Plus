import type {
  SignUpInput,
  SignInInput,
  ConfirmSignUpInput,
  ResetPasswordInput,
  ResendSignUpCodeInput,
  ConfirmResetPasswordInput,
} from 'aws-amplify/auth';

import {
  signIn as _signIn,
  signUp as _signUp,
  signOut as _signOut,
  confirmSignUp as _confirmSignUp,
  resetPassword as _resetPassword,
  resendSignUpCode as _resendSignUpCode,
  confirmResetPassword as _confirmResetPassword,
} from 'aws-amplify/auth';

// ----------------------------------------------------------------------

export type SignInParams = SignInInput;

export type SignUpParams = SignUpInput & { firstName: string; lastName: string };

export type ResendSignUpCodeParams = ResendSignUpCodeInput;

export type ConfirmSignUpParams = ConfirmSignUpInput;

export type ResetPasswordParams = ResetPasswordInput;

export type ConfirmResetPasswordParams = ConfirmResetPasswordInput;

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ username, password }: SignInParams): Promise<void> => {
  await _signIn({ username, password });
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  username,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  await _signUp({
    username,
    password,
    options: { userAttributes: { email: username, given_name: firstName, family_name: lastName } },
  });
};

/** **************************************
 * Confirm sign up
 *************************************** */
export const confirmSignUp = async ({
  username,
  confirmationCode,
}: ConfirmSignUpParams): Promise<void> => {
  await _confirmSignUp({ username, confirmationCode });
};

/** **************************************
 * Resend code sign up
 *************************************** */
export const resendSignUpCode = async ({ username }: ResendSignUpCodeParams): Promise<void> => {
  await _resendSignUpCode({ username });
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  await _signOut();
};

/** **************************************
 * Reset password
 *************************************** */
export const resetPassword = async ({ username }: ResetPasswordParams): Promise<void> => {
  await _resetPassword({ username });
};

/** **************************************
 * Update password
 *************************************** */
export const updatePassword = async ({
  username,
  confirmationCode,
  newPassword,
}: ConfirmResetPasswordParams): Promise<void> => {
  await _confirmResetPassword({ username, confirmationCode, newPassword });
};
