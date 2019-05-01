import localForage from 'localforage';
import { persistReducer } from 'redux-persist';


export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const LOGOUT = 'LOGOUT';

export const setLoginStatus = status => ({ type: SET_LOGIN_STATUS, payload: status });
export const setAccessToken = token => ({ type: SET_ACCESS_TOKEN, payload: token });
export const setRefreshToken = token => ({ type: SET_REFRESH_TOKEN, payload: token });
export const logout = () => ({ type: LOGOUT });

const initState = {
  loggedIn: true,
  user: {
    name: 'Ingvar Kamprad',
  },
  accessToken: undefined,
  refreshToken: undefined,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return { ...state, loggedIn: action.payload };

    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };

    case SET_REFRESH_TOKEN:
      return { ...state, refreshToken: action.payload };

    case LOGOUT:
      return {
        ...state, loggedIn: false, accessToken: undefined, refreshToken: undefined,
      };

    default:
      return state;
  }
};

export default persistReducer({
  key: 'auth',
  storage: localForage,
  whitelist: ['accessToken', 'refreshToken'],
}, loginReducer);
