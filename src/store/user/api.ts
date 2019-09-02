import { api } from 'apiService';
import { User } from './types';

export const getUser = (): Promise<User> => api.get('User')
  .then(({ data }) => data);
