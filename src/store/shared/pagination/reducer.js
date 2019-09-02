import { SET_PAGINATION, CHANGE_PAGE } from './consts';

const initialState = {
  currentPage: 1,
  perPage: 20,
  pageCount: 0,
  totalCount: 0,
};

export const paginationReducer = prefix => (state = initialState, action) => {
  switch (action.type) {
    case `${prefix}_${SET_PAGINATION}`: {
      const {
        currentPage, perPage, pageCount, totalCount,
      } = action.payload;
      return {
        ...state,
        currentPage,
        perPage,
        pageCount,
        totalCount,
      };
    }
    case `${prefix}_${CHANGE_PAGE}`:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
