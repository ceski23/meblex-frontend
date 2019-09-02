import { combineReducers } from 'redux';

import { authReducer } from 'store/auth/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
