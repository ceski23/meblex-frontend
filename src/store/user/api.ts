import { api } from 'apiService';
import { AxiosResponse } from 'axios';
import {
 User, UserData, EmailUpdateParams, PasswordUpdateParams,
} from './types';

export const getUser = (): Promise<User> => api
  .get('User')
  .then(({ data }) => data);

export const updateUserData = (newData: UserData): Promise<User> => api
  .put('User/update', { ...newData, postcode: newData.postCode.replace(/\D/g, '') })
  .then(({ data }) => data)
  .catch(error => Promise.reject(error.response.data));

export const updateEmail = (newData: EmailUpdateParams): Promise<AxiosResponse<any>> => api
  .put('User/email', newData)
  .catch(error => Promise.reject(error.response.data));

export const updatePassword = (newData: PasswordUpdateParams): Promise<AxiosResponse<any>> => api
  .put('User/password', newData)
  .catch(error => Promise.reject(error.response.data));
