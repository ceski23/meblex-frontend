import { Action } from 'store/actions';

import { combineReducers } from 'redux';
import { statusReducer } from 'store/shared/status/reducer';
import { LOADING_STARTED } from 'store/shared/status/consts';
import { PREFIX, SET_USER_ORDERS, SET_ORDER } from './consts';
import { State } from './types';

export const initState: State = {
  orders: [],
  order: undefined,
};

const reducer = (state = initState, action: Action): State => {
  switch (action.type) {
    case SET_USER_ORDERS:
      return { ...state, orders: action.payload };

    case SET_ORDER:
      return { ...state, order: action.payload };

    case `${PREFIX}_${LOADING_STARTED}`:
      return { ...state, orders: [] };

    default:
      return state;
  }
};

export const ordersReducer = combineReducers({
  data: reducer,
  status: statusReducer(PREFIX),
});
