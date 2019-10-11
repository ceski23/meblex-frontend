import { combineReducers } from 'redux';

import { authReducer } from 'store/auth/reducer';
import { userReducer } from './user/reducer';
import { ordersReducer } from './orders/reducer';
import { productsReducer } from './products/reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  orders: ordersReducer,
  products: productsReducer,
});
