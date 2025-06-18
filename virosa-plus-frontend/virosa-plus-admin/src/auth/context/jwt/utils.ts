import { paths } from 'src/routes/paths';

import axios from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      alert('Token expired!');
      sessionStorage.removeItem(JWT_STORAGE_KEY);
      window.location.href = paths.auth.jwt.signIn;
    } catch (error) {
      console.error('Error during token expiration:', error);
      throw error;
    }
  }, timeLeft);
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      // 检查 token 是否已包含 "Bearer " 前缀
      const tokenValue = accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`;
      // 去除前缀后保存到 sessionStorage
      const rawToken = accessToken.startsWith('Bearer ') ? accessToken.substring(7) : accessToken;
      sessionStorage.setItem(JWT_STORAGE_KEY, rawToken);

      // 设置请求头，确保使用正确格式
      axios.defaults.headers.common.Authorization = tokenValue;

      // 尝试解码 token
      try {
        const decodedToken = jwtDecode(rawToken);

        if (decodedToken && 'exp' in decodedToken) {
          tokenExpired(decodedToken.exp);
        }
      } catch (decodeError) {
        console.warn('无法解码 token，但仍将继续使用:', decodeError);
        // 即使无法解码，我们仍然使用 token 进行身份验证
      }
    } else {
      sessionStorage.removeItem(JWT_STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}
