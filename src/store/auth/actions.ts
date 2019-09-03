import { Action, createAction, ThunkResult } from 'store/actions';
import { SET_LOADING, SET_ERROR } from 'store/shared/status/consts';
import { Dispatch } from 'redux';
import { User } from 'store/user/types';
import { setUserData } from 'store/user/actions';
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

export const setLoading = (loading: boolean): Action => (
  createAction(SET_LOADING, loading, PREFIX)
);

export const setError = (error: string): Action => (
  createAction(SET_ERROR, error, PREFIX)
);

export const logoutUser = (): Action => (
  createAction(LOGOUT)
);

export const login = (credentials: LoginCredentials): ThunkResult<Promise<void | (Tokens & User)>> => (
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { accessToken, refreshToken, ...user } = await api.login(credentials);
      dispatch(setUserData(user));
      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const register = (data: RegistrationData): ThunkResult<Promise<void | Tokens>> => (
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { accessToken, refreshToken } = await api.register(data);
      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const checkLoginStatus = (): ThunkResult<Promise<void>> => (
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      await api.checkLoginStatus();
      dispatch(setLoginStatus(true));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
      throw error;
    }
  }
);
