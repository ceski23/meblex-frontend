import localForage from 'localforage';
import { persistReducer } from 'redux-persist';

export const ADD_ITEMS_TO_CART = 'ADD_ITEMS_TO_CART';

export const addItemsToCart = items => ({ type: ADD_ITEMS_TO_CART, payload: items });

const initState = {
  items: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEMS_TO_CART:
      return { ...state, items: [...state.items, action.payload] };

    default:
      return state;
  }
};

export default persistReducer({
  key: 'cart',
  storage: localForage,
}, cartReducer);
