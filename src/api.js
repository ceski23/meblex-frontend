/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

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


function errorHandler(error, callback) {
  if (error.response) return Promise.reject(callback(error.response.status));
  if (error.request) return Promise.reject(callback());
  return Promise.reject(callback());
}

export function checkStatus() {
  return client.get('Auth/check');
}

export function login(data) {
  return client.post('Auth/login', data).catch(err => errorHandler(err, code => (
    (!code) ? 'Wystąpił błąd, spróbuj jeszcze raz!' : {
      400: err.response.data.title || 'Nieprawidłowe dane!',
      401: err.response.data.title || 'Nieprawidłowy email i/lub hasło!',
      404: err.response.data.error || 'Nie znaleziono takiego użytkownika',
    }[code]
  )));
}

export function relogin() {
  return client.post('Auth/refresh', {
    token: store.getState().auth.refreshToken,
  });
}

export function register(data) {
  return client.post('Auth/register', data).catch(err => errorHandler(err, code => (
    (!code) ? 'Wystąpił błąd, spróbuj jeszcze raz' : {
      400: err.response.data || { title: 'Nieprawidłowe dane!' },
    }
  )));
}

export function ping() {
  return client.get('Test/ping');
}
