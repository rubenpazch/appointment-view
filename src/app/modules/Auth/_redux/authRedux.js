import * as actionsTypes from './authTypes';

const initialState = {
  token: '',
  loading: false,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
      };
    default:
      return state;
  }
};

export default tokenReducer;
