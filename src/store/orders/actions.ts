import { Action, createAction, ThunkResult } from 'store/actions';
import { SET_ERROR } from 'store/shared/status/consts';
import { Dispatch } from 'redux';
import { stopLoading, startLoading } from 'store/shared/status/actions';
import { PREFIX, SET_USER_ORDERS } from './consts';
import * as api from './api';
import { Order } from './types';

export const setUserOrders = (orders: Order[]): Action => (
  createAction(SET_USER_ORDERS, orders)
);

export const setError = (error: string): Action => (
  createAction(SET_ERROR, error, PREFIX)
);

export const getOrders = (): ThunkResult<Promise<void>> => (
  async (dispatch: Dispatch) => {
    dispatch(startLoading(PREFIX));
    try {
      const orders = await api.getOrders();
      dispatch(setUserOrders(orders));
      dispatch(stopLoading(PREFIX));
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);
