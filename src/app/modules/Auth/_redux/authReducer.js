const initialState = {
  token: '',
  username: '',
};

export const FETCH_TOKEN = 'FETCH_TOKEN';

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN:
      return {
        ...state,
        username: action.username,
        token: action.token,
      };
    default:
      return state;
  }
};
