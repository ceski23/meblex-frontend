import { Action } from 'store/actions';

import { combineReducers } from 'redux';
import { statusReducer } from 'store/shared/status/reducer';
import { LOADING_STARTED } from 'store/shared/status/consts';
import { PREFIX, SET_DISPLAYED_PRODUCT } from './consts';
import { State } from './types';

export const initState: State = {
  product: undefined,
};

const reducer = (state = initState, action: Action): State => {
  switch (action.type) {
    case SET_DISPLAYED_PRODUCT:
      return { ...state, product: action.payload };

    case `${PREFIX}_${LOADING_STARTED}`:
      return { ...state, product: undefined };

    default:
      return state;
  }
};

export const productsReducer = combineReducers({
  data: reducer,
  status: statusReducer(PREFIX),
});
