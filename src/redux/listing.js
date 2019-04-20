export const SET_LISTING = 'SET_LISTING';

export const setListing = data => ({ type: SET_LISTING, payload: data });

const initState = {
  furniture: [],
};

export const listingReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LISTING:
      return { ...state, furniture: action.payload };

    default:
      return state;
  }
};
