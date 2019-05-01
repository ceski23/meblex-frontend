/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

import axios from 'axios';
import { store } from './store';
import { setAccessToken, setRefreshToken } from './redux/auth';

let { accessToken } = store.getState().auth;

const client = axios.create({
  baseURL: 'https://api.wip.meblex.tk/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

store.subscribe(() => {
  ({ accessToken } = store.getState().auth);
  client.defaults.headers.Authorization = `Bearer ${accessToken}`;
});


const authIntResponse = response => response;
const authIntError = async (error) => {
  const errorResponse = error.response;

  if (errorResponse && errorResponse.status === 401 && !errorResponse.config.url.includes('/login')) {
    client.interceptors.response.eject(authInterceptor);
    try {
      await relogin();
      authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);
      errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
      return client(errorResponse.config);
    } catch (e) {
      authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);
      window.location = `${process.env.PUBLIC_URL}/wyloguj`;
    }
  } else return Promise.reject(error);

  return Promise.reject(error);
};

let authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);

// If no valid token then remove header
client.interceptors.request.use((config) => {
  if (accessToken === undefined) delete config.headers.Authorization;
  return config;
});

// Check if got new tokens
client.interceptors.response.use((response) => {
  if (response && (response.status === 200 || response.status === 201)) {
    if (response.data.accessToken) store.dispatch(setAccessToken(response.data.accessToken));
    if (response.data.refreshToken) store.dispatch(setRefreshToken(response.data.refreshToken));
  }
});


function errorHandler(error, x) {
  if (error.response) return Promise.reject(x[error.response.status]);
  if (error.request) return Promise.reject(x.default);
  return Promise.reject(x.default);
}


export function getListing() {
  return client.get('listing').catch(err => errorHandler(err, {
    401: err.response.data.title,
    default: 'Wystąpił błąd, spróbuj jeszcze raz!',
  }));
}

export function checkStatus() {
  return client.get('Auth/check').catch(err => errorHandler(err, {
    401: 401,
    default: 'Wystąpił błąd, spróbuj jeszcze raz!',
  }));
}

export function login(data) {
  return client.post('Auth/login', data).catch(err => errorHandler(err, {
    400: err.response.data.title || 'Nieprawidłowe dane!',
    401: err.response.data.title || 'Nieprawidłowy email i/lub hasło!',
    default: 'Wystąpił błąd, spróbuj jeszcze raz!',
  }));
}

export function relogin() {
  const data = { token: store.getState().auth.refreshToken };
  return client.post('Auth/refresh', data).catch(err => errorHandler(err, {
    default: 'Wystąpił błąd, spróbuj jeszcze raz!',
  }));
}

export function register(data) {
  return client.post('Auth/register', data).catch(err => errorHandler(err, {
    400: err.response.data || { title: 'Nieprawidłowe dane!' },
    default: 'Wystąpił błąd, spróbuj jeszcze raz',
  }));
}

export function ping() {
  return client.get('Test/ping');
}
