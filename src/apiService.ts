import axios from 'axios';
import { toast } from 'react-toastify';

import { store } from 'store';
import { SERVER_ERROR } from 'constants/Api';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

store.subscribe(() => {
  const { accessToken } = store.getState().auth.data;
  api.defaults.headers.Authorization = `Bearer ${accessToken}`;
});

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

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
