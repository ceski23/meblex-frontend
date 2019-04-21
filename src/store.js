import { createStore, combineReducers,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { loginReducer } from './redux/loginStatus';
import { cartReducer } from './redux/cart';
import { listingReducer } from './redux/listing';

const rootReducer = combineReducers({
  form: formReducer,
  loginStatus: loginReducer,
  listing: listingReducer,
  cart: cartReducer,
});

export default createStore(rootReducer, {},composeWithDevTools(applyMiddleware(thunk)));
