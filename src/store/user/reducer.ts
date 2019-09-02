import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import { Action } from 'store/actions';

import { combineReducers } from 'redux';
import { statusReducer } from 'store/shared/status/reducer';
import { LOGOUT } from 'store/auth/consts';
import { PREFIX, SET_USER_DATA } from './consts';
import { State } from './types';

const initState: State = {};

const reducer = (state = initState, action: Action): State => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, user: action.payload };

    case LOGOUT:
      return { ...state, user: undefined };

    default:
      return state;
  }
};

export const persistedReducer = persistReducer({
  key: 'user',
  storage: localForage,
  whitelist: ['user'],
}, reducer);

export const userReducer = combineReducers({
  data: persistedReducer,
  status: statusReducer(PREFIX),
});
