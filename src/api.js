/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

import axios from 'axios';
import { store } from './store';
import { setAccessToken, setRefreshToken } from './redux/auth';

let { accessToken, refreshToken } = store.getState().auth;

export const client = axios.create({
  baseURL: 'https://api.wip.meblex.tk/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'pl-PL',
    Authorization: `Bearer ${accessToken}`,
  },
});

store.subscribe(() => {
  ({ accessToken, refreshToken } = store.getState().auth);
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
  return response;
});


function errorHandler(error, callback) {
  if (error.response) return Promise.reject(callback(error.response.status));
  if (error.request) return Promise.reject(callback('default'));
  return Promise.reject(callback('default'));
}

const defaultErrorCallback = (err, code) => ({
  title: {
    // 500: 'Błąd serwera!',
    404: 'Nieznane zapytanie!',
    default: 'Wystąpił błąd, spróbuj jeszcze raz!',
  }[code] || err.response.data.detail || err.response.data.title,
  errors: err.response.data.errors || [],
});

export function checkStatus() {
  return client.get('Auth/check');
}

export function login(data) {
  return client.post('Auth/login', data).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
}

export function relogin() {
  return client.put('Auth/refresh', {
    token: refreshToken,
  });
}

export function register(data) {
  return client.post('Auth/register', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
}

export function ping() {
  return client.get('Test/ping');
}

export function updateUserData(data) {
  return client.put('User/update', data).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
}

export const updateUserPassword = data => (
  client.put('User/password', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const updateUserEmail = data => (
  client.put('User/email', data).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getUserData = data => (
  client.get('User', data).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);


export const getColors = () => (
  client.get('Furniture/colors').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addColor = data => (
  client.post('Furniture/color', data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getMaterials = () => (
  client.get('Furniture/materials').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addMaterial = (values) => {
  const { photo, ...data } = values;
  const formData = new FormData();
  formData.set('json', JSON.stringify(data));
  formData.append('photo', photo.files[0]);

  return client({
    method: 'post',
    url: 'Furniture/material',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
};

export const getPatterns = () => (
  client.get('Furniture/patterns').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addPattern = (values) => {
  const { photo, ...data } = values;
  const formData = new FormData();
  formData.set('json', JSON.stringify(data));
  formData.append('photo', photo.files[0]);

  return client({
    method: 'post',
    url: 'Patterns/add',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
};

export const getFurniture = config => (
  client.get('Furniture/furniture', {
    params: {
      $orderby: config.sortBy,
      $top: config.limit,
    },
  }).then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getRooms = () => (
  client.get('Furniture/rooms').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const getCategories = () => (
  client.get('Furniture/categories').then(res => res.data).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ))
);

export const addFurniture = (data, photos) => {
  // TODO: Fix adding furniture
  const formData = new FormData();
  formData.set('json', JSON.stringify(data));
  photos.forEach((photo) => {
    formData.append('photos', photo);
  });

  return client({
    method: 'post',
    url: 'Furniture/add',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).catch(err => (
    errorHandler(err, code => defaultErrorCallback(err, code))
  ));
};
