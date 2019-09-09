import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducer';
import { AppState } from './types';

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk as ThunkMiddleware<AppState>),
));

export const persistor = persistStore(store);
