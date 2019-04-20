/* eslint-disable no-use-before-define */
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.meblex.tk/api/',
  headers: {
    'Content-Type': 'application/json',
    ...(!localStorage.getItem('access_token') ? {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    } : {}),
  },
});


const authIntResponse = response => response;
const authIntError = async (error) => {
  const errorResponse = error.response;

  if (errorResponse && errorResponse.status === 401 && !errorResponse.config.url.includes('/login')) {
    client.interceptors.response.eject(authInterceptor);
    try {
      const response = await relogin();
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);
      errorResponse.config.headers.Authorization = `Bearer ${response.data.access_token}`;
      client.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
      return client(errorResponse.config);
    } catch (e) {
      authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);
      window.location = `${process.env.PUBLIC_URL}/wyloguj`;
    }
  } else return Promise.reject(error);

  return Promise.reject(error);
};

let authInterceptor = client.interceptors.response.use(authIntResponse, authIntError);


client.interceptors.response.use((response) => {
  if (response && (response.status === 200 || response.status === 201)) {
    if (response.data.access_token && response.data.refresh_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      client.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
    }
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
  return client.get('status').catch(err => errorHandler(err, {
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
  const data = { token: localStorage.getItem('refresh_token') };
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
