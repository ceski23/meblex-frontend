export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

export const setLoginStatus = status => ({ type: SET_LOGIN_STATUS, payload: status });

const initState = {
  loggedIn: true,
  user: {
    name: 'Ingvar Kamprad'
  }
}

export const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return { ...state, loggedIn: action.payload}
    
    default:
      return state;
  }
}