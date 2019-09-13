import { Action, createAction, ThunkResult } from 'store/actions';
import { SET_ERROR } from 'store/shared/status/consts';
import { Dispatch } from 'redux';
import { stopLoading, startLoading } from 'store/shared/status/actions';
import { PREFIX, SET_USER_ORDERS, SET_ORDER } from './consts';
import * as api from './api';
import { Order } from './types';

export const setUserOrders = (orders: Order[]): Action => (
  createAction(SET_USER_ORDERS, orders)
);

export const setOrder = (order: Order): Action => (
  createAction(SET_ORDER, order)
);

export const setError = (error: string): Action => (
  createAction(SET_ERROR, error, PREFIX)
);

export const getOrders = (): ThunkResult<Promise<Order[]>> => (
  async dispatch => {
    dispatch(startLoading(PREFIX));
    try {
      const orders = await api.getOrders();
      dispatch(setUserOrders(orders));
      dispatch(stopLoading(PREFIX));
      return orders;
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);

export const getOrderDetails = (id: string): ThunkResult<Promise<Order>> => (
  async dispatch => {
    dispatch(startLoading(PREFIX));
    try {
      const order = await api.getOrder(id);
      dispatch(setOrder(order));
      dispatch(stopLoading(PREFIX));
      return order;
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);
