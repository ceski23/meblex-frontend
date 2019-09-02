import { ThunkAction } from 'redux-thunk';
import { AppState } from './types';

export interface Action<P = any> {
  type: string;
  payload?: P;
}

export const createAction = <P = object>(
  type: string,
  payload?: P,
  prefix?: string,
): Action => ({
  type: prefix ? `${prefix}_${type}` : type,
  payload,
});

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;
