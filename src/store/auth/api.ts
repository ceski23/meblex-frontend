import { api } from 'apiService';
import { User } from 'store/user/types';
import { Tokens, LoginCredentials, RegistrationData } from './types';

export const checkLoginStatus = (): Promise<void> => api.get('Auth/check');

export const login = (credentials: LoginCredentials): Promise<Tokens & User> => (
  api.post('Auth/login', credentials)
    .then(({ data }) => data)
    .catch(error => Promise.reject(error.response.data.detail))
);

export const register = (regData: RegistrationData): Promise<Tokens> => (
  api.post('Auth/register', { ...regData, postcode: regData.postCode.replace(/\D/g, '') })
    .then(({ data }) => data)
    .catch(error => Promise.reject(error.response.data))
);

export const relogin = (refreshToken: string): Promise<Tokens> => (
  api.put('Auth/refresh', { token: refreshToken })
    .then(({ data }) => data)
    // .catch(error => Promise.reject(error.response.data.detail))
);
