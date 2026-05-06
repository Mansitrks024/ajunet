import { RefreshTokenResponse } from '@/src/types/auth';
import { api } from './api';
import { storage } from './storage';

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  const token = storage.get('token');
  if (!token) return null;

  try {
    return token;
  } catch {
    return null;
  }
};
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  const refreshToken = storage.get('refresh_token');
  if (!refreshToken) return null;

  try {
    return refreshToken;
  } catch {
    return null;
  }
};

export const setToken = (token: string): void => {
  storage.set('token', token);

  document.cookie = `token=${token}; path=/; max-age=2592000`; // 30 days
};


export const setRefreshToken = (refresh_token: string): void => {
  storage.set('refresh_token', refresh_token);
  document.cookie = `refresh_token=${refresh_token}; path=/; max-age=2592000`; // 30 days
};

export const removeToken = (): void => {
  storage.remove('token');
  storage.remove('refresh_token');

  if (typeof window === 'undefined') return;
  document.cookie = 'token=; path=/; max-age=0';
  document.cookie = 'refresh_token=; path=/; max-age=0';
  // window.location.href = '/';
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!getToken();
};

export const isUserLogin = () => {
  const isAuthenticated = storage.get('token') ? true : false;
  return isAuthenticated;
}


export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

export const refreshToken = async (): Promise<boolean> => {
  const refresh_token = getRefreshToken();
  if (!refresh_token) return false;

  try {
    const response:any = await api.post<RefreshTokenResponse>(
      `/user/refresh-token/`,
      { refresh_token },
    );
    const data = response.data?.data!;
    setToken(data?.access_token);
    return true;
  } catch {
    removeToken();
    return false;
  }
};
