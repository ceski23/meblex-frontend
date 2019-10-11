import { Action, createAction, ThunkResult } from 'store/actions';
import { SET_ERROR } from 'store/shared/status/consts';
import { stopLoading, startLoading } from 'store/shared/status/actions';
import { PREFIX, SET_DISPLAYED_PRODUCT } from './consts';
import * as api from './api';
import { PieceOfFurniture } from './types';

export const setDisplayedProduct = (product: PieceOfFurniture): Action => (
  createAction(SET_DISPLAYED_PRODUCT, product)
);

export const setError = (error: string): Action => (
  createAction(SET_ERROR, error, PREFIX)
);

export const getProduct = (id: string): ThunkResult<Promise<PieceOfFurniture>> => (
  async dispatch => {
    dispatch(startLoading(PREFIX));
    try {
      const product = await api.getProduct(id);
      dispatch(setDisplayedProduct(product));
      dispatch(stopLoading(PREFIX));
      return product;
    } catch (error) {
      dispatch(setError(error));
      dispatch(stopLoading(PREFIX));
      throw error;
    }
  }
);
