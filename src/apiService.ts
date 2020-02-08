import axios from 'axios';
import { toast } from 'react-toastify';

import { store } from 'store';
import { SERVER_ERROR } from 'constants/Api';
import { logoutUser } from 'store/auth/actions';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

store.subscribe(() => {
  const { accessToken } = store.getState().auth.data;
  if (accessToken) api.defaults.headers.Authorization = `Bearer ${accessToken}`;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (!error || (error.response && error.response.status === 500)) {
      toast.error(SERVER_ERROR);
      return Promise.reject(SERVER_ERROR);
    }
    return Promise.reject(error);
  },
);

const authIntError = async (error: any): Promise<any> => {
  const errorResponse = error.response;
  if (errorResponse && errorResponse.status === 401 && !errorResponse.config.url.includes('/auth/local')) {
    api.interceptors.response.eject(authInterceptor);
    // try {
    //   const { accessToken } = await store.dispatch(relogin());
    //   authInterceptor = api.interceptors.response.use(response => response, authIntError);
    //   errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
    //   return api(errorResponse.config);
    // } catch (e) {
    //   authInterceptor = api.interceptors.response.use(response => response, authIntError);
      store.dispatch(logoutUser());
    // }
  } else return Promise.reject(error);

  return Promise.reject(error);
};

let authInterceptor = api.interceptors.response.use(
  response => response,
  authIntError,
);

export interface ApiError {
  statusCode: number;
  error: string;
  message: string | ApiDetailedErrorMessage[];
}

interface ApiDetailedErrorMessage {
  messages: ApiFieldError[];
}

export interface ApiFieldError {
  id: string;
  message: string;
}