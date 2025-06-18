import axiosInstance, { endpoints } from 'src/lib/axios';

import { setSession } from './utils';
import { JWT_STORAGE_KEY } from './constant';

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

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const params = { username: email, password };

    const res = await axiosInstance.post(endpoints.auth.signIn, params, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Login response:', res.data);

    const { code, data } = res.data;

    if (code === '0' && data?.token) {
      setSession(data.token);
    } else {
      throw new Error('Invalid response format or token not found');
    }
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
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
  const params = {
    username: email,
    password,
    email,
    nickname: `${firstName} ${lastName}`,
  };

  try {
    const res = await axiosInstance.post(endpoints.auth.signUp, params, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Register response:', res.data);

    const { code, data } = res.data;

    if (code === '0' && data?.token) {
      setSession(data.token);
    } else {
      throw new Error('Invalid response format or token not found');
    }
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
