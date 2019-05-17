export const SET_COLOR_FILTER = 'SET_COLOR_FILTER';
export const SET_PATTERN_FILTER = 'SET_PATTERN_FILTER';
export const SET_MATERIAL_FILTER = 'SET_MATERIAL_FILTER';

export const setColorFilter = color => ({ type: SET_COLOR_FILTER, payload: color });
export const setPatternFilter = pattern => ({ type: SET_PATTERN_FILTER, payload: pattern });
export const setMaterialFilter = material => ({ type: SET_MATERIAL_FILTER, payload: material });

const initState = {
  color: undefined,
  material: undefined,
  pattern: undefined,
};

const filtersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_COLOR_FILTER:
      return { ...state, color: action.payload };

    case SET_PATTERN_FILTER:
      return { ...state, pattern: action.payload };

    case SET_MATERIAL_FILTER:
      return { ...state, material: action.payload };

    default:
      return state;
  }
};

export default filtersReducer;
