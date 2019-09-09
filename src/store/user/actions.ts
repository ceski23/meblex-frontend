import { Action, createAction, ThunkResult } from 'store/actions';
import { SET_ERROR } from 'store/shared/status/consts';
import { Dispatch } from 'redux';
import { ReduxDispatch } from 'hooks/useDispatch';
import { startLoading, stopLoading } from 'store/shared/status/actions';
import { PREFIX, SET_USER_DATA } from './consts';
import * as api from './api';
import {
 User, UserData, EmailUpdateParams, PasswordUpdateParams,
} from './types';

export const setUserData = (user: User): Action => (
  createAction(SET_USER_DATA, user)
);

const setError = (error: string): Action => (
  createAction(SET_ERROR, error, PREFIX)
);

export const getUserData = (): ThunkResult<Promise<void>> => (
  async (dispatch: Dispatch) => {
    dispatch(startLoading(PREFIX));
    try {
      const user = await api.getUser();
      dispatch(setUserData(user));
      dispatch(stopLoading(PREFIX));
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);

export const updateUserData = (data: UserData): ThunkResult<Promise<void>> => (
  async (dispatch: Dispatch) => {
    dispatch(startLoading(PREFIX));
    try {
      const user = await api.updateUserData(data);
      dispatch(setUserData(user));
      dispatch(stopLoading(PREFIX));
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);

export const updateEmail = (data: EmailUpdateParams): ThunkResult<Promise<void>> => (
  async (dispatch: ReduxDispatch) => {
    dispatch(startLoading(PREFIX));
    try {
      await api.updateEmail(data);
      dispatch(stopLoading(PREFIX));
      await dispatch(getUserData());
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);

export const updatePassword = (data: PasswordUpdateParams): ThunkResult<Promise<void>> => (
  async (dispatch: Dispatch) => {
    dispatch(startLoading(PREFIX));
    try {
      await api.updatePassword(data);
      dispatch(stopLoading(PREFIX));
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);
