import { api } from 'apiService';
import { User } from 'store/user/types';
import { Tokens, LoginCredentials } from './types';

export const checkLoginStatus = (): Promise<void> => api.get('Auth/check');

export const login = (credentials: LoginCredentials): Promise<Tokens & User> => (
  api.post('Auth/login', credentials)
    .then(({ data }) => data)
    .catch(error => Promise.reject(error.response.data.detail))
);
