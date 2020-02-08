import { api } from 'apiService';
import { AxiosResponse } from 'axios';
import {
 User, UserData, EmailUpdateParams, PasswordUpdateParams,
} from './types';

export const getUser = (): Promise<User> => api
  .get('users/me')
  .then(({ data }) => data);

export const updateUserData = (newData: UserData): Promise<User> => api
  .put('users/me', newData)
  .then(({ data }) => data)
  .catch(error => Promise.reject(error.response.data));

export const updateEmail = (newData: EmailUpdateParams): Promise<User> => api
  .put('users/me', newData)
  .then(({ data }) => data)
  .catch(error => Promise.reject(error.response.data));

export const updatePassword = (newData: PasswordUpdateParams): Promise<AxiosResponse<any>> => api
  .put('auth/change-my-password', newData)
  .catch(error => Promise.reject(error.response.data));
