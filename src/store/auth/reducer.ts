import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import { Action } from 'store/actions';

import { combineReducers } from 'redux';
import { statusReducer } from 'store/shared/status/reducer';
import {
 SET_ACCESS_TOKEN, SET_TOKENS, LOGOUT, PREFIX,
} from './consts';
import { State } from './types';

const initState: State = {};

const reducer = (state = initState, action: Action): State => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };

    case SET_TOKENS:
      return {
        ...state, ...action.payload,
      };

    case LOGOUT:
      return {};

    default:
      return state;
  }
};

export const persistedReducer = persistReducer({
  key: 'auth',
  storage: localForage,
  whitelist: ['accessToken', 'refreshToken'],
}, reducer);

export const authReducer = combineReducers({
  data: persistedReducer,
  status: statusReducer(PREFIX),
});
