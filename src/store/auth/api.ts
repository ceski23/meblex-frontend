import { api, ApiError } from 'apiService';
import { User } from 'store/user/types';
import { Tokens, LoginCredentials, RegistrationData, RegistrationResponse } from './types';
import { AxiosError } from 'axios';

export const login = (credentials: LoginCredentials): Promise<Tokens & User> => (
  api.post('auth/local', credentials)
    .then(({ data: { jwt, user } }) => ({ ...user, accessToken: jwt }))
    .catch((error: AxiosError<ApiError>) => Promise.reject(error.response!.data.message))
);

export const register = (regData: RegistrationData): Promise<RegistrationResponse> => (
  api.post('auth/local/register', regData)
    .then(({ data }) => data)
    .catch((error: AxiosError<ApiError>) => Promise.reject(error.response!.data.message))
);

// export const relogin = (refreshToken: string): Promise<Tokens> => (
//   api.put('Auth/refresh', { token: refreshToken })
//     .then(({ data }) => data)
//     // .catch(error => Promise.reject(error.response.data.detail))
// );
