import { createAction, Action } from 'store/actions';
import { LOADING_STARTED, LOADING_FINISHED } from './consts';

export const startLoading = (prefix: string): Action => (
  createAction(LOADING_STARTED, true, prefix)
);

export const stopLoading = (prefix: string): Action => (
  createAction(LOADING_FINISHED, false, prefix)
);
