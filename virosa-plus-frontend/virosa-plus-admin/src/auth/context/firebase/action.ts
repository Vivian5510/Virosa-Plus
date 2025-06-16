import { doc, setDoc, collection } from 'firebase/firestore';
import {
  signOut as _signOut,
  signInWithPopup as _signInWithPopup,
  GoogleAuthProvider as _GoogleAuthProvider,
  GithubAuthProvider as _GithubAuthProvider,
  TwitterAuthProvider as _TwitterAuthProvider,
  sendEmailVerification as _sendEmailVerification,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
} from 'firebase/auth';

import { AUTH, FIRESTORE } from 'src/lib/firebase';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ForgotPasswordParams = {
  email: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    await _signInWithEmailAndPassword(AUTH, email, password);

    const user = AUTH.currentUser;

    if (!user?.emailVerified) {
      throw new Error('Email not verified!');
    }
  } catch (error) {
    console.error('Error during sign in with password:', error);
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new _GoogleAuthProvider();
  await _signInWithPopup(AUTH, provider);
};

export const signInWithGithub = async (): Promise<void> => {
  const provider = new _GithubAuthProvider();
  await _signInWithPopup(AUTH, provider);
};

export const signInWithTwitter = async (): Promise<void> => {
  const provider = new _TwitterAuthProvider();
  await _signInWithPopup(AUTH, provider);
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  try {
    const newUser = await _createUserWithEmailAndPassword(AUTH, email, password);

    /*
     * (1) If skip emailVerified
     * Remove : await _sendEmailVerification(newUser.user);
     */
    await _sendEmailVerification(newUser.user);

    const userProfile = doc(collection(FIRESTORE, 'users'), newUser.user?.uid);

    await setDoc(userProfile, {
      uid: newUser.user?.uid,
      email,
      displayName: `${firstName} ${lastName}`,
    });
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  await _signOut(AUTH);
};

/** **************************************
 * Reset password
 *************************************** */
export const sendPasswordResetEmail = async ({ email }: ForgotPasswordParams): Promise<void> => {
  await _sendPasswordResetEmail(AUTH, email);
};
