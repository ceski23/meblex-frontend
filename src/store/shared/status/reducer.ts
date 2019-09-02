import { Reducer } from 'redux';
import { SET_ERROR, SET_LOADING } from './consts';
import { StatusState } from './types';

const initialState: StatusState = {
  isLoading: false,
  error: null,
};

export const statusReducer = (prefix: string): Reducer<StatusState> => (
  (state = initialState, action): StatusState => {
    switch (action.type) {
      case `${prefix}_${SET_LOADING}`:
        return {
          ...state,
          isLoading: action.payload,
          error: action.payload ? null : state.error,
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
