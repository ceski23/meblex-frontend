import { Action, createAction, ThunkResult } from 'store/actions';
import { SET_LOADING, SET_ERROR } from 'store/shared/status/consts';
import { Dispatch } from 'redux';
import { PREFIX, SET_USER_ORDERS } from './consts';
import * as api from './api';
import { Order } from './types';

export const setUserOrders = (orders: Order[]): Action => (
  createAction(SET_USER_ORDERS, orders)
);

export const setLoading = (loading: boolean): Action => (
  createAction(SET_LOADING, loading, PREFIX)
);
export const setError = (error: string): Action => (
  createAction(SET_ERROR, error, PREFIX)
);

export const getOrders = (): ThunkResult<Promise<void>> => (
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const orders = await api.getOrders();
      dispatch(setUserOrders(orders));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
      throw error;
    }
  }
);
