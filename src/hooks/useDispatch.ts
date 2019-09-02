import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { AppState } from 'store/types';

export type ReduxDispatch = ThunkDispatch<AppState, any, Action>;

export function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}
