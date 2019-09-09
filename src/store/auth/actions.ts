import { Action, createAction, ThunkResult } from 'store/actions';
import { SET_ERROR } from 'store/shared/status/consts';
import { User } from 'store/user/types';
import { setUserData } from 'store/user/actions';
import { startLoading, stopLoading } from 'store/shared/status/actions';
import {
 SET_TOKENS, SET_ACCESS_TOKEN, PREFIX, GET_LOGIN_STATUS, LOGOUT,
} from './consts';
import * as api from './api';
import { Tokens, LoginCredentials, RegistrationData } from './types';

export const setTokens = (tokens: Tokens): Action => (
  createAction(SET_TOKENS, tokens)
);
export const setAccessToken = (token: string): Action => (
  createAction(SET_ACCESS_TOKEN, token)
);

export const setLoginStatus = (status: boolean): Action => (
  createAction(GET_LOGIN_STATUS, status)
);

export const setError = (error: string): Action => (
  createAction(SET_ERROR, error, PREFIX)
);

export const logoutUser = (): Action => (
  createAction(LOGOUT)
);

export const login = (credentials: LoginCredentials): ThunkResult<Promise<Tokens & User>> => (
  async dispatch => {
    dispatch(startLoading(PREFIX));
    try {
      const { accessToken, refreshToken, ...user } = await api.login(credentials);
      dispatch(setUserData(user));
      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(stopLoading(PREFIX));
      return { accessToken, refreshToken, ...user };
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);

export const register = (data: RegistrationData): ThunkResult<Promise<Tokens>> => (
  async dispatch => {
    dispatch(startLoading(PREFIX));
    try {
      const tokens = await api.register(data);
      dispatch(setTokens(tokens));
      dispatch(stopLoading(PREFIX));
      return tokens;
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);

export const checkLoginStatus = (): ThunkResult<Promise<void>> => (
  async dispatch => {
    dispatch(startLoading(PREFIX));
    try {
      await api.checkLoginStatus();
      dispatch(setLoginStatus(true));
      dispatch(stopLoading(PREFIX));
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);

export const relogin = (): ThunkResult<Promise<Tokens>> => (
  async (dispatch, getState) => {
    try {
      const tokens = await api.relogin(getState().auth.data.refreshToken || '');
      dispatch(setTokens(tokens));
      return tokens;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  }
);
