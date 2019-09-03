import { Action, createAction, ThunkResult } from 'store/actions';
import { SET_LOADING, SET_ERROR } from 'store/shared/status/consts';
import { Dispatch } from 'redux';
import { PREFIX, SET_USER_DATA } from './consts';
import * as api from './api';
import { User } from './types';

export const setUserData = (user: User): Action => (
  createAction(SET_USER_DATA, user)
);

export const setLoading = (loading: boolean): Action => (
  createAction(SET_LOADING, loading, PREFIX)
);
export const setError = (error: string): Action => (
  createAction(SET_ERROR, error, PREFIX)
);

export const getUserData = (): ThunkResult<Promise<void>> => (
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const user = await api.getUser();
      dispatch(setUserData(user));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
      throw error;
    }
  }
);