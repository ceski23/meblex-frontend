import { Reducer } from 'redux';
import { SET_ERROR, LOADING_STARTED, LOADING_FINISHED } from './consts';
import { StatusState } from './types';

const initialState: StatusState = {
  isLoading: false,
  error: null,
};

export const statusReducer = (prefix: string): Reducer<StatusState> => (
  (state = initialState, action): StatusState => {
    switch (action.type) {
      case `${prefix}_${LOADING_STARTED}`:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case `${prefix}_${LOADING_FINISHED}`:
        return {
          ...state,
          isLoading: false,
        };
      case `${prefix}_${SET_ERROR}`:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  }
);
