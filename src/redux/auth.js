import localForage from 'localforage';
import { persistReducer } from 'redux-persist';


export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

export const setLoginStatus = status => ({ type: SET_LOGIN_STATUS, payload: status });
export const setAccessToken = token => ({ type: SET_ACCESS_TOKEN, payload: token });
export const setRefreshToken = token => ({ type: SET_REFRESH_TOKEN, payload: token });

const initState = {
  loggedIn: true,
  user: {
    name: 'Ingvar Kamprad',
  },
  access_token: undefined,
  refresh_token: undefined,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return { ...state, loggedIn: action.payload };

    case SET_ACCESS_TOKEN:
      return { ...state, access_token: action.payload };

    case SET_REFRESH_TOKEN:
      return { ...state, refresh_token: action.payload };

    default:
      return state;
  }
};

export default persistReducer({
  key: 'auth',
  storage: localForage,
  whitelist: ['access_token', 'refresh_token'],
}, loginReducer);
